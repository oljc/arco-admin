<template>
  <div class="container">
    <Breadcrumb :items="['列表', '卡片列表']" />
    <a-row :gutter="20" align="stretch">
      <a-col :span="24">
        <a-card class="general-card" title="卡片列表">
          <a-row justify="space-between">
            <a-col :span="24">
              <a-tabs :default-active-tab="1" type="rounded">
                <a-tab-pane key="1" title="全部">
                  <QualityInspection />
                  <TheService />
                  <RulesPreset />
                </a-tab-pane>
                <a-tab-pane key="2" title="内容质检">
                  <QualityInspection />
                </a-tab-pane>
                <a-tab-pane key="3" title="开通服务">
                  <TheService />
                </a-tab-pane>
                <a-tab-pane key="4" title="规则预置">
                  <RulesPreset />
                </a-tab-pane>
              </a-tabs>
            </a-col>
            <a-input-search
              placeholder="搜索"
              style="position: absolute; top: 60px; right: 20px; width: 240px"
            />
          </a-row>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import QualityInspection from './components/quality-inspection.vue';
import TheService from './components/the-service.vue';
import RulesPreset from './components/rules-preset.vue';
</script>

<script lang="ts">
export default {
  name: 'Card'
};
</script>

<style scoped lang="less">
.container {
  padding: 0 20px 20px;

  :deep(.arco-list-content) {
    overflow-x: hidden;
  }

  :deep(.arco-card-meta-title) {
    font-size: 14px;
  }
}

:deep(.arco-list-col) {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
}

:deep(.arco-list-item) {
  width: 33%;
}

:deep(.block-title) {
  margin: 0 0 12px;
  font-size: 14px;
}

:deep(.list-wrap) {
  // min-height: 140px;
  .list-row {
    align-items: stretch;

    .list-col {
      margin-bottom: 16px;
    }
  }

  :deep(.arco-space) {
    width: 100%;

    .arco-space-item {
      &:last-child {
        flex: 1;
      }
    }
  }
}
</style>
