import Vue from 'vue';
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale';
import ru from 'element-ui/lib/locale/lang/ru-RU';

import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import utc from 'dayjs/plugin/utc';

import App from './App';
import router from './router';
import store from './store';

import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/scss/main.scss';

dayjs.locale('ru');
dayjs.extend(localizedFormat);
dayjs.extend(utc);
dayjs.extend(customParseFormat);
Vue.prototype.$dayjs = dayjs;

locale.use(ru);
Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
