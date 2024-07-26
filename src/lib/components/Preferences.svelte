<script lang="ts">
	import { onMount } from 'svelte';
	import axios from 'axios';
	import { store } from '$lib/store';
	import { RangeSlider } from '@skeletonlabs/skeleton';
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

	// Function to get solution and update the store
	const getDetails = async () => {
		try {
			const response = await axios.post('http://127.0.0.1:5000/get_details_problem');
			store.update((state) => ({
				...state,
				ideal: response.data.ideal,
				nadir: response.data.nadir,
				referencePoint: response.data.ideal // assuming you want to initialize referencePoint with ideal
			}));
		} catch (error) {
			console.error('Error fetching solution:', error);
		}
	};

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

	// Function to update reference point in the store
	function updateReferencePoint(index: number, value: number) {
		store.update((state) => {
			const newReferencePoint = [...state.referencePoint];
			newReferencePoint[index] = value;
			return { ...state, referencePoint: newReferencePoint };
		});
	}

	onMount(() => {
		getDetails();
	});
</script>

<div class="container">
	<h4 class="h4">Preference information</h4>
	<br />
	<form on:submit|preventDefault={getSolution} class="form">
		<div class="grid-container">
			{#each Array(numObjectives).fill(undefined) as _, index}
				<div class="label">
					<label for="reference-{index}">Objective {index + 1}</label>
				</div>
				<div class="ideal text-sm">Ideal: {$store.ideal[index]}</div>
				<div class="nadir text-sm">Nadir: {$store.nadir[index]}</div>
				<div class="slider self-center">
					<input
						type="range"
						id="slider-{index}"
						step="0.00001"
						min={ideal[index]}
						max={nadir[index]}
						class="input"
						bind:value={$store.referencePoint[index]}
						on:input={() => updateReferencePoint(index, $store.referencePoint[index])}
					/>
				</div>
				<div class="input">
					<input
						type="number"
						id="reference-{index}"
						step="0.00001"
						class="input"
						bind:value={$store.referencePoint[index]}
						on:input={() => updateReferencePoint(index, $store.referencePoint[index])}
					/>
				</div>
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
