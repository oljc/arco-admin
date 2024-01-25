import { useRouter } from 'vue-router';
import { Message } from '@arco-design/web-vue';

import { useUserStore } from '@/store';
import { LOGIN_ROUTE_NAME } from '@/router/constants';

export default function useUser() {
  const router = useRouter();
  const userStore = useUserStore();
  const logout = async (logoutTo?: string) => {
    await userStore.logout();
    const currentRoute = router.currentRoute.value;
    Message.success('登出成功');
    router.push({
      name:
        logoutTo && typeof logoutTo === 'string' ? logoutTo : LOGIN_ROUTE_NAME,
      query: {
        ...router.currentRoute.value.query,
        redirect: currentRoute.name as string
      }
    });
  };

  return {
    logout
  };
}
