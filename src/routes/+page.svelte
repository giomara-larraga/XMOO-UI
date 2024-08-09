<script lang="ts">
	import { onMount } from 'svelte';
	import axios from 'axios';
	import { store } from '$lib/store';
	import RadarChart from '$lib/components/visual/RadarChart.svelte';
	import BarChart from '$lib/components/visual/BarChart.svelte';
	import DynamicTable from '$lib/components/DynamicTable.svelte';
	import BarChartHorizontal from '$lib/components/visual/BarChartHorizontal.svelte';

	let numObjectives: number;
	let referencePoint: number[] = [];
	let potentialReferencePoint: number[] = [];
	let lagrangeMultipliers: number[];
	let partialTradeoffs: number[][];
	let fx: number[] | undefined;
	let ideal: number[] | undefined;
	let nadir: number[] | undefined;
	let objective_names: string[];
	let decimal_places: number;
	let selected_objective: number[];
	let approximated_solution: number[];
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
		decimal_places = $store.decimal_places;
		approximated_solution = $store.approximated_solution;
	}

	// Initialize referencePoint with the same values as ideal if undefined
	$: {
		if (referencePoint.length === 0 && ideal) {
			referencePoint = [...ideal];
			store.update((state) => ({ ...state, referencePoint: referencePoint }));
		}
		if (potentialReferencePoint.length === 0 && ideal) {
			potentialReferencePoint = [...ideal];
			store.update((state) => ({ ...state, potentialReferencePoint: potentialReferencePoint }));
		}
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
				<header class="card-header h5">Obtained solution</header>
				<section style="height:40vh; width:60vh">
					<RadarChart indicatorNames={objective_names} values={[fx, approximated_solution]} />
				</section>
			</div>
			<div class="card" style="width:60vh; background-color:white">
				<header class="card-header h5">Influence from each objective</header>
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
				<header class="card-header h5">
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
				<header class="card-header h5">Analysis</header>
				<section
					class="p-4"
					style="height:40vh; width:60vh; text-wrap: balance;overflow-wrap: break-word;"
				>
					<ul>
						<li>Obtained solution: {fx}</li>
						<li>Approximated solution: {approximated_solution}</li>
						{#if fx !== undefined && approximated_solution !== undefined}
							<li>
								Difference between solutions:
								{approximated_solution.map((value, index) => {
									if (fx !== undefined) {
										// Extra check to ensure fx is defined
										return value - fx[index];
									}
									return 0; // Fallback if fx is unexpectedly undefined (which shouldn't happen)
								})}
							</li>
						{/if}
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
