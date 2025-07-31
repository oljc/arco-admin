import axios from 'axios';
import type { AxiosResponse, AxiosRequestConfig, AxiosAdapter } from 'axios';
import { Message, Modal } from '@arco-design/web-vue';
import { getToken } from '@/utils/auth';
import { murmurHash3 } from '@/utils/index';
import { useUserStore } from '@/store';
import { signer } from '@/utils/sign';

declare module 'axios' {
  export interface AxiosRequestConfig {
    token?: boolean; // 是否需要 token
    sign?: boolean; // 是否需要签名
  }
  export interface AxiosInstance {
    request<T = any>(config: AxiosRequestConfig): Promise<T>;
    get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    head<T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
    patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  }
}

/**
 * 与后端约定的接口返回格式
 */
interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
  status: string;
  timestamp: number;
  traceId: string;
}

/**
 * 缓存结果
 */
const cache = new Map<string, Promise<AxiosResponse>>();
const generateKey = (config: AxiosRequestConfig) => {
  const { method, url, params, data } = config;
  const key = `${method}:${url}?${JSON.stringify(params)}${JSON.stringify(data)}`;
  return murmurHash3(key);
};

/**
 * 自定义适配器-此处主要是处理重复请求
 */
const customAdapter: AxiosAdapter = config => {
  const cacheKey = generateKey(config);
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey)!;
  }

  const request = axios
    .getAdapter(axios.defaults.adapter)(config)
    .then(response => response)
    .finally(() => {
      setTimeout(() => cache.delete(cacheKey), 1100);
    });

  cache.set(cacheKey, request);
  return request;
};

/**
 * 处理错误
 */
const handleError = (response: any) => {
  const { data = {}, status, statusText } = response;
  const code = data.code || status;
  if (code === 401) {
    Modal.error({
      title: '登录信息已过期',
      content: '登录信息已过期，请重新登录',
      okText: '重新登录',
      maskClosable: false,
      escToClose: false,
      async onOk() {
        const { logout } = useUserStore();
        await logout();
        // TODO: 刷新触发路由守卫-如果有更好的最佳实践再改
        window.location.reload();
      }
    });
  }

  Message.error({
    id: 'apiTips',
    content: data.message || statusText || '网络错误，请稍后重试',
    duration: 3000
  });
  return Promise.reject(data);
};

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  withCredentials: false,
  adapter: customAdapter
});

http.interceptors.request.use(
  config => {
    if (config.token !== false) {
      config.headers['Access-Token'] = getToken();
    }

    if (config.sign !== false) {
      signer(config);
    }

    return config;
  },
  error => Promise.reject(error)
);

http.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    const { code, data, status } = response.data;
    if (status === 'success' && (code === 0 || code === 200)) {
      return data;
    }
    return handleError(response);
  },
  error => handleError(error.response || error.request)
);

export const get = <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
  http.get<T>(url, { params: data, ...config });

export const post = <T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
  http.post<T>(url, data, config);

export const put = <T = unknown>(url: string, data?: object, config?: AxiosRequestConfig) =>
  http.put<T>(url, data, config);

export const del = <T = unknown>(url: string, config?: AxiosRequestConfig) =>
  http.delete<T>(url, config);
