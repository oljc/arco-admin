<template>
  <a-card class="general-card">
    <template #title>参数调整记录</template>
    <a-spin :loading="loading" style="width: 100%">
      <a-table :data="renderData">
        <template #columns>
          <a-table-column title="内容编号" data-index="contentNumber" />
          <a-table-column title="调整内容" data-index="updateContent" />
          <a-table-column title="当前状态" data-index="status">
            <template #cell="{ record }">
              <p v-if="record.status === 0">
                <span class="circle"></span>
                <span>审核中</span>
              </p>
              <p v-if="record.status === 1">
                <span class="circle pass"></span>
                <span>已通过</span>
              </p>
            </template>
          </a-table-column>
          <a-table-column title="修改时间" data-index="updateTime" />
          <a-table-column title="操作">
            <template #cell>
              <a-button type="text">查看</a-button>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-spin>
  </a-card>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { queryOperationLog, operationLogRes } from '@/api/profile';
import useLoading from '@/hooks/useLoading';

const { loading, setLoading } = useLoading(true);
const renderData = ref<operationLogRes>([]);
const fetchData = async () => {
  try {
    const { data } = await queryOperationLog();
    renderData.value = data;
  } catch (err) {
    // you can report use errorHandler or other
  } finally {
    setLoading(false);
  }
};
fetchData();
</script>

<style scoped lang="less">
:deep(.arco-table-th) {
  &:last-child {
    .arco-table-th-item-title {
      margin-left: 16px;
    }
  }
}
</style>
