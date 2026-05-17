import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { openDB, createDB } from './db';
import { xchacha20poly1305 } from '@noble/ciphers/chacha.js';
import { managedNonce } from '@noble/ciphers/utils.js';

const makeKey = (seed: number): Uint8Array => {
	const key = new Uint8Array(32);
	for (let i = 0; i < 32; i++) key[i] = (seed + i) & 0xff;
	return key;
};

const makeIndex = (entries: [number, number][]): Uint8Array => {
	const buf = new Uint8Array(entries.length * 16);
	const view = new DataView(buf.buffer);
	entries.forEach(([start, end], i) => {
		view.setBigUint64(i * 16, BigInt(start));
		view.setBigUint64(i * 16 + 8, BigInt(end));
	});
	return buf;
};

const encrypt = (key: Uint8Array, plaintext: Uint8Array): Uint8Array =>
	managedNonce(xchacha20poly1305)(key).encrypt(plaintext);

beforeEach(() => {
	vi.restoreAllMocks();
});

afterEach(() => {
	vi.unstubAllGlobals();
});

describe('openDB', () => {
	it('throws on key length != 32', async () => {
		await expect(openDB(new Uint8Array(16))).rejects.toThrow('Invalid key length');
		await expect(openDB(new Uint8Array(64))).rejects.toThrow('Invalid key length');
	});

	it('returns DB object with get, append, and listen methods', async () => {
		const db = await openDB(makeKey(1));
		expect(typeof db.get).toBe('function');
		expect(typeof db.append).toBe('function');
		expect(typeof db.listen).toBe('function');
	});
});

describe('get', () => {
	it.each([
		['non-integer start', 1.5, 1],
		['non-integer end', 1, 1.5],
		['negative start', -1, 1],
		['negative end', 0, -1],
		['start greater than end', 5, 3],
		['start is unsafe integer', Number.MAX_SAFE_INTEGER + 1, 5],
		['end is unsafe integer', 0, Number.MAX_SAFE_INTEGER + 1],
	])('throws on invalid range: %s', async (_, start, end) => {
		const db = await openDB(makeKey(1));
		await expect(db.get(start, end)).rejects.toThrow('Invalid range');
	});

	it('accepts start === end for a single blob', async () => {
		const key = makeKey(2);
		const plaintext = new TextEncoder().encode('single');
		const ct = encrypt(key, plaintext);
		const indexBytes = makeIndex([[0, ct.length]]);

		const fetch = vi
			.fn()
			.mockResolvedValueOnce({ arrayBuffer: () => Promise.resolve(indexBytes.buffer) })
			.mockResolvedValueOnce({ arrayBuffer: () => Promise.resolve(ct.buffer) });
		vi.stubGlobal('fetch', fetch);

		const db = await openDB(key);
		const result = await db.get(0, 0);

		expect(result).toHaveLength(1);
		expect(new TextDecoder().decode(result[0])).toBe('single');
	});

	it('returns decrypted blobs for a range', async () => {
		const key = makeKey(3);
		const plaintexts = [
			new TextEncoder().encode('first'),
			new TextEncoder().encode('second'),
			new TextEncoder().encode('third'),
		];
		const ciphertexts = plaintexts.map((p) => encrypt(key, p));

		let offset = 0;
		const entries: [number, number][] = ciphertexts.map((ct) => {
			const start = offset;
			offset += ct.length;
			return [start, offset];
		});
		const indexBytes = makeIndex(entries);

		const fetch = vi
			.fn()
			.mockResolvedValueOnce({ arrayBuffer: () => Promise.resolve(indexBytes.buffer) });
		for (const ct of ciphertexts) {
			fetch.mockResolvedValueOnce({ arrayBuffer: () => Promise.resolve(ct.buffer) });
		}
		vi.stubGlobal('fetch', fetch);

		const db = await openDB(key);
		const result = await db.get(0, 2);

		expect(result).toHaveLength(3);
		expect(new TextDecoder().decode(result[0])).toBe('first');
		expect(new TextDecoder().decode(result[1])).toBe('second');
		expect(new TextDecoder().decode(result[2])).toBe('third');
	});

	it('fetches the correct index byte range', async () => {
		const key = makeKey(4);
		const ct = encrypt(key, new TextEncoder().encode('x'));
		// get(3, 5) → 3 entries, indexSize=16 → Range bytes=48-95
		const indexBytes = makeIndex([
			[0, ct.length],
			[ct.length, ct.length * 2],
			[ct.length * 2, ct.length * 3],
		]);

		const fetch = vi
			.fn()
			.mockResolvedValueOnce({ arrayBuffer: () => Promise.resolve(indexBytes.buffer) })
			.mockResolvedValueOnce({ arrayBuffer: () => Promise.resolve(ct.buffer) })
			.mockResolvedValueOnce({ arrayBuffer: () => Promise.resolve(ct.buffer) })
			.mockResolvedValueOnce({ arrayBuffer: () => Promise.resolve(ct.buffer) });
		vi.stubGlobal('fetch', fetch);

		const db = await openDB(key);
		await db.get(3, 5);

		expect(fetch).toHaveBeenCalledTimes(4);
		const [url, opts] = fetch.mock.calls[0];
		expect(url).toContain('.i');
		expect(opts.headers.Range).toBe('bytes=48-95');
	});

	it('throws on invalid index entry (dataStart >= dataEnd)', async () => {
		const db = await openDB(makeKey(5));
		const indexBytes = makeIndex([[100, 50]]);

		vi.stubGlobal(
			'fetch',
			vi.fn().mockResolvedValue({ arrayBuffer: () => Promise.resolve(indexBytes.buffer) })
		);

		await expect(db.get(0, 0)).rejects.toThrow('Invalid index entry');
	});

	it('throws on out-of-order index entries', async () => {
		const db = await openDB(makeKey(6));
		const indexBytes = makeIndex([
			[100, 200],
			[50, 80],
		]);

		vi.stubGlobal(
			'fetch',
			vi.fn().mockResolvedValue({ arrayBuffer: () => Promise.resolve(indexBytes.buffer) })
		);

		await expect(db.get(0, 1)).rejects.toThrow('Index entries out of order');
	});

	it('throws on index size mismatch', async () => {
		const db = await openDB(makeKey(7));
		const indexBytes = makeIndex([
			[0, 40],
			[40, 80],
		]);

		vi.stubGlobal(
			'fetch',
			vi.fn().mockResolvedValue({ arrayBuffer: () => Promise.resolve(indexBytes.buffer) })
		);

		await expect(db.get(0, 3)).rejects.toThrow('Index size mismatch');
	});

	it('throws on tampered ciphertext', async () => {
		const key = makeKey(8);
		const tampered = new Uint8Array(100);
		const indexBytes = makeIndex([[0, 100]]);

		const fetch = vi
			.fn()
			.mockResolvedValueOnce({ arrayBuffer: () => Promise.resolve(indexBytes.buffer) })
			.mockResolvedValueOnce({ arrayBuffer: () => Promise.resolve(tampered.buffer) });
		vi.stubGlobal('fetch', fetch);

		const db = await openDB(key);
		await expect(db.get(0, 0)).rejects.toThrow();
	});
});

