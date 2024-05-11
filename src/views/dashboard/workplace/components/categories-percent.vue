<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-card
      class="general-card"
      title="内容类型占比"
      :header-style="{ paddingBottom: '0' }"
      :body-style="{
        padding: '20px'
      }"
    >
      <VChart height="306px" :options="spec" />
    </a-card>
  </a-spin>
</template>

<script lang="ts" setup>
import useLoading from '@/hooks/useLoading';
import { ISpec } from '@visactor/vchart';

const { loading } = useLoading();
const spec: ISpec = {
  type: 'pie',
  data: [
    {
      id: 'id0',
      values: [
        { type: '纯文本', value: '46.60' },
        { type: '图文', value: '27.72' },
        { type: '短视频', value: '8.13' },
        { type: '长视频', value: '5' },
        { type: '动图', value: '3.63' }
      ]
    }
  ],
  outerRadius: 0.8,
  innerRadius: 0.5,
  padAngle: 0.6,
  valueField: 'value',
  categoryField: 'type',
  pie: {
    style: {
      cornerRadius: 8,
      lineWidth: 0,
      strokeOpacity: 0.5
    },
    state: {
      hover: {
        lineWidth: 8,
        outerBorder: {
          distance: 0.5,
          stroke: '#fff'
        }
      },
      selected: {
        lineWidth: 10,
        outerBorder: {
          distance: 0.2,
          stroke: '#fff'
        }
      }
    }
  },
  legends: {
    visible: true,
    orient: 'bottom'
  },
  label: {
    visible: true
  },
  tooltip: {
    mark: {
      content: [
        {
          key: datum => datum['type'],
          value: datum => datum['value'] + '%'
        }
      ]
    }
  },
  indicator: {
    visible: true,
    trigger: 'select',
    title: {
      visible: true,
      style: {
        fontSize: 14,
        text: data => {
          if (data) {
            const value = data['type'];
            return value ? value : null;
          }
          return '内容量';
        }
      }
    },
    content: [
      {
        visible: true,
        style: {
          fontSize: 14,
          text: data => {
            if (data) {
              const value = data['value'];
              return value ? `${value}%` : null;
            }
            return 1234;
          }
        }
      }
    ]
  }
};
</script>
