<script lang="ts">
	import axios from 'axios';
	import { store } from '$lib/store';
	import { onMount } from 'svelte';
	let numObjectives: number;
	let referencePoint: number[];
	let lagrangeMultipliers: number[];
	let partialTradeoffs: number[][];
	let fx: number[] | undefined = undefined;
	let ideal: number[] | undefined;
	let nadir: number[] | undefined;
	let objective_names: string[];
	let decimal_places: number;

	// Subscribe to the store
	$: {
		$store;
		numObjectives = $store.numObjectives;
		lagrangeMultipliers = $store.lagrangeMultipliers;
		partialTradeoffs = $store.partialTradeoffs;
		fx = $store.fx;
		ideal = $store.ideal;
		nadir = $store.nadir;
		objective_names = $store.objective_names;
		decimal_places = $store.decimal_places;
	}

	// Function to get solution and update the store
	const getSolution = async () => {
		try {
			// Get current reference point from the store
			const response = await axios.post('http://127.0.0.1:5000/get_solution', {
				reference_point: referencePoint
			});

			// Update the store with new data
			store.update((state) => ({
				...state,
				lagrangeMultipliers: response.data.lagrange_multipliers,
				partialTradeoffs: response.data.partial_tradeoffs,
				fx: response.data.fx
			}));
		} catch (error) {
			console.error('Error fetching solution:', error);
		}
	};

	// Initialize referencePoint with the same values as ideal if undefined
	$: if (referencePoint === undefined && ideal) {
		referencePoint = [...ideal];
		store.update((state) => ({ ...state, referencePoint }));
	}

	onMount(() => {
		// Ensure referencePoint is initialized when the component mounts
		if (referencePoint === undefined && ideal) {
			referencePoint = [...ideal];
			store.update((state) => ({ ...state, referencePoint }));
		}
	});

	// Function to update reference point in the store
	function updateReferencePoint(index: number, value: number) {
		store.update((state) => {
			const newReferencePoint = state.referencePoint ? [...state.referencePoint] : [];
			newReferencePoint[index] = value; // Update the specific index with the new value
			return { ...state, referencePoint: newReferencePoint };
		});
	}
</script>

<div class="container">
	<h4 class="h4">Preference information</h4>
	<br />
	<form on:submit|preventDefault={getSolution} class="form">
		<div class="grid-container">
			{#each Array(numObjectives).fill(undefined) as _, index}
				<div class="label">
					<label for="reference-{index}">{$store.objective_names[index]}</label>
				</div>
				{#if ideal != undefined && nadir != undefined}
					<div class="ideal text-sm">Ideal: {ideal[index].toFixed(decimal_places)}</div>
					<div class="nadir text-sm">Nadir: {nadir[index].toFixed(decimal_places)}</div>

					<div class="slider self-center">
						<input
							type="range"
							id="slider-{index}"
							step="0.00001"
							min={ideal[index].toFixed(decimal_places)}
							max={nadir[index].toFixed(decimal_places)}
							class="input"
							bind:value={referencePoint[index]}
							on:input={() => updateReferencePoint(index, referencePoint[index])}
						/>
					</div>
					<div class="input">
						<input
							type="number"
							id="reference-{index}"
							step="0.00001"
							class="input"
							bind:value={referencePoint[index]}
							on:input={() => updateReferencePoint(index, referencePoint[index])}
						/>
					</div>
				{/if}
			{/each}
		</div>
		<button type="submit" class="btn variant-filled">Get Solution</button>
	</form>
</div>

<style>
	.container {
		max-width: 450px;
		margin: auto;
		padding: 1rem;
	}

	.grid-container {
		display: grid;
		gap: 1rem;
		grid-template-columns: repeat(3, 1fr);
	}

	.label {
		grid-column: span 3;
	}

	.slider {
		grid-column: span 2;
	}

	.input {
		grid-column: span 1;
	}

	.ideal,
	.nadir {
		grid-column: span 1;
	}
</style>
