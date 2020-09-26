import vant from 'vant';
import Vue from 'vue';
import { Lazyload, ImagePreview } from 'vant';
// 注册时可以配置额外的选项
Vue.use(Lazyload, {
  loading: '/images/loading.gif',
  lazyComponent: true,
});
Vue.use(vant)
Vue.prototype.$ImagePreview = ImagePreview;

declare module 'vue/types/vue' {
  interface Vue {
    readonly $ImagePreview: ImagePreview;
  }
}
