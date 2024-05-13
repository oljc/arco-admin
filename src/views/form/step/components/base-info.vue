<template>
  <a-form
    ref="formRef"
    :model="formData"
    class="form"
    :label-col-props="{ span: 6 }"
    :wrapper-col-props="{ span: 18 }"
  >
    <a-form-item
      field="activityName"
      label="活动名称"
      :rules="[
        {
          required: true,
          message: '请输入活动名称'
        },
        {
          match: /^[a-zA-Z0-9\u4e00-\u9fa5]{1,20}$/,
          message: '活动名称只能输入中文、英文、数字，且长度不超过20个字符'
        }
      ]"
    >
      <a-input
        v-model="formData.activityName"
        placeholder="输入汉字、字母或者数字，不超过20个字符"
      />
    </a-form-item>
    <a-form-item
      field="channelType"
      label="渠道类型"
      :rules="[
        {
          required: true,
          message: '请选择渠道类型'
        }
      ]"
    >
      <a-select v-model="formData.channelType" placeholder="请选择渠道类型">
        <a-option>APP通用渠道</a-option>
      </a-select>
    </a-form-item>
    <a-form-item
      field="promotionTime"
      label="推广时间"
      :rules="[
        {
          required: true,
          message: '请选择推广时间'
        }
      ]"
    >
      <a-range-picker v-model="formData.promotionTime" />
    </a-form-item>
    <a-form-item
      field="promoteLink"
      label="推广地址"
      :rules="[
        {
          required: true,
          message: '请输入推广地址'
        },
        {
          type: 'url',
          message: '请输入正确的推广地址'
        }
      ]"
      row-class="keep-margin"
    >
      <a-input v-model="formData.promoteLink" placeholder="请输入推广地址" />
      <template #help>
        <span>
          如 Android 或 iOS 的下载地址、中间跳转URL，网址必须以 http:// 或
          https:// 开头
        </span>
      </template>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" @click="onNextClick">下一步</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { FormInstance } from '@arco-design/web-vue/es/form';
import { BaseInfoModel } from '@/api/form';

const emits = defineEmits(['changeStep']);
const formRef = ref<FormInstance>();
const formData = ref<BaseInfoModel>({
  activityName: '',
  channelType: '',
  promotionTime: [],
  promoteLink: 'https://arco.design'
});

const onNextClick = async () => {
  const res = await formRef.value?.validate();
  if (!res) {
    emits('changeStep', 'forward', { ...formData.value });
  }
};
</script>

<style scoped lang="less">
.container {
  padding: 20px;

  .keep-margin {
    margin-bottom: 20px;
  }
}

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 64px 0;
  background-color: var(--color-bg-2);
}

.steps {
  margin-bottom: 36px;
}

.form {
  width: 500px;
}

.form-content {
  padding: 8px 50px 0 30px;
}
</style>
