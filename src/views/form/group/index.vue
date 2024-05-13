<template>
  <div class="container">
    <Breadcrumb :items="['menu.form', 'menu.formGroup']" />
    <a-form ref="formRef" layout="vertical" :model="formData">
      <a-space direction="vertical" :size="16">
        <a-card class="general-card">
          <template #title>视频参数</template>
          <a-row :gutter="80">
            <a-col :span="8">
              <a-form-item label="匹配模式" field="video.mode">
                <a-select placeholder="请选择">
                  <a-option value="custom">自定义</a-option>
                  <a-option value="mode1">模式1</a-option>
                  <a-option value="mode2">模式2</a-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item
                label="采集分辨率"
                field="video.acquisition.resolution"
              >
                <a-select placeholder="请选择">
                  <a-option value="resolution1">分辨率1</a-option>
                  <a-option value="resolution2">分辨率2</a-option>
                  <a-option value="resolution3">分辨率3</a-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="采集帧率" field="video.acquisition.frameRate">
                <a-input
                  placeholder="
                    输入范围[1, 30]
                  "
                >
                  <template #append>fps</template>
                </a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="80">
            <a-col :span="8">
              <a-form-item label="编码分辨率" field="video.encoding.resolution">
                <a-select placeholder="请选择">
                  <a-option value="resolution1">分辨率1</a-option>
                  <a-option value="resolution2">分辨率2</a-option>
                  <a-option value="resolution3">分辨率3</a-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item
                label="编码码率最小值"
                field="video.encoding.rate.min"
              >
                <a-input placeholder="输入范围[150, 1800]" add-after="bps">
                  <template #append>bps</template>
                </a-input>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item
                label="编码码率最大值"
                field="video.encoding.rate.max"
              >
                <a-input placeholder="输入范围[150, 1800]">
                  <template #append>bps</template>
                </a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="80">
            <a-col :span="8">
              <a-form-item
                label="编码码率默认值"
                field="video.encoding.rate.default"
              >
                <a-input placeholder="输入范围[150, 1800]">
                  <template #append>bps</template>
                </a-input>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="编码帧率" field="video.encoding.frameRate">
                <a-input placeholder="输入范围[1, 30]">
                  <template #append>fps</template>
                </a-input>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="编码profile" field="video.encoding.profile">
                <a-input placeholder="输入范围[150, 1800]">
                  <template #append>bps</template>
                </a-input>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>
        <a-card class="general-card">
          <template #title>音频参数</template>
          <a-row :gutter="80">
            <a-col :span="8">
              <a-form-item label="匹配模式" field="audio.mode">
                <a-select placeholder="请选择">
                  <a-option value="custom">自定义</a-option>
                  <a-option value="mode1">模式1</a-option>
                  <a-option value="mode2">模式2</a-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item
                label="采集声道数"
                field="audio.acquisition.channels"
              >
                <a-select placeholder="请选择">
                  <a-option value="1">1</a-option>
                  <a-option value="2">2</a-option>
                  <a-option value="3">3</a-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <a-form-item label="编码声道数" field="audio.encoding.channels">
                <a-input placeholder="输入范围[150, 1800]">
                  <template #append>bps</template>
                </a-input>
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="80">
            <a-col :span="8">
              <a-form-item label="编码码率" field="audio.encoding.rate">
                <a-input placeholder="输入范围[150, 1800]">
                  <template #append>bps</template>
                </a-input>
              </a-form-item>
            </a-col>

            <a-col :span="8">
              <a-form-item label="编码profile" field="audio.encoding.profile">
                <a-input placeholder="输入范围[1, 30]">
                  <template #append>fps</template>
                </a-input>
              </a-form-item>
            </a-col>
          </a-row>
        </a-card>
        <a-card class="general-card" :bordered="false">
          <template #title>填写说明</template>
          <a-form-item label="参数说明" field="audio.approvers">
            <a-textarea placeholder="请填写参数说明，最多不超过200字。" />
          </a-form-item>
        </a-card>
      </a-space>
      <div class="actions">
        <a-space>
          <a-button>重置</a-button>
          <a-button type="primary" :loading="loading" @click="onSubmitClick">
            提交
          </a-button>
        </a-space>
      </div>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { FormInstance } from '@arco-design/web-vue/es/form';
import useLoading from '@/hooks/useLoading';

const formData = ref({});
const formRef = ref<FormInstance>();
const { loading, setLoading } = useLoading();
const onSubmitClick = async () => {
  const res = await formRef.value?.validate();
  if (!res) {
    setLoading(true);
  }
  setTimeout(() => {
    setLoading(false);
  }, 1000);
};
</script>

<script lang="ts">
export default {
  name: 'Group'
};
</script>

<style scoped lang="less">
.container {
  padding: 0 20px 40px;
  overflow: hidden;
}

.actions {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  height: 60px;
  padding: 14px 20px 14px 0;
  text-align: right;
  background: var(--color-bg-2);
}
</style>
