import Mock from 'mockjs';
import setupMock, {
  successResponseWrap,
  failResponseWrap
} from '@/utils/setup-mock';
import type { MockParams } from '@/types/mock';

setupMock({
  setup() {
    // 获取验证码
    Mock.mock(new RegExp('/api/login/captcha'), (params: MockParams) => {
      const { tel } = JSON.parse(params.body);
      if (!tel) {
        return failResponseWrap(null, '手机号不能为空', 50000);
      }

      // 如果手机号不是1开头的11位数字，返回错误
      if (!/^1\d{10}$/.test(tel)) {
        return failResponseWrap(null, '无效手机号', 50000);
      }

      return successResponseWrap({
        captcha: '996996'
      });
    });
  }
});
