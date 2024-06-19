<template>
  <a-form
    ref="formRef"
    class="login-form-wrapper"
    layout="vertical"
    :model="form"
    :rules="rules"
  >
    <div class="login-form-title">欢迎登录</div>
    <a-tabs v-model:active-key="tabActiveKey" size="mini" animation>
      <a-tab-pane key="1" title="账号登录" destroy-on-hide>
        <a-form-item field="username" validate-trigger="blur" hide-label>
          <a-input
            v-model="form.username"
            autocomplete="username"
            placeholder="账号/邮箱"
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
          @change="setRememberPassword"
        >
          记住密码
        </a-checkbox>
      </a-tab-pane>
      <a-tab-pane key="2" title="手机号登录" destroy-on-hide>
        <a-form-item field="phone" validate-trigger="blur" hide-label>
          <a-input-group :style="{ width: '320px' }">
            <country-code-select />
            <a-input
              v-model="form.phone"
              placeholder="请输入手机号"
              :max-length="11"
              allow-clear
            />
          </a-input-group>
        </a-form-item>
        <a-form-item field="captcha" hide-label>
          <a-input-group :style="{ width: '320px' }">
            <a-input
              v-model="form.captcha"
              placeholder="请输入验证码"
              allow-clear
            />
            <a-button
              style="width: 100px"
              :disabled="codeDisabled"
              @click="handleSendCode"
            >
              {{ codeText }}
            </a-button>
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
      登录
    </a-button>
    <a-button type="text" long class="login-form-register-btn">注册</a-button>
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
      <a-checkbox v-model="form.agreement">我已阅读并同意</a-checkbox>
      <a-link>服务协议</a-link>
      <span>和</span>
      <a-link>隐私政策</a-link>
    </div>
  </a-form>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useStorage } from '@vueuse/core';
import { useUserStore } from '@/store';
import useCountDown from '@/hooks/useCountDown';
import useLoading from '@/hooks/useLoading';
import type { LoginData } from '@/api/user';
import { getCaptcha } from '@/api/user';
import { pick } from 'lodash';
import { Message, Notification } from '@arco-design/web-vue';

const router = useRouter();
const codeDisabled = ref(false);
const userStore = useUserStore();
const codeText = ref('获取验证码');
const formRef = ref();
const tabActiveKey = ref('1');
const { loading, setLoading } = useLoading();

const loginConfig = useStorage('login-config', {
  rememberPassword: true,
  username: 'admin', // 演示默认值
  password: 'admin123' // 演示密码
});
const form = reactive({
  username: loginConfig.value.username,
  password: loginConfig.value.password,
  phone: '',
  captcha: '',
  agreement: false
});

const rules = {
  username: [{ required: true, message: '请输入正确账号' }],
  captcha: [{ required: true, message: '请输入正确验证码' }],
  password: [
    { required: true, message: '请输入密码' },
    {
      // 密码格式：6-32位，包含大小写字母、数字、特殊字符(除空格)两种以上
      match:
        /^(?![\d]+$)(?![a-z]+$)(?![A-Z]+$)(?![~!@#$%^&*.]+$)[\da-zA-z~!@#$%^&*.]{6,32}$/,
      message: '密码格式不正确'
    }
  ],
  phone: [
    { required: true, message: '请输入手机号' },
    { length: 11, message: '手机号格式不正确' }
  ]
};

const handleSubmit = () => {
  if (loading.value) return;

  if (tabActiveKey.value === '1') {
    formRef.value.validateField(['username', 'password']).then(async res => {
      if (res) return;
      if (!form.agreement) {
        return Message.info('请阅读并同意服务协议和隐私政策');
      }
      setLoading(true);
      try {
        const userInfoForm = pick(form, ['username', 'password']);
        console.log(userInfoForm);

        await userStore.login(userInfoForm as LoginData);
        const { redirect, ...othersQuery } = router.currentRoute.value.query;
        router.push({
          name: (redirect as string) || 'Workplace',
          query: {
            ...othersQuery
          }
        });
        Message.success('登录成功');
        const { rememberPassword } = loginConfig.value;
        const { username, password } = userInfoForm;
        // 实际生产环境需要进行加密存储。
        loginConfig.value.username = rememberPassword ? username : '';
        loginConfig.value.password = rememberPassword ? password : '';
      } finally {
        setLoading(false);
      }
    });
  }

  if (tabActiveKey.value === '2') {
    formRef.value.validateField(['phone', 'captcha']).then(res => {
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
  initValue: 59,
  onEnd: () => {
    codeText.value = '获取验证码';
    codeDisabled.value = false;
  },
  onChange: seconds => (codeText.value = `重新获取 ${seconds} s`)
});

// 发送验证码
const handleSendCode = async () => {
  const res = await formRef.value.validateField(['phone']);
  if (res || codeDisabled.value) return;
  codeDisabled.value = true;
  getCaptcha({ tel: form.phone }).then(res => {
    if (res.code === 20000) {
      Notification.success({
        id: 'captcha',
        content: `Mock 验证码:${res.data.captcha}`,
        closable: true,
        duration: 0
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
    background-color: var(--color-bg-1);
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
