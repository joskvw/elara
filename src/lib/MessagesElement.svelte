<script lang="ts">
	import { openChat, type ChatMessage } from '$lib/client';
	let { id }: { id: string } = $props();
	//const session = openChat((() => id)(), (msg) => messages.push(msg));
	let currentMessage = '';
	let messages: ChatMessage[] = [
		{ sender: 'alice', content: 'Are you coming to the meeting at 3 PM?' },
		{ sender: 'bob', content: 'Yes, I will be there.' },
		{ sender: 'charlie', content: 'Can you send me the latest sales report?' },
		{ sender: 'diana', content: 'I just emailed it to you.' },
		{ sender: 'eve', content: 'The server is down again.' },
		{ sender: 'frank', content: 'I am looking into it now.' },
		{ sender: 'grace', content: 'We need to finalize the budget by Friday.' },
		{ sender: 'henry', content: 'I will have the draft ready by tomorrow.' },
		{ sender: 'iris', content: 'Did you update the client on the delay?' },
		{ sender: 'jack', content: 'Not yet, I will call them in ten minutes.' },
		{ sender: 'karen', content: 'Please review the document I shared in the drive.' },
		{ sender: 'leo', content: 'Got it, I will leave my comments by end of day.' },
		{ sender: 'alice', content: 'Are you coming to the meeting at 3 PM?' },
		{ sender: 'bob', content: 'Yes, I will be there.' },
		{ sender: 'charlie', content: 'Can you send me the latest sales report?' },
		{ sender: 'diana', content: 'I just emailed it to you.' },
		{ sender: 'eve', content: 'The server is down again.' },
		{ sender: 'frank', content: 'I am looking into it now.' },
		{ sender: 'grace', content: 'We need to finalize the budget by Friday.' },
		{ sender: 'henry', content: 'I will have the draft ready by tomorrow.' },
		{ sender: 'iris', content: 'Did you update the client on the delay?' },
		{ sender: 'jack', content: 'Not yet, I will call them in ten minutes.' },
		{ sender: 'karen', content: 'Please review the document I shared in the drive.' },
		{ sender: 'leo', content: 'Got it, I will leave my comments by end of day.' }
	];
</script>

<div class="flex w-full flex-col">
	<div class="grow">
		<div class="h-[calc(100vh-3rem)] overflow-x-scroll p-2 text-lg leading-7 whitespace-pre-wrap">
			{#each messages as msg, i (i)}
				<div>
					<span class="font-bold">{msg.sender}</span>
					<span class="text-2xl font-black text-green-400">›</span>
					{msg.content}
				</div>
			{/each}
		</div>
	</div>
	<div class="flex h-12 bg-olive-800">
		<textarea
			class="h-full grow resize-none p-2 outline-0"
			placeholder="Type here; markdown supported"
			bind:value={currentMessage}
		></textarea>
		<button
			class="w-12 bg-green-400 text-center text-3xl text-olive-800"
			onclick={() => {
				session.send(currentMessage);
				currentMessage = '';
			}}>»</button
		>
	</div>
</div>
