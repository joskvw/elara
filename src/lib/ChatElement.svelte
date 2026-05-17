<script lang="ts">
	import ChatElement from '$lib/ChatElement.svelte';
	import { type Chat } from '$lib/client';
	let { chat }: { chat: Chat } = $props();
</script>

<div class="">
	{#if !chat.server}
		<a href={'/#' + chat.id}>
			<span class="text-xl text-green-400">
				{#if chat.type === 'voice'}
					~
				{/if}
				{#if chat.type === 'text'}
					›
				{/if}
			</span>
			<span class="text-base">{chat.name}</span>
		</a>
	{/if}
	{#if chat.server}
		<details>
			<summary class="list-none text-base">
				<span class="text-xl text-green-400">»</span> <span class="text-base">{chat.name}</span>
			</summary>
			<div class="ml-4">
				{#each chat.chats as c (c.id)}
					<ChatElement chat={c} />
				{/each}
			</div>
		</details>
	{/if}
</div>
