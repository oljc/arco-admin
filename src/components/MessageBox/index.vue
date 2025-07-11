<template>
  <a-spin style="display: block" :loading="loading">
    <a-tabs v-model:activeKey="messageType" type="rounded" destroy-on-hide>
      <a-tab-pane v-for="item in tabList" :key="item.key">
        <template #title>
          <span>{{ item.title }}{{ formatUnreadLength(item.key) }}</span>
        </template>
        <a-result v-if="!renderList.length" status="404">
          <template #subtitle>暂无内容</template>
        </a-result>
        <List :render-list="renderList" :unread-count="unreadCount" @item-click="handleItemClick" />
      </a-tab-pane>
      <template #extra>
        <a-button type="text" @click="emptyList">清空</a-button>
      </template>
    </a-tabs>
  </a-spin>
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs, computed } from 'vue';
import { queryMessageList, setMessageStatus, MessageRecord, MessageListType } from '@/api/message';
import useLoading from '@/hooks/useLoading';
import List from './list.vue';

interface TabItem {
  key: string;
  title: string;
  avatar?: string;
}
const { loading, setLoading } = useLoading(true);
const messageType = ref('message');
const messageData = reactive<{
  renderList: MessageRecord[];
  messageList: MessageRecord[];
}>({
  renderList: [],
  messageList: []
});
toRefs(messageData);
const tabList: TabItem[] = [
  {
    key: 'message',
    title: '消息'
  },
  {
    key: 'notice',
    title: '通知'
  },
  {
    key: 'todo',
    title: '待办'
  }
];
async function fetchSourceData() {
  setLoading(true);
  try {
    const data = await queryMessageList();
    messageData.messageList = data;
  } catch {
    // todo
  } finally {
    setLoading(false);
  }
}
async function readMessage(data: MessageListType) {
  const ids = data.map(item => item.id);
  await setMessageStatus({ ids });
  fetchSourceData();
}
const renderList = computed(() => {
  return messageData.messageList.filter(item => messageType.value === item.type);
});
const unreadCount = computed(() => {
  return renderList.value.filter(item => !item.status).length;
});
const getUnreadList = (type: string) => {
  const list = messageData.messageList.filter(item => item.type === type && !item.status);
  return list;
};
const formatUnreadLength = (type: string) => {
  const list = getUnreadList(type);
  return list.length ? `(${list.length})` : ``;
};
const handleItemClick = (items: MessageListType) => {
  if (renderList.value.length) readMessage([...items]);
};
const emptyList = () => {
  messageData.messageList = [];
};
fetchSourceData();
</script>

<style scoped lang="less">
:deep(.arco-popover-popup-content) {
  padding: 0;
}

:deep(.arco-list-item-meta) {
  align-items: flex-start;
}

:deep(.arco-tabs-nav) {
  padding: 14px 0 12px 16px;
  border-bottom: 1px solid var(--color-neutral-3);
}

:deep(.arco-tabs-content) {
  padding-top: 0;

  .arco-result-subtitle {
    color: rgb(var(--gray-6));
  }
}
</style>
