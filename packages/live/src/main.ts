import Vue from 'vue'
import App from './App.vue'
import './components'
import './assets/style/index.less'
import store from './store'
import moment from 'moment';
Vue.config.productionTip = false;
moment.locale('zh-cn');
(async () => {
  await store.$storeUser.onLogin('18611752863', 'leng147896325')
  await store.$storeUser.onGetUserInfo()
  new Vue({
    render: h => h(App),
  }).$mount('#app')
})()
