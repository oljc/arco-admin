<template>
  <a-form
    ref="loginForm"
    :model="userInfo"
    class="login-form-wrapper"
    layout="vertical"
    @submit="handleSubmit"
  >
    <div class="login-form-title">欢迎登录</div>
    <a-tabs default-active-key="1" size="mini" animation>
      <a-tab-pane key="1" title="账号密码" destroy-on-hide>
        <a-form-item
          field="username"
          :rules="[{ required: true, message: '账号/邮箱/手机号不能为空' }]"
          :validate-trigger="['blur']"
          hide-label
        >
          <a-input v-model="userInfo.username" placeholder="账号/邮箱/手机号">
            <template #prefix>
              <icon-user />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item
          field="password"
          :rules="[{ required: true, message: '未填写密码' }]"
          :validate-trigger="['blur']"
          hide-label
        >
          <a-input-password
            v-model="userInfo.password"
            placeholder="请输入密码"
            allow-clear
          >
            <template #prefix>
              <icon-lock />
            </template>
          </a-input-password>
        </a-form-item>
        <a-checkbox
          checked="rememberPassword"
          :model-value="loginConfig.rememberPassword"
          @change="setRememberPassword as any"
        >
          记住密码
        </a-checkbox>
      </a-tab-pane>
      <a-tab-pane key="2" title="验证码">
        <a-form-item
          field="username"
          :validate-trigger="['change', 'blur']"
          hide-label
        >
          <a-input
            :style="{ width: '320px' }"
            placeholder="请输入手机号"
            allow-clear
          >
            <template #prepend> +86 </template>
          </a-input>
        </a-form-item>
        <a-form-item
          field="username"
          :validate-trigger="['change', 'blur']"
          hide-label
        >
          <a-input
            :style="{ width: '320px' }"
            placeholder="请输入你的手机号"
            allow-clear
          >
          </a-input>
        </a-form-item>
      </a-tab-pane>
    </a-tabs>
    <a-button
      type="primary"
      html-type="submit"
      style="margin: 32px 0 6px"
      long
      :loading="loading"
    >
      登录
    </a-button>
    <a-button type="text" long class="login-form-register-btn"> 注册 </a-button>
    <a-divider orientation="center">更多方式</a-divider>
    <a-space class="login-form-more" :size="2" fill>
      <icon-alipay-circle style="color: #4b81ff" />
      <icon-wechat style="color: #38ad19" />
      <icon-lark-color />
      <icon-tiktok-color />
      <icon-github />
      <template #split>
        <a-divider direction="vertical" />
      </template>
    </a-space>
    <div class="login-form-actions">
      <a-checkbox
        checked="rememberPassword"
        :model-value="loginConfig.rememberPassword"
        @change="setRememberPassword"
      >
        我已阅读并同意
      </a-checkbox>
      <a-link>服务协议</a-link>
      <label>和</label>
      <a-link>隐私政策</a-link>
    </div>
  </a-form>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { useRouter } from 'vue-router';
  import { Message } from '@arco-design/web-vue';
  import { ValidatedError } from '@arco-design/web-vue/es/form/interface';
  import { useI18n } from 'vue-i18n';
  import { useStorage } from '@vueuse/core';
  import { useUserStore } from '@/store';
  import useLoading from '@/hooks/loading';
  import type { LoginData } from '@/api/user';

  const router = useRouter();
  const { t } = useI18n();
  const errorMessage = ref('');
  const { loading, setLoading } = useLoading();
  const userStore = useUserStore();

  const loginConfig = useStorage('login-config', {
    rememberPassword: true,
    username: '', // 演示默认值
    password: '', // 演示密码
  });
  const userInfo = reactive({
    username: loginConfig.value.username,
    password: loginConfig.value.password,
  });

  const handleSubmit = async ({
    errors,
    values,
  }: {
    errors: Record<string, ValidatedError> | undefined;
    values: Record<string, any>;
  }) => {
    if (loading.value) return;
    if (!errors) {
      setLoading(true);
      try {
        await userStore.login(values as LoginData);
        const { redirect, ...othersQuery } = router.currentRoute.value.query;
        router.push({
          name: (redirect as string) || 'Workplace',
          query: {
            ...othersQuery,
          },
        });
        Message.success(t('login.form.login.success'));
        const { rememberPassword } = loginConfig.value;
        const { username, password } = values;
        // 实际生产环境需要进行加密存储。
        // The actual production environment requires encrypted storage.
        loginConfig.value.username = rememberPassword ? username : '';
        loginConfig.value.password = rememberPassword ? password : '';
      } catch (err) {
        errorMessage.value = (err as Error).message;
      } finally {
        setLoading(false);
      }
    }
  };
  const setRememberPassword = (value: boolean) => {
    loginConfig.value.rememberPassword = value;
  };
</script>

<style lang="less" scoped>
  .login-form {
    &-wrapper {
      width: 330px;
      padding: 24px 24px 12px;
      overflow: hidden;
      border: 1px solid var(--color-border-2);
      border-radius: var(--border-radius-large);
    }

    &-title {
      margin-bottom: 16px;
      font-size: 24px;
      font-weight: 500;
      line-height: 32px;
      color: var(--color-text-1);
    }

    &-actions {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin-top: 24px;
      margin-bottom: 6px;
    }

    &-register-btn {
      color: var(--color-text-3) !important;
    }

    &-more {
      justify-content: center;

      .arco-icon {
        font-size: 20px;
        cursor: pointer;
        transition: transform 0.2s ease;

        &:hover {
          transform: scale(1.3);
        }
      }
    }
  }

  :deep(.arco-tabs-content) {
    height: 155px;
  }
</style>
