<script lang="ts">
	import { onMount } from 'svelte';
	import axios from 'axios';
	import { store } from '$lib/store';
	import RadarChart from '$lib/components/visual/RadarChart.svelte';
	import BarChart from '$lib/components/visual/BarChart.svelte';
	import DynamicTable from '$lib/components/DynamicTable.svelte';
	import BarChartHorizontal from '$lib/components/visual/BarChartHorizontal.svelte';
	import { Tab, TabGroup } from '@skeletonlabs/skeleton';

	let numObjectives: number;
	let referencePoint: number[] = [];
	let potentialReferencePoint: number[] = [];
	let explanations: string[];
	let suggestions: string[];
	let fx: number[] | undefined;
	let ideal: number[] | undefined;
	let nadir: number[] | undefined;
	let objective_names: string[];
	let short_names: string[];
	let decimal_places: number;
	let selected_objective: string = '';
	let history_solutions: number[][];

	// Subscribe to the store
	$: {
		$store;
		numObjectives = $store.numObjectives;
		referencePoint = $store.referencePoint;
		potentialReferencePoint = $store.potentialReferencePoint;
		suggestions = $store.suggestions;
		explanations = $store.explanations;
		fx = $store.fx;
		ideal = $store.ideal;
		nadir = $store.nadir;
		objective_names = $store.objective_names;
		short_names = $store.short_names;
		decimal_places = $store.decimal_places;
		history_solutions = $store.history_solutions;
	}
</script>

<div>
	{#if fx == undefined}
		<p>Click on compute to see results</p>
	{:else}
		<div class="grid gap-y-4 grid-rows-1">
			<div class="grid gap-x-4 grid-cols-2">
				<div class="card" style="background-color:white">
					<header class="card-header h5">Solution(s)</header>
					<section style="height:40vh; width:60wh">
						<RadarChart indicatorNames={short_names} values={[fx]} />
					</section>
				</div>
				<div class="card" style="background-color:white">
					<header class="card-header h5">Objective to improve</header>
					<section style="height:40vh; width:60wh">
						<TabGroup>
							{#each short_names as name}
								<Tab bind:group={selected_objective} name={`tab${name}`} value={name}>
									<span>{name}</span>
								</Tab>
							{/each}

							<!-- Tab Panels -->
							<div slot="panel" class="p-4">
								{#each short_names as name, i}
									{#if selected_objective === name}
										Suggestion and explanation for {name}
										<p>{suggestions[i]}</p>
										<p>{explanations[i]}</p>
									{/if}
								{/each}
							</div>
						</TabGroup>
					</section>
				</div>
			</div>
		</div>
	{/if}
</div>
