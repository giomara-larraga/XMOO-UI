<!-- 
  @component
  A Svelte component that renders an ECharts chart.
 -->
<script lang="ts">
	import * as echarts from 'echarts';
	import type { ECharts, EChartsOption, EChartsType } from 'echarts';
	import { onMount } from 'svelte';
	import { highlightedStyle } from '$lib/components/visual/constants';

	/** An array of colors (kind of a color palette) to use for the chart series. */
	export let colors: string[] = [];

	/** The ECharts instance used to render the chart. */
	//export let chart: EChartsType | undefined = undefined;
	export let chart: ECharts;

	/** The ECharts chart options. */
	export let option: EChartsOption | any;

	/** Whether to disable animations on the chart. */
	export let disableAnimation = true;

	/** The aspect ratio of the chart container. */
	export let aspect: string | undefined = undefined;

	/** Custom CSS styles to apply to the chart container. */
	export let customStyle = '';

	/**
	 * Event handlers for the chart events.
	 *
	 * @example
	 *   {
	 *   click: function () {
	 *   if (componentIndex != undefined) {
	 *   selectedIndices = updateSelectedIndices(componentIndex);
	 *   }
	 *   },
	 *   mouseover: function () {
	 *   highlightedIndex = componentIndex;
	 *   },
	 *   mouseout: function () {
	 *   highlightedIndex = undefined;
	 *   },
	 *   };
	 */
	export let events:
		| {
				[key: string]: (params: {
					dataIndex: number;
					componentType: string;
					seriesIndex: number;
					intervals: number[][];
					data: { value: number[] };
				}) => void;
		  }
		| undefined = undefined;

	let chartDiv: HTMLDivElement;

	//Attaches the given event handlers to the chart instance.
	$: if (events) {
		if (chart) {
			for (const [eventName, eventHandler] of Object.entries(events)) {
				chart.on(eventName, eventHandler);
				chart = chart;
			}
		}
	}

	onMount(() => {
		if (!chart) {
			chart = echarts.init(chartDiv, '', { renderer: 'svg' });
			chart.setOption(option as echarts.EChartOption);
			if (disableAnimation) {
				chart.setOption({
					color: colors,
					// TODO: solve type error
					//  eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore -- Error says that colorBy doesn't exist in the echarts series type, but in the documentation it exists. Might be because it's a new property (v.5.2.0), so they have not updated the type yet. https://echarts.apache.org/en/option.html#series-bar.colorBy
					colorBy: 'data',
					animation: !disableAnimation
				});
			} else {
				chart.setOption({
					color: colors,
					// TODO: solve type error
					//  eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-ignore -- Error says that colorBy doesn't exist in the echarts series type, but in the documentation it exists. Might be because it's a new property (v.5.2.0), so they have not updated the type yet. https://echarts.apache.org/en/option.html#series-bar.colorBy
					colorBy: 'data',
					animation: !disableAnimation,
					series: [
						{
							type: '',
							emphasis: {
								itemStyle: {
									color: highlightedStyle.color,
									opacity: highlightedStyle.opacity
								},
								lineStyle: {
									color: highlightedStyle.color,
									width: highlightedStyle.width,
									opacity: highlightedStyle.opacity
								}
							}
						}
					]
				});
			}
		} else {
			chart.resize();
		}
	});
</script>

<div class={aspect} style="height: 100%; width: 100%; {customStyle};" bind:this={chartDiv} />
