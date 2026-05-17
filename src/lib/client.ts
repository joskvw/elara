import { createDB, openDB } from './db';
import { ml_kem1024 } from '@noble/post-quantum/ml-kem.js';
import * as proto from './proto';
const vines = new Map<string, Uint8Array>();
vines.set('key', new Uint8Array(32));
export async function wst() {
	const chat = openChat('key', (message) => console.log(message));
	await chat.send('Hello!');
	//console.log(new TextDecoder().decode((await db.get(0, 0))[0]));
}
/**
 * getChats returns the user's chat(s)
 */
export function getChats(): Chat {
	return {
		name: "Bob's server",
		id: 'wrgeg',
		server: true,
		chats: [
			{ name: 'general', id: 'tg4g4erg', type: 'text', server: false },
			{ name: 'vc1', id: 'rth4h54h6h', type: 'voice', server: false }
		]
	};
}
/**
 *
 * @param id
 * @param callback
 */
export function openChat(
	id: string,
	callback: (x: ChatMessage) => void
): { history: () => Promise<ChatMessage>; send: (m: string) => Promise<void> } {
	const key = vines.get(id);
	if (key === undefined) {
		throw new Error('VINE LOOKUP FAIL');
	}
	const db = openDB(key);
	db.listen((message) => callback(proto.ChatMessage.decode(message))); // THIS DOES NOT CHECK SIGNATURES AND IS THEREFORE DEEPLY INSECURE
	return {
		history: async () => {
			return {
				sender: 'bob',
				content: 'john',
				signature: new Uint8Array()
			};
		},
		send: async (message) => {
			db.append(
				proto.ChatMessage.encode(
					proto.ChatMessage.create({
						sender: 'example.com',
						content: message,
						signature: new Uint8Array([])
					})
				).finish()
			);
		}
	};
}

export type Chat =
	| { name: string; id: string; type: 'voice' | 'text'; server: false }
	| { name: string; id: string; chats: Chat[]; server: true };
export type ChatMessage = { sender: string; content: string; signature: Uint8Array };
