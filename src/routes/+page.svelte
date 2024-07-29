<script lang="ts">
	import TableTradeoffs from '$lib/components/Table_tradeoffs.svelte';
	import { onMount } from 'svelte';
	import axios from 'axios';
	import { store } from '$lib/store';
	import DynamicTable from '$lib/components/DynamicTable.svelte';
	import RadarChart from '$lib/components/visual/RadarChart.svelte';
	import BarChart from '$lib/components/visual/BarChart.svelte';

	let numObjectives: number;
	let referencePoint: number[] | undefined;
	let lagrangeMultipliers: number[];
	let partialTradeoffs: number[][];
	let fx: number[] | undefined;
	let ideal: number[] | undefined;
	let nadir: number[] | undefined;
	let objective_names: string[];
	let decimal_places: number;

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
	});
</script>

<div>
	{#if fx == undefined}
		<p>Click on compute to see results</p>
	{:else}
		<div class="grid grid-cols-2 gap-4">
			<div class="card" style="width:60vh; background-color:white">
				<header class="card-header">Obtained solution</header>
				<section style="height:40vh; width:60vh">
					<RadarChart
						indicatorNames={['Objective1', 'Objective2', 'Objective3', 'Objective4']}
						values={[fx]}
					/>
				</section>
			</div>
			<div class="card" style="width:60vh; background-color:white">
				<header class="card-header">Influence from each objective</header>
				<section style="height:40vh; width:60vh">
					<BarChart
						indicatorNames={['Objective1', 'Objective2', 'Objective3', 'Objective4']}
						values={lagrangeMultipliers}
					></BarChart>
				</section>
			</div>
		</div>
		<DynamicTable
			title="Trade offs"
			tableHeader={objective_names}
			tableData={partialTradeoffs}
			decimalPlaces={decimal_places}
		></DynamicTable>
		<TableTradeoffs></TableTradeoffs>
	{/if}
</div>
