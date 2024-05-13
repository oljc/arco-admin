<script lang="ts" setup>
import {
  PropType,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  ref,
  watch
} from 'vue';
import { VChart, ISpec } from '@visactor/vchart';

const props = defineProps({
  options: {
    type: Object as PropType<ISpec>,
    default() {
      return {};
    }
  },
  width: {
    type: String,
    default: '100%'
  },
  height: {
    type: String,
    default: '100%'
  }
});

let chart = null;
const chartRef = ref(null);

const initChart = () => {
  if (chartRef.value && !chart && props.options) {
    chart = new VChart(props.options, { dom: chartRef.value });
    chart.renderSync();
  } else {
    releaseChart();
  }
};

const updateChart = () => {
  if (chart) {
    chart.updateSpec(props.options);
    chart.renderSync();
  } else {
    initChart();
  }
};

const releaseChart = () => {
  if (chart) {
    chart.release();
    chart = null;
  }
};

watch(
  () => props.options,
  () => {
    updateChart();
  }
);

onMounted(() => initChart());
onUpdated(() => updateChart());
onBeforeUnmount(() => releaseChart());
</script>

<template>
  <div ref="chartRef" :style="{ width, height }" />
</template>
