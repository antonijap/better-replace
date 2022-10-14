<script>

	//import Global CSS from the svelte boilerplate
	//contains Figma color vars, spacing vars, utility classes and more
	import { GlobalCSS } from 'figma-plugin-ds-svelte';

	//import some Svelte Figma UI components
	import { Button, Input, Label, SelectMenu, Disclosure, DisclosureItem, Switch } from 'figma-plugin-ds-svelte';

	$: query = ""
	$: newText = ""
	$: warning = false
	$: switchValue = false

	onmessage = (event) => {
		if (event.data.pluginMessage === "select-frame") {
			warning = true
		} else if (event.data.pluginMessage === "frame-selected") {
			warning = false
		}
	}

	function replaceText() {
		parent.postMessage({ pluginMessage: { 
			'type': 'replace-text', 
			'search': query, 
			'newText': newText, 
		} }, '*');
	}

	function cancel() {
		parent.postMessage({ pluginMessage: { 'type': 'cancel' } }, '*')
	}

</script>

{#if warning}
	<div class="wrapper">
		<p>Select frame first</p>
	</div>
{:else}
	<div class="wrapper size-xsmall">
		<Input placeholder="Search for..." bind:value={query}/>
		<Input placeholder="Replace with..." bind:value={newText}/>
		<Button on:click={replaceText} class={"cta"}>Replace</Button>
	</div>
{/if}


<style>
	.wrapper {
		padding: var(--size-xxsmall);
		display: grid;
		grid-template-columns: 1fr;
		grid-gap: var(--size-xxsmall);
	}
	.cta {
		display: grid;
		text-align: center;
	}
</style>



