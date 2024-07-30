<script lang="ts">
	import { onMount } from 'svelte';
	import axios from 'axios';
	import { store } from '$lib/store';
	import RadarChart from '$lib/components/visual/RadarChart.svelte';
	import BarChart from '$lib/components/visual/BarChart.svelte';
	import DynamicTable from '$lib/components/DynamicTable.svelte';
	import BarChartHorizontal from '$lib/components/visual/BarChartHorizontal.svelte';

	let numObjectives: number;
	let referencePoint: number[] | undefined;
	let lagrangeMultipliers: number[];
	let partialTradeoffs: number[][];
	let fx: number[] | undefined;
	let ideal: number[] | undefined;
	let nadir: number[] | undefined;
	let objective_names: string[];
	let decimal_places: number;
	let selected_objective: number[];
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
		objective_names = $store.objective_names;
		decimal_places = $store.decimal_places;
	}

	// Initialize referencePoint with the same values as ideal if undefined
	$: if (referencePoint === undefined && ideal) {
		referencePoint = [...ideal];
		store.update((state) => ({ ...state, referencePoint }));
	}

	// Function to get solution and update the store
	const getDetails = async () => {
		try {
			const response = await axios.post('http://127.0.0.1:5000/get_details_problem');
			store.update((state) => ({
				...state,
				ideal: response.data.ideal,
				nadir: response.data.nadir,
				objective_names: response.data.objective_names,
				decimal_places: response.data.decimal_places
			}));
		} catch (error) {
			console.error('Error fetching details:', error);
		}
	};

	onMount(() => {
		getDetails();
		selected_objective = [-1];
	});
</script>

<div>
	{#if fx == undefined}
		<p>Click on compute to see results</p>
	{:else}
		<div class="grid grid-cols-2 gap-2">
			<div class="card" style="width:60vh; background-color:white">
				<header class="card-header">Obtained solution</header>
				<section style="height:40vh; width:60vh">
					<RadarChart indicatorNames={objective_names} values={[fx]} />
				</section>
			</div>
			<div class="card" style="width:60vh; background-color:white">
				<header class="card-header">Influence from each objective</header>
				<section style="height:40vh; width:60vh">
					<BarChart
						indicatorNames={objective_names}
						values={lagrangeMultipliers}
						maxSelections={1}
						bind:selectedIndices={selected_objective}
					></BarChart>
				</section>
			</div>
		</div>
		<div class="grid grid-cols-2 gap-2">
			<div class="card" style="width:60vh; background-color:white">
				<header class="card-header">
					Partial tradeoffs for objective {objective_names[selected_objective[0]]}
				</header>
				<section style="height:40vh; width:60vh">
					{#if selected_objective != undefined && selected_objective[0] > -1}
						<BarChartHorizontal
							values={partialTradeoffs[selected_objective[0]]}
							indicatorNames={objective_names}
							bind:selectedIndices={selected_objective}
						></BarChartHorizontal>
					{/if}
				</section>
			</div>
			<div class="card" style="width:60vh; background-color:white">
				<header class="card-header">Analysis</header>
				<section class="p-4" style="height:40vh; width:60vh">
					<ul>
						<li>Obtained solution: {fx}</li>
						<li>Objective to improve: {selected_objective}</li>
						<li>Amount of improvement:</li>
						<li>Value of tradeoff:</li>
						<li>Approximated solution:</li>
						<li>Difference between solutions:</li>
					</ul>
				</section>
			</div>
		</div>
		<!-- 		<DynamicTable
			title="Trade offs"
			tableHeader={objective_names}
			tableData={partialTradeoffs}
			decimalPlaces={decimal_places}
		></DynamicTable>
		<TableTradeoffs></TableTradeoffs> -->
	{/if}
</div>
