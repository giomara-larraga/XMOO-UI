<script lang="ts">
	import '../app.postcss';
	import {
		AppShell,
		AppBar,
		type PopupSettings,
		ListBox,
		ListBoxItem,
		popup
	} from '@skeletonlabs/skeleton';
	import Preferences from '$lib/components/Preferences.svelte';
	// Highlight JS
	import hljs from 'highlight.js/lib/core';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import xml from 'highlight.js/lib/languages/xml'; // for HTML
	import css from 'highlight.js/lib/languages/css';
	import javascript from 'highlight.js/lib/languages/javascript';
	import typescript from 'highlight.js/lib/languages/typescript';

	hljs.registerLanguage('xml', xml); // for HTML
	hljs.registerLanguage('css', css);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('typescript', typescript);
	storeHighlightJs.set(hljs);

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead"><h4>XMOO</h4></svelte:fragment>
			<svelte:fragment slot="trail">
				<select class="select" value="1">
					<option value="1">River Pollution (4 objectives)</option>
					<option value="2">River Pollution (5 objectives)</option>
				</select>
				<select class="select" value="1">
					<option value="1">LIME</option>
					<option value="2">SHAP</option>
				</select>
				<button type="button" class="btn variant-filled-secondary">Start</button>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		<div>
			<Preferences />
		</div>
	</svelte:fragment>
	<!-- Page Route Content -->
	<slot />
</AppShell>
