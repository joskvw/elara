<script>
	import { browser } from '$app/environment';
	import ChatElement from '$lib/ChatElement.svelte';
	import MessagesElement from '$lib/MessagesElement.svelte';
	import { getChats, openChat } from '$lib/client';
	(async () => {
		const chat = await openChat('key', (message) => console.log(message));
		setInterval(async () => {
			await chat.send('Hello!');
		}, 250);
	})();
</script>

<div class="z-0 flex h-screen bg-olive-950 font-mono text-olive-200">
	<div class="flex w-64 flex-col border-r border-olive-800 p-2">
		<span class="text-green-400">ᗑ maidenhair</span>
		<ChatElement chat={getChats()} /><!--Prototype to design lib -->
	</div>
	<div class="h-full grow"><MessagesElement id="test" /></div>
</div>
