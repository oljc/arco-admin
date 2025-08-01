import { post, get } from '@/utils/request';
import type { UserState } from '@/store/modules/user/types';

export interface LoginData {
  username: string;
  password: string;
}

export interface LoginRes {
  token: string;
}
export function login(data: LoginData) {
  return post<LoginRes>('/api/user/login', data);
}

export function logout() {
  return post<LoginRes>('/api/user/logout');
}

export function getUserInfo() {
  return post<UserState>('/api/user/info');
}

export function getCaptcha(data: { tel: string }) {
  return post<{ captcha?: string }>('/api/login/captcha', data);
}

/** 图片验证码 */
export function getCaptchaImage(data: { type: string }) {
  return get<{
    id: string;
    captcha: string;
    type: string;
    ttl: number;
  }>('/api/auth/captcha', data, { token: false });
}
