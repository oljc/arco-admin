<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-card
      class="general-card"
      title="内容数据"
      :header-style="{ paddingBottom: 0 }"
      :body-style="{
        paddingTop: '20px'
      }"
    >
      <template #extra>
        <a-link>查看更多</a-link>
      </template>
      <VChart v-if="!loading" height="280px" :options="spec" />
    </a-card>
  </a-spin>
</template>

<script lang="ts" setup>
import useLoading from '@/hooks/useLoading';
import { queryContentData } from '@/api/dashboard';
import { IBarChartSpec } from '@visactor/vchart';
import { onMounted } from 'vue';

const spec: IBarChartSpec = {
  type: 'bar',
  data: [],
  xField: ['x'],
  yField: 'y',
  axes: [
    { orient: 'bottom', type: 'band' },
    { orient: 'left', type: 'linear' }
  ],
  animationNormal: {
    bar: [
      {
        loop: true,
        startTime: 100,
        oneByOne: 100,
        timeSlices: [
          {
            delay: 1000,
            effects: {
              channel: {
                fillOpacity: { to: 0.5 }
              },
              easing: 'linear'
            },
            duration: 500
          },
          {
            effects: {
              channel: {
                fillOpacity: { to: 1 }
              },
              easing: 'linear'
            },
            duration: 500
          }
        ]
      }
    ]
  }
};

const { loading, setLoading } = useLoading(true);
const fetchData = () => {
  setLoading(true);
  queryContentData().then(res => {
    const { data } = res;
    spec.data = [
      {
        id: 'id0',
        values: data
      }
    ];
    setLoading(false);
  });
};
onMounted(() => fetchData());
</script>

<style scoped lang="less"></style>
