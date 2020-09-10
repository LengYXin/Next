import moment from 'moment';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './store';
import './components';
Vue.config.productionTip = false;
moment.locale('zh-cn');
// (async () => {
// await store.$storeUser.onLogin('18611752863', 'leng147896325')
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
// })()
