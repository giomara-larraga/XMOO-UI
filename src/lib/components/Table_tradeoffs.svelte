<script lang="ts">
	import { onMount } from 'svelte';
	import axios from 'axios';
	import { store } from '$lib/store';

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
</script>

<div class="container">
	<h2>Trade offs</h2>
	<div class="table-container">
		<!-- Native Table Element -->
		<table class="table table-hover">
			<thead>
				<tr>
					{#each Array(numObjectives).fill(undefined) as _, index}
						<th>Objective {index + 1}</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				<tr> </tr>
				{#each $store.fx as f}
					<td>{f}</td>
				{/each}
			</tbody>
		</table>
	</div>
</div>
