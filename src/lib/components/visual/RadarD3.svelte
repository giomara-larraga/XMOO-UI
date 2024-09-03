<script context="module" lang="ts">
	export interface RadarChartData {
		label: string;
		value: number;
	}
</script>

<script lang="ts">
	import * as d3 from 'd3';
	import { onMount } from 'svelte';

	export let data: RadarChartData[];
	export let levels: number = 5;
	export let width: number = 300;
	export let height: number = 300;
	export let maxValue: number = 100;
	export let color: string = 'steelblue';

	let chartContainer: HTMLDivElement;
	let tooltip: HTMLDivElement;

	const createRadarChart = () => {
		const cfg = {
			radius: Math.min(width / 2, height / 2),
			format: d3.format('.0%')
		};

		const angleSlice = (2 * Math.PI) / data.length;
		const rScale = d3.scaleLinear().range([0, cfg.radius]).domain([0, maxValue]);

		// Clear previous chart if exists
		d3.select(chartContainer).select('svg').remove();

		const svg = d3
			.select(chartContainer)
			.append('svg')
			.attr('width', width)
			.attr('height', height)
			.append('g')
			.attr('transform', `translate(${width / 2},${height / 2})`);

		// Draw circular grid
		for (let i = 0; i < levels; i++) {
			svg
				.append('circle')
				.attr('r', ((i + 1) / levels) * cfg.radius)
				.attr('fill', 'none')
				.attr('stroke', 'gray')
				.attr('stroke-width', '0.5px');
		}

		// Draw the axes
		const axis = svg.selectAll('.axis').data(data).enter().append('g').attr('class', 'axis');

		axis
			.append('line')
			.attr('x1', 0)
			.attr('y1', 0)
			.attr('x2', (d, i) => rScale(maxValue) * Math.cos(angleSlice * i - Math.PI / 2))
			.attr('y2', (d, i) => rScale(maxValue) * Math.sin(angleSlice * i - Math.PI / 2))
			.attr('stroke', 'gray')
			.attr('stroke-width', '2px');

		axis
			.append('text')
			.attr('x', (d, i) => rScale(maxValue * 1.1) * Math.cos(angleSlice * i - Math.PI / 2))
			.attr('y', (d, i) => rScale(maxValue * 1.1) * Math.sin(angleSlice * i - Math.PI / 2))
			.attr('dy', '0.35em')
			.attr('text-anchor', 'middle')
			.text((d) => d.label)
			.style('font-size', '11px');

		// Radar chart area
		const radarLine = d3
			.lineRadial<RadarChartData>()
			.radius((d) => rScale(d.value))
			.angle((d, i) => i * angleSlice)
			.curve(d3.curveLinearClosed);

		svg
			.append('path')
			.datum(data)
			.attr('d', radarLine)
			.attr('fill', color)
			.attr('fill-opacity', 0.3)
			.attr('stroke', color)
			.attr('stroke-width', 2);

		// Create the tooltip div
		// Create the tooltip div and append it to the body
		let tooltip = d3
			.select('body')
			.append('div')
			.attr('class', 'tooltip')
			.style('position', 'absolute')
			.style('padding', '5px')
			.style('background-color', 'white')
			.style('border', '1px solid #ccc')
			.style('border-radius', '3px')
			.style('pointer-events', 'none')
			.style('opacity', 0);

		// Add markers and tooltips
		svg
			.selectAll('.radar-point')
			.data(data)
			.enter()
			.append('circle')
			.attr('class', 'radar-point')
			.attr('r', 5)
			.attr('cx', (d, i) => rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2))
			.attr('cy', (d, i) => rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2))
			.attr('fill', color)
			.on('mouseover', (event, d) => {
				tooltip.transition().duration(200).style('opacity', 0.9);
				tooltip
					.html(`<strong>${d.label}</strong><br>Value: ${d.value}`)
					.style('left', `${event.pageX + 5}px`)
					.style('top', `${event.pageY - 28}px`);
			})
			.on('mouseout', () => {
				tooltip.transition().duration(500).style('opacity', 0);
			});
	};

	onMount(() => {
		createRadarChart();
	});

	$: createRadarChart();
</script>

<div bind:this={chartContainer}></div>

<style>
	div {
		display: inline-block;
	}

	.tooltip {
		font-size: 12px;
		color: #333;
	}
</style>
