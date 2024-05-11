<template>
  <div class="list-wrap">
    <a-typography-title class="block-title" :heading="6">
      开通服务
    </a-typography-title>
    <a-row class="list-row" :gutter="24">
      <a-col
        v-for="item in renderData"
        :key="item.id"
        :xs="12"
        :sm="12"
        :md="12"
        :lg="6"
        :xl="6"
        :xxl="6"
        class="list-col"
        style="min-height: 162px"
      >
        <CardWrap
          :loading="loading"
          :title="item.title"
          :description="item.description"
          :default-value="item.enable"
          :action-type="item.actionType"
          :expires="item.expires"
          open-txt="开通服务"
          close-txt="取消服务"
          expires-text="续约服务"
          tag-text="已开通"
          expires-tag-text="已过期"
          :icon="item.icon"
        >
          <template #skeleton>
            <a-skeleton :animation="true">
              <a-skeleton-line :widths="['100%', '40%', '100%']" :rows="3" />
              <a-skeleton-line :widths="['40%']" :rows="1" />
            </a-skeleton>
          </template>
        </CardWrap>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import { queryTheServiceList, ServiceRecord } from '@/api/list';
import useRequest from '@/hooks/useRequest';
import CardWrap from './card-wrap.vue';

const defaultValue: ServiceRecord[] = new Array(4).fill({});
const { loading, response: renderData } = useRequest<ServiceRecord[]>(
  queryTheServiceList,
  defaultValue
);
</script>

<style scoped lang="less"></style>
