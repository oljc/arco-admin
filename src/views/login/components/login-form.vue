<template>
  <a-form
    ref="formRef"
    class="login-form-wrapper"
    layout="vertical"
    :model="form"
    :rules="rules"
  >
    <div class="login-form-title">{{ $t('login-title') }}</div>
    <a-tabs v-model:active-key="tabActiveKey" size="mini" animation>
      <a-tab-pane key="1" :title="$t('login-tab-account')" destroy-on-hide>
        <a-form-item field="username" validate-trigger="blur" hide-label>
          <a-input
            v-model="form.username"
            autocomplete="username"
            :placeholder="$t('login.form.username.placeholder')"
          >
            <template #prefix>
              <icon-user />
            </template>
          </a-input>
        </a-form-item>
        <a-form-item field="password" validate-trigger="blur" hide-label>
          <a-input-password
            v-model="form.password"
            autocomplete="current-password"
            :placeholder="$t('login.form.password.placeholder')"
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
          @change="setRememberPassword"
        >
          {{ $t('login.form.remember') }}
        </a-checkbox>
      </a-tab-pane>
      <a-tab-pane key="2" :title="$t('login-tab-tel')" destroy-on-hide>
        <a-form-item field="phone" validate-trigger="blur" hide-label>
          <a-input-group :style="{ width: '320px' }">
            <country-code-select />
            <a-input
              v-model="form.phone"
              :placeholder="$t('login.form.phone.placeholder')"
              :max-length="11"
              allow-clear
            />
          </a-input-group>
        </a-form-item>
        <a-form-item field="captcha" validate-trigger="blur" hide-label>
          <a-input-group :style="{ width: '320px' }">
            <a-input
              v-model="form.captcha"
              :placeholder="$t('login.form.captcha.placeholder')"
              allow-clear
            >
            </a-input>
            <a-button
              style="width: 100px"
              :disabled="codeDisabled"
              @click="handleSendCode"
              >{{ codeText }}</a-button
            >
          </a-input-group>
        </a-form-item>
      </a-tab-pane>
    </a-tabs>
    <a-button
      type="primary"
      style="margin: 32px 0 6px"
      long
      :loading="loading"
      @click="handleSubmit"
    >
      {{ $t('common.login') }}
    </a-button>
    <a-button type="text" long class="login-form-register-btn">
      {{ $t('signin') }}
    </a-button>
    <a-divider orientation="center">{{ $t('login.more') }}</a-divider>
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
      <a-checkbox v-model="form.agreement">
        {{ $t('login-agreement') }}
      </a-checkbox>
      <a-link>{{ $t('login-service-agreement') }}</a-link>
      <span>{{ $t('login-agreement-and') }}</span>
      <a-link>{{ $t('login-privacy-policy') }}</a-link>
    </div>
  </a-form>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { useRouter } from 'vue-router';
  import { useI18n } from 'vue-i18n';
  import { useStorage } from '@vueuse/core';
  import { useUserStore } from '@/store';
  import useCountDown from '@/hooks/use-count-down';
  import useLoading from '@/hooks/loading';
  import type { LoginData } from '@/api/user';
  import { getCaptcha } from '@/api/user';
  import { pick } from 'lodash';
  import { Message, Notification } from '@arco-design/web-vue';

  const router = useRouter();
  const { t } = useI18n();
  const codeDisabled = ref(false);
  const userStore = useUserStore();
  const codeText = ref(t('login.form.captcha.send'));
  const formRef = ref();
  const tabActiveKey = ref('1');
  const { loading, setLoading } = useLoading();

  const loginConfig = useStorage('login-config', {
    rememberPassword: true,
    username: '', // 演示默认值
    password: '', // 演示密码
  });
  const form = reactive({
    username: loginConfig.value.username,
    password: loginConfig.value.password,
    phone: '',
    captcha: '',
    agreement: false,
  });

  const rules = {
    username: [{ required: true, message: t('login.form.username.msg') }],
    captcha: [{ required: true, message: t('login.form.captcha.msg') }],
    password: [
      { required: true, message: '请输入密码' },
      {
        // 密码格式：6-32位，包含大小写字母、数字、特殊字符(除空格)两种以上
        match:
          /^(?![\d]+$)(?![a-z]+$)(?![A-Z]+$)(?![~!@#$%^&*.]+$)[\da-zA-z~!@#$%^&*.]{6,32}$/,
        message: '密码格式不正确',
      },
    ],
    phone: [
      { required: true, message: '请输入手机号' },
      { length: 11, message: '手机号格式不正确' },
    ],
  };

  const handleSubmit = () => {
    if (loading.value) return;

    if (tabActiveKey.value === '1') {
      formRef.value
        .validateField(['username', 'password'])
        .then(async (res) => {
          if (res) return;
          if (!form.agreement) {
            return Message.info(t('login.form.agreement.tips'));
          }
          setLoading(true);
          try {
            const userInfoform = pick(form, ['username', 'password']);
            console.log(userInfoform);

            await userStore.login(userInfoform as LoginData);
            const { redirect, ...othersQuery } =
              router.currentRoute.value.query;
            router.push({
              name: (redirect as string) || 'Workplace',
              query: {
                ...othersQuery,
              },
            });
            Message.success(t('login.form.login.success'));
            const { rememberPassword } = loginConfig.value;
            const { username, password } = userInfoform;
            // 实际生产环境需要进行加密存储。
            loginConfig.value.username = rememberPassword ? username : '';
            loginConfig.value.password = rememberPassword ? password : '';
          } finally {
            setLoading(false);
          }
        });
    }

    if (tabActiveKey.value === '2') {
      formRef.value.validateField(['phone', 'captcha']).then((res) => {
        if (res) return;
        if (!form.agreement)
          return Message.info('请阅读并同意服务协议和隐私政策');
        //   setLoading(true);
      });
    }
  };

  const setRememberPassword = (value: boolean) => {
    loginConfig.value.rememberPassword = value;
  };

  const { start } = useCountDown({
    initValue: 9,
    onEnd: () => {
      codeText.value = t('login.form.captcha.send');
      codeDisabled.value = false;
    },
    onChange: (seconds) =>
      (codeText.value = t('login.form.captcha.resend', { seconds })),
  });

  // 发送验证码
  const handleSendCode = async () => {
    const res = await formRef.value.validateField(['phone']);
    if (res || codeDisabled.value) return;
    codeDisabled.value = true;
    getCaptcha({ tel: form.phone }).then((res: any) => {
      if (res.code === 20000) {
        Notification.success({
          id: 'captcha',
          content: `Mock 验证码:${res.data.captcha}`,
          closable: true,
          duration: 0,
        });
      }
    });
    start();
  };
</script>

<style lang="less" scoped>
  .login-form {
    &-wrapper {
      width: 330px;
      padding: 24px 24px 12px;
      overflow: hidden;
      background-color: #fff;
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
