<template>
  <a-select
    v-model="value"
    style="width: 85px; padding-right: 6px"
    :options="countryCodes"
    :field-names="fieldNames"
    :triggerProps="{
      contentStyle: { width: '200px' }
    }"
    unmount-on-close
  >
    <template #label="{ data }">
      <span>+{{ data?.code }}</span>
    </template>
    <template #option="{ data }">+{{ data?.code }} {{ data?.zh }}</template>
  </a-select>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import countryCodes from './country-code.json';

// countryCodes排序
countryCodes.sort((a, b) => Number(a.code) - Number(b.code));

const value = ref('86');
const fieldNames = {
  label: 'zh',
  value: 'code'
};
</script>

<style lang="less" scoped>
:deep(.arco-select-view-suffix) {
  padding-left: 6px;
}
</style>