describe('append', () => {
	it('POSTs encrypted content to the msg URL', async () => {
		const db = await openDB(makeKey(9));
		const fetch = vi.fn().mockResolvedValue({});
		vi.stubGlobal('fetch', fetch);

		const content = new TextEncoder().encode('append test');
		await db.append(content);

		expect(fetch).toHaveBeenCalledOnce();
		const [url, options] = fetch.mock.calls[0];
		expect(url).toMatch(/\/msg\/.+/);
		expect(url).not.toContain('.i');
		expect(options.method).toBe('post');
		expect(options.body).toBeInstanceOf(Uint8Array);
		expect(options.body).not.toEqual(content);
	});
});

describe('listen', () => {
	it('decrypts and delivers incoming messages via callback', async () => {
		const key = makeKey(11);
		const messages = [
			new TextEncoder().encode('msg1'),
			new TextEncoder().encode('msg2'),
		];
		const ciphertexts = messages.map((m) => encrypt(key, m));

		const streams = ciphertexts.map(
			(ct) =>
				new ReadableStream({
					start(controller) {
						controller.enqueue(ct);
						controller.close();
					},
				})
		);

		const incoming = new ReadableStream({
			start(controller) {
				for (const stream of streams) controller.enqueue(stream);
				controller.close();
			},
		});

		const closeSpy = vi.fn();
		class MockTransport {
			ready = Promise.resolve();
			incomingUnidirectionalStreams = incoming;
			close = closeSpy;
		}
		vi.stubGlobal('WebTransport', MockTransport);

		const db = await openDB(key);
		const received: Uint8Array[] = [];
		await db.listen((msg) => received.push(msg));

		expect(received).toHaveLength(2);
		expect(new TextDecoder().decode(received[0])).toBe('msg1');
		expect(new TextDecoder().decode(received[1])).toBe('msg2');
		expect(closeSpy).toHaveBeenCalled();
	});

	it('closes transport and releases reader on stream end', async () => {
		const key = makeKey(12);
		const incoming = new ReadableStream({
			start(controller) {
				controller.close();
			},
		});

		const closeSpy = vi.fn();
		class MockTransport {
			ready = Promise.resolve();
			incomingUnidirectionalStreams = incoming;
			close = closeSpy;
		}
		vi.stubGlobal('WebTransport', MockTransport);

		const db = await openDB(key);
		const received: Uint8Array[] = [];
		await db.listen((msg) => received.push(msg));

		expect(received).toHaveLength(0);
		expect(closeSpy).toHaveBeenCalled();
	});
});

describe('createDB', () => {
	it('does not throw', async () => {
		await expect(createDB()).resolves.toBeUndefined();
	});
});