<script lang="ts">
	import axios from 'axios';
	import { store } from '$lib/store';
	import { Tab, TabGroup } from '@skeletonlabs/skeleton';
	import Preferences from './Preferences.svelte';
	import PreferencesBars from './PreferencesBars.svelte';
	let num_objectives: number;
	let current_reference_point: number[] = [];
	let lagrange_multipliers: number[];
	let partial_tradeoffs: number[][];
	let fx: number[] | undefined = undefined;
	let ideal: number[] | undefined;
	let nadir: number[] | undefined;
	let objective_names: string[];
	let short_names: string[];
	let decimal_places: number;
	let potential_reference_point: number[] = [];
	let approximated_solution: number[] = [];
	let history_solutions: number[][];
	// Subscribe to the store
	let tabSet: number = 0;
</script>

<TabGroup>
	<Tab bind:group={tabSet} name="tab1" value={0}>
		<span>Objectives</span>
	</Tab>
	<Tab bind:group={tabSet} name="tab2" value={1}>Analysis</Tab>
	<!-- Tab Panels --->
	<svelte:fragment slot="panel">
		{#if tabSet === 0}
			<PreferencesBars />
		{:else if tabSet === 1}
			(tab panel 2 contents)
		{/if}
	</svelte:fragment>
</TabGroup>
