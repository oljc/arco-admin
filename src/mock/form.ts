import Mock from 'mockjs';
import setupMock, { successResponseWrap } from './setup-mock';

setupMock({
  setup() {
    Mock.mock(new RegExp('/api/channel-form/submit'), () => {
      return successResponseWrap('ok');
    });
  }
});
