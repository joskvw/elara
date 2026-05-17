const BASE_URL = 'https://lo.jos.onl';
import { xchacha20poly1305 } from '@noble/ciphers/chacha.js';
import { randomBytes, managedNonce } from '@noble/ciphers/utils.js';
import { sha256 } from '@noble/hashes/sha2.js';
export function openDB(key: Uint8Array) {
	if (key.length !== 32) throw new Error('Invalid key length');
	const id = sha256(key).toBase64({ alphabet: 'base64url' });
	const crypt = managedNonce(xchacha20poly1305)(key);
	const fetchRange = async (suffix: string, byteStart: number, byteEnd: number) =>
		new Uint8Array(
			await (
				await fetch(`${BASE_URL}/db/${id}${suffix}`, {
					headers: { Range: `bytes=${byteStart}-${byteEnd}` }
				})
			).arrayBuffer()
		);
	const bytesToNumber = (bytes: Uint8Array) =>
		bytes.reduce((acc, byte) => (acc << 8n) + BigInt(byte), 0n);
	return {
		/**
		 * Returns an array of arbitrary length blobs from the db
		 * @param start
		 * @param end
		 */
		get: async (start: number, end: number): Promise<Uint8Array[]> => {
			if (
				!Number.isSafeInteger(start) ||
				!Number.isSafeInteger(end) ||
				start < 0 ||
				end < 0 ||
				start > end
			)
				throw new Error('Invalid range');
			const indexSize = 16;
			const count = end - start + 1;
			const indexBlob = await fetchRange('.i', start * indexSize, (end + 1) * indexSize - 1);
			// Index blob lacks a MAC — a compromised server could reorder/replay index entries,
			// causing different ciphertexts to be served. Per-blob AEAD decryption detects tampering.
			const entries: [number, number][] = [];
			let prevEnd = -1n;
			for (let i = 0; i < indexBlob.length; i += indexSize) {
				const dataStart = bytesToNumber(indexBlob.slice(i, i + indexSize / 2));
				const dataEnd = bytesToNumber(indexBlob.slice(i + indexSize / 2, i + indexSize));
				if (dataStart >= dataEnd) throw new Error('Invalid index entry');
				if (dataStart < prevEnd) throw new Error('Index entries out of order');
				prevEnd = dataEnd;
				entries.push([Number(dataStart), Number(dataEnd)]);
			}
			if (entries.length !== count) throw new Error('Index size mismatch');
			const blobs: Uint8Array[] = [];
			for (const [dataStart, dataEnd] of entries) {
				const enc = await fetchRange('', dataStart, dataEnd - 1);
				blobs.push(crypt.decrypt(enc));
			}
			return blobs;
		},
		/**
		 *
		 */
		append: async (content: Uint8Array) => {
			await fetch(BASE_URL + '/msg/' + id, { method: 'post', body: crypt.encrypt(content) }); // might need content-type headers
		},
		/**
		 * The fancy one; creates a webtransport sesh and provides a callback for getting messages as a firehose
		 * @param callback
		 */
		listen: async (callback: (message: Uint8Array) => void) => {
			const transport = new WebTransport(`${BASE_URL}:4433/msg/${id}`);
			await transport.ready;
			const reader = transport.incomingUnidirectionalStreams.getReader();
			try {
				while (true) {
					const { value: stream, done } = await reader.read();
					if (done) break;
					const chunks: Uint8Array[] = [];
					const streamReader = stream.getReader();
					while (true) {
						const { value: chunk, done: streamDone } = await streamReader.read();
						if (streamDone) break;
						chunks.push(chunk);
					}
					streamReader.releaseLock();
					const totalLen = chunks.reduce((s, c) => s + c.length, 0);
					const combined = new Uint8Array(totalLen);
					let off = 0;
					for (const c of chunks) {
						combined.set(c, off);
						off += c.length;
					}
					callback(crypt.decrypt(combined));
				}
			} finally {
				reader.releaseLock();
				transport.close();
			}
		}
	};
}
export async function createDB() {
	const db = await openDB(randomBytes(32));
	let perms = {
		owner: {
			id: ''
		},
		group: {
			id: '',
			perm: '' // DMAR 0000
		},
		all: {
			perm: 0 // DMAR 0000
		}
	};
	return db;
}
