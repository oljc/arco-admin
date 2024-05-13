<template>
  <div class="success-wrap">
    <a-result status="success" title="提交成功" subtitle="表单提交成功！" />
    <a-space :size="16">
      <a-button key="view" type="primary">查看详情</a-button>
      <a-button key="again" type="secondary" @click="oneMore">
        再次创建
      </a-button>
    </a-space>
    <div class="details-wrapper">
      <a-typography-title :heading="6" style="margin-top: 0">
        渠道表单说明
      </a-typography-title>
      <a-typography-paragraph style="margin-bottom: 0">
        广告商渠道推广支持追踪在第三方广告商投放广告下载App用户的场景，例如在今日头条渠道投放下载App广告，追踪通过在渠道下载激活App的用户。
        <a-link href="link">查看详情</a-link>
      </a-typography-paragraph>
    </div>
  </div>
</template>

<script lang="ts" setup>
const emits = defineEmits(['changeStep']);
const oneMore = () => {
  emits('changeStep', 1);
};
</script>

<style scoped lang="less">
.success-wrap {
  text-align: center;
}

:deep(.arco-result) {
  padding-top: 0;
}

.details-wrapper {
  width: 895px;
  padding: 20px;
  margin-top: 54px;
  text-align: left;
  background-color: var(--color-fill-2);
}
</style>
