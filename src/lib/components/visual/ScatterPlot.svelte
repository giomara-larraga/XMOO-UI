<script lang="ts">
	import type * as echarts from 'echarts';
	import type { EChartsOption, EChartOption } from 'echarts';
	import { colorPalette, selectedLineStyle } from '$lib/components/visual/constants';
	import {
		handleClickSelection,
		handleSelectionChange,
		handleHighlightChange
	} from '$lib/components/visual/helperFunctions';
	import EchartsComponent from '$lib/components/visual/EchartsComponent.svelte';

	/** The values to use for the chart. */
	export let values: number[];

	/** The names to use for the indicators (axis). */
	export let indicatorNames: string[] = [];

	/** The indices of the selected items in the chart. */
	export let selectedIndices: number[] = [];

	/** The index of the highlighted item in the chart. */
	export let highlightedIndex: number | undefined = undefined;

	/** The maximum number of items that can be selected in the chart. */
	export let maxSelections: number | undefined = undefined;

	/** If true, the animation of the chart will be disabled. */
	export let disableAnimation: boolean | undefined = undefined;

	/** The aspect ratio of the div container, which contains the chart. */
	export let aspect: string | undefined = 'aspect-[5/3]';

	let chart: echarts.EChartsType;
	let option: EChartOption;

	$: if (selectedIndices && chart) {
		handleSelectionChange(chart, selectedIndices, maxSelections);
	}

	$: if (chart) {
		handleHighlightChange(chart, highlightedIndex);
	}

	$: {
		// Create the option object for the whole chart.
		option = {
			xAxis: {},
			yAxis: {},
			series: [
				{
					symbolSize: 20,
					data: [
						[10.0, 8.04],
						[8.07, 6.95],
						[13.0, 7.58],
						[9.05, 8.81],
						[11.0, 8.33],
						[14.0, 7.66],
						[13.4, 6.81],
						[10.0, 6.33],
						[14.0, 8.96],
						[12.5, 6.82],
						[9.15, 7.2],
						[11.5, 7.2],
						[3.03, 4.23],
						[12.2, 7.83],
						[2.02, 4.47],
						[1.05, 3.33],
						[4.05, 4.96],
						[6.03, 7.24],
						[12.0, 6.26],
						[12.0, 8.84],
						[7.08, 5.82],
						[5.02, 5.68]
					],
					type: 'scatter'
				}
			]
		};
		if (chart) {
			chart.setOption(option);
		}
	}

	let events = {
		click: function (params: {
			dataIndex: number;
			componentType: string;
			seriesIndex: number;
			data: { value: number[] };
		}) {
			selectedIndices = handleClickSelection(chart, params, selectedIndices, maxSelections);
			console.log(selectedIndices[0]);
		},
		mouseover: function (params: { dataIndex: number }) {
			highlightedIndex = params.dataIndex;
		},
		mouseout: function () {
			highlightedIndex = undefined;
		}
	};
</script>

<EchartsComponent {option} bind:chart bind:events {disableAnimation} {aspect} />
