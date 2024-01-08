import axios from 'axios';
import type { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { Message, Modal } from '@arco-design/web-vue';
import { useUserStore } from '@/store';
import { getToken } from '@/utils/auth';

axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  // 请求超时的毫秒数
  timeout: 10000,
  // 跨域请求时是否需要使用凭证
  withCredentials: false
});

// 添加请求拦截器
axios.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  (response: AxiosResponse) => {
    const res = response.data;
    if (res.code !== 20000) {
      Message.error({
        content: res.msg || '网络错误',
        duration: 5 * 1000
      });
      if (
        [50008, 50012, 50014].includes(res.code) &&
        response.config.url !== '/api/user/info'
      ) {
        Modal.error({
          title: '登录信息已过期',
          content: '登录信息已过期，请重新登录',
          okText: '去登录',
          async onOk() {
            const userStore = useUserStore();

            await userStore.logout();
            window.location.reload();
          }
        });
      }
      return Promise.reject(new Error(res.msg || '网络错误'));
    }
    return res;
  },
  error => {
    Message.error({
      content: error.msg || '网络错误请稍后重试',
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);
