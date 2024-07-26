<script lang="ts">
	import TableTradeoffs from '$lib/components/Table_tradeoffs.svelte';
	import { onMount } from 'svelte';
	import axios from 'axios';
	import { store } from '$lib/store';
	import TableMultipliers from '$lib/components/Table_multipliers.svelte';
	import TableSolution from '$lib/components/Table_solution.svelte';

	let numObjectives: number;
	let referencePoint: number[];
	let lagrangeMultipliers: number[];
	let partialTradeoffs: number[][];
	let fx: number[];
	let ideal: number[];
	let nadir: number[];

	// Subscribe to the store
	$: {
		$store;
		numObjectives = $store.numObjectives;
		referencePoint = $store.referencePoint;
		lagrangeMultipliers = $store.lagrangeMultipliers;
		partialTradeoffs = $store.partialTradeoffs;
		fx = $store.fx;
		ideal = $store.ideal;
		nadir = $store.nadir;
	}
</script>

<div>
	<TableSolution></TableSolution>
	<TableMultipliers></TableMultipliers>
	<TableTradeoffs></TableTradeoffs>
</div>
