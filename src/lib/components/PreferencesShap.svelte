<script lang="ts">
	import axios from 'axios';
	import { store } from '$lib/store';
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
	$: {
		$store;
		num_objectives = $store.numObjectives;
		lagrange_multipliers = $store.lagrangeMultipliers;
		partial_tradeoffs = $store.partialTradeoffs;
		fx = $store.fx;
		ideal = $store.ideal;
		nadir = $store.nadir;
		objective_names = $store.objective_names;
		short_names = $store.short_names;
		decimal_places = $store.decimal_places;
		current_reference_point = $store.referencePoint;
		potential_reference_point = $store.potentialReferencePoint;
		history_solutions = $store.history_solutions;
	}

	// Function to get solution and update the store
	const getSolution = async () => {
		try {
			// Get current reference point from the store
			const response = await axios.post('http://127.0.0.1:5000/shap_improve', {
				reference_point: potential_reference_point
			});

			// Update the store with new data
			store.update((state) => ({
				...state,
				fx: response.data.result,
				suggestions: response.data.suggestions,
				explanations: response.data.explanations,
				history_solutions: [...state.history_solutions, response.data.result]
			}));
			// Format each value in fx to the specified number of decimal places
			const newReferencePoint = response.data.result.map((value: number) =>
				parseFloat(value.toFixed(decimal_places))
			);

			const newReferencePoint2 = response.data.result.map((value: number) =>
				parseFloat(value.toFixed(decimal_places))
			);

			// Update referencePoint with the new fx values
			if (response.data.result) {
				store.update((state) => {
					//console.log('Updating current referencePoint to:', newReferencePoint);
					return { ...state, referencePoint: newReferencePoint };
				});
				store.update((state) => {
					//console.log('Updating current referencePoint to:', newReferencePoint2);
					return { ...state, potentialReferencePoint: newReferencePoint2 };
				});
				//const newReferencePoint = [...response.data.fx]; // Create a new array to ensure reactivity
				potential_reference_point = newReferencePoint2;
				current_reference_point = newReferencePoint;
			}
			console.log('current', current_reference_point);

			console.log('potential', potential_reference_point);
		} catch (error) {
			console.error('Error fetching solution:', error);
		}
	};

	// Function to update reference point in the store
	function updateReferencePoint(index: number, value: number) {
		store.update((state) => {
			const newReferencePoint = state.potentialReferencePoint
				? [...state.potentialReferencePoint]
				: [];
			newReferencePoint[index] = value; // Update the specific index with the new value
			return { ...state, potentialReferencePoint: newReferencePoint };
		});
		//console.log('potential reference point', potential_reference_point);
		//console.log('current reference point', current_reference_point);
	}
</script>

<div>
	<h5 class="h5 font-medium">Preference information</h5>
	<br />
	<form class="form">
		<div class="grid-container">
			{#each Array(num_objectives).fill(undefined) as _, index}
				<div class="label">
					<div class="box box-{index}"></div>
					<span> </span>
					<label for="reference-{index}">
						{$store.objective_names[index]} ({$store.short_names[index]})</label
					>
				</div>
				{#if ideal != undefined && nadir != undefined}
					<div class="slider self-center">
						<input
							type="range"
							id="slider-{index}"
							step="0.00001"
							min={Math.min(nadir[index], ideal[index]).toFixed(decimal_places)}
							max={Math.max(nadir[index], ideal[index]).toFixed(decimal_places)}
							class="input"
							bind:value={potential_reference_point[index]}
							on:input={() => updateReferencePoint(index, potential_reference_point[index])}
						/>
						<div class="slider-display">
							<span>{nadir[index].toFixed(decimal_places)}</span><span>-</span>{ideal[
								index
							].toFixed(decimal_places)}<span></span>
						</div>
					</div>
					<div class="input">
						<input
							type="number"
							id="reference-{index}"
							step="0.00001"
							class="input"
							bind:value={potential_reference_point[index]}
							on:input={() => updateReferencePoint(index, potential_reference_point[index])}
						/>
					</div>
				{/if}
			{/each}
		</div>

		<div>
			<button class="btn variant-filled-primary" on:click={getSolution}>Get Solution</button>
		</div>
	</form>
</div>
