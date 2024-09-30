<script lang="ts">
	import { store } from '$lib/store';
	import BarChart from '$lib/components/visual/BarChart.svelte';
	import type { RadarChartData } from '$lib/components/visual/RadarD3.svelte';
	import RadarD3 from '$lib/components/visual/RadarD3.svelte';
	import ScatterPlot from './visual/ScatterPlot.svelte';

	let numObjectives: number;
	let referencePoint: number[] = [];
	let potentialReferencePoint: number[] = [];
	let lagrangeMultipliers: number[];
	let partialTradeoffs: number[][];
	let fx: number[] | undefined;
	let ideal: number[] | undefined;
	let nadir: number[] | undefined;
	let objective_names: string[];
	let short_names: string[];
	let decimal_places: number;
	let selected_objective: number[];
	let approximated_solution: number[];
	let history_solutions: number[][];
	const data1: RadarChartData[] = [
		{ label: 'Metric 1', value: 70 },
		{ label: 'Metric 2', value: 60 },
		{ label: 'Metric 3', value: 80 },
		{ label: 'Metric 4', value: 90 },
		{ label: 'Metric 5', value: 100 }
	];
	// Subscribe to the store
	$: {
		$store;
		numObjectives = $store.numObjectives;
		referencePoint = $store.referencePoint;
		potentialReferencePoint = $store.potentialReferencePoint;
		lagrangeMultipliers = $store.lagrangeMultipliers;
		partialTradeoffs = $store.partialTradeoffs;
		fx = $store.fx;
		ideal = $store.ideal;
		nadir = $store.nadir;
		objective_names = $store.objective_names;
		short_names = $store.short_names;
		decimal_places = $store.decimal_places;
		approximated_solution = $store.approximated_solution;
		history_solutions = $store.history_solutions;
	}

	selected_objective = [-1];
</script>

<div>
	{#if fx == undefined}
		<p>Click on compute to see results</p>
	{:else}
		<div class="grid gap-y-4 grid-rows-1">
			<div class="grid gap-x-4 grid-cols-2">
				<div class="card" style="background-color:white">
					<header class="card-header h5">Solution(s)</header>
					<section
						style="height:40vh; width:60wh; display:flex; flex-direction:column; align-items:center"
					>
						<RadarD3 data={data1} width={300} height={300} color="red" />
					</section>
				</div>
				<div class="card" style="background-color:white">
					<header class="card-header h5">Decision Space</header>
					<section style="height:40vh; width:60wh">
						<ScatterPlot
							indicatorNames={short_names}
							values={lagrangeMultipliers}
							maxSelections={1}
							bind:selectedIndices={selected_objective}
						></ScatterPlot>
					</section>
				</div>
			</div>
		</div>
	{/if}
</div>
