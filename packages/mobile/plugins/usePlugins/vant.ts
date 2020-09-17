import vant from 'vant';
import Vue from 'vue';
import { Lazyload } from 'vant';
// 注册时可以配置额外的选项
Vue.use(Lazyload, {
  loading: '/images/loading.gif',
  lazyComponent: true,
});
Vue.use(vant)
