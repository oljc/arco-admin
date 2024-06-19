<template>
  <a-card :bordered="false" :body-style="{ padding: '20px' }">
    <a-tabs default-active-tab="liveMethod">
      <a-tab-pane key="liveMethod" title="直播方式" />
      <a-tab-pane key="onlinePopulation" title="在线人数" />
    </a-tabs>
    <div class="data-statistic-content">
      <a-radio-group :default-value="3" type="button">
        <a-radio :value="1">普通直播</a-radio>
        <a-radio :value="2">控流直播</a-radio>
        <a-radio :value="3">视频直播</a-radio>
        <a-radio :value="4">网页直播</a-radio>
      </a-radio-group>

      <div class="data-statistic-list-wrapper">
        <div class="data-statistic-list-header">
          <a-button type="text">编辑轮播</a-button>
          <a-button disabled>开始轮播</a-button>
        </div>
        <div class="data-statistic-list-content">
          <DataStatisticList />
        </div>
      </div>
    </div>
  </a-card>
</template>

<script lang="ts" setup>
import DataStatisticList from './data-statistic-list.vue';
</script>

<style scoped lang="less">
.data-statistic {
  &-content {
    padding: 20px 0;
  }

  &-list {
    &-header {
      display: flex;
      justify-content: space-between;
      margin-top: 16px;
    }

    &-content {
      margin-top: 16px;
    }
  }
}
</style>
