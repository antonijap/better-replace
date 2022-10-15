<script>
	import { GlobalCSS } from 'figma-plugin-ds-svelte';
	import { Input, Type  } from 'figma-plugin-ds-svelte';

	$: searchtText = ""
	$: newText = ""
	$: warning = false

	// Recieves a message from plugin code
	onmessage = (event) => {
		if (event.data.pluginMessage === "select-frame") {
			warning = true
		} else if (event.data.pluginMessage === "frame-selected") {
			warning = false
		}
	}

	// Sends a message from plugin code
	function replaceText() {
		parent.postMessage({ pluginMessage: { 
			'type': 'replace-text', 
			'searchtText': searchtText, 
			'newText': newText, 
		} }, '*');
		searchtText = ""
		newText = ""
	}
</script>

<style>
.wrapper {
	padding: var(--size-xxsmall);
	display: grid;
	grid-template-columns: 1fr;
	grid-gap: var(--size-xxsmall);
	width: 100%;
	height: 100%;
	align-items: center;
	text-align: center;
}
button {
	display: block;
	text-align: center;
	border-radius: var(--border-radius-large);
	color: var(--figma-color-text-onbrand);
	flex-shrink: 0;
	font-family: var(--font-stack);
	font-size: var(--font-size-xsmall);
	font-weight: var(--font-weight-medium);
	letter-spacing: var(--font-letter-spacing-neg-small);
	line-height: var(--font-line-height);
	height: var(--size-medium);
	padding: 0 var(--size-xsmall) 0 var(--size-xsmall);
	text-decoration: none;
	outline: none;
	border: 2px solid transparent;
	user-select: none;
	background-color: var(--figma-color-bg-brand);
}
</style>

{#if warning}
	<div class="wrapper">
		<Type>Select a frame first</Type>
	</div>
{:else}
	<div class="wrapper size-xsmall">
		<Input placeholder="Search for..." bind:value={searchtText}/>
		<Input placeholder="Replace with..." bind:value={newText}/>
		<button on:click={replaceText}>Replace</button>
	</div>
{/if}




