<script lang="ts">
	import { onMount } from 'svelte';
	import axios from 'axios';
	import { store } from '$lib/store';
	import Lime from '$lib/components/LIME.svelte';
	import { AppShell } from '@skeletonlabs/skeleton';
	import Preferences from '$lib/components/Preferences.svelte';
	import SideBarInteractivized from '$lib/components/SideBarInteractivized.svelte';
	import IntegratedInterface from '$lib/components/IntegratedInterface.svelte';
	import NumericalData from '$lib/components/NumericalData.svelte';

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
	let approximated_solution: number[];
	let history_solutions: number[][];

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
				numObjectives: response.data.num_objectives,
				ideal: response.data.ideal,
				nadir: response.data.nadir,
				objective_names: response.data.objective_names,
				short_names: response.data.short_names,
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

<AppShell>
	<svelte:fragment slot="sidebarLeft">
		<SideBarInteractivized />
	</svelte:fragment>
	{#if fx == undefined}
		<p>Click on compute to see results</p>
	{:else}
		<IntegratedInterface></IntegratedInterface>
	{/if}
	<svelte:fragment slot="pageFooter"><NumericalData /></svelte:fragment>
</AppShell>
