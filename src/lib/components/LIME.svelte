<script lang="ts">
	import { onMount } from 'svelte';
	import axios from 'axios';
	import { store } from '$lib/store';
	import RadarChart from '$lib/components/visual/RadarChart.svelte';
	import BarChart from '$lib/components/visual/BarChart.svelte';
	import DynamicTable from '$lib/components/DynamicTable.svelte';
	import BarChartHorizontal from '$lib/components/visual/BarChartHorizontal.svelte';
	import type { RadarChartData } from '$lib/components/visual/RadarD3.svelte';
	import RadarD3 from '$lib/components/visual/RadarD3.svelte';

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
		<div class="grid gap-y-4 grid-rows-2">
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
					<header class="card-header h5">Impact of each objective</header>
					<section style="height:40vh; width:60wh">
						<BarChart
							indicatorNames={short_names}
							values={lagrangeMultipliers}
							maxSelections={1}
							bind:selectedIndices={selected_objective}
						></BarChart>
					</section>
				</div>
			</div>
			<div class="grid gap-x-4 grid-cols-2">
				<div class="card" style="background-color:white">
					<header class="card-header h5">
						Partial tradeoffs for objective {short_names[selected_objective[0]]}
					</header>
					<section style="height:40vh; width:60wh">
						{#if selected_objective != undefined && selected_objective[0] > -1}
							<BarChartHorizontal
								values={partialTradeoffs[selected_objective[0]]}
								indicatorNames={short_names}
								bind:selectedIndices={selected_objective}
							></BarChartHorizontal>
						{/if}
					</section>
				</div>
				<div class="card" style="background-color:white">
					<header class="card-header h5">History of solutions</header>
					<section
						class="p-4"
						style="height:40vh; width:60wh; text-wrap: balance;overflow-wrap: break-word;"
					>
						<DynamicTable
							title=""
							tableHeader={short_names}
							tableData={history_solutions}
							decimalPlaces={decimal_places}
						></DynamicTable>
					</section>
				</div>
			</div>
		</div>
	{/if}
</div>
