import { createApp } from 'vue';
import router from './router';
import store from './store';
import directive from './directive';
import './mock';
import App from './App.vue';
import '@/assets/style/global.less';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import '@arco-design/web-vue/es/message/style/index.less';
import '@arco-design/web-vue/es/notification/style/index.less';
import '@arco-design/web-vue/es/modal/style/index.less';
import { initFingerprint } from './utils/fingerprint';

import { initVChartArcoTheme } from '@visactor/vchart-arco-theme';
initVChartArcoTheme();
initFingerprint();

const app = createApp(App);

app.use(router);
app.use(store);
app.use(ArcoVueIcon);
app.use(directive);

app.mount('#app');
