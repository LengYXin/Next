import './public-path';
import Vue from 'vue'
import App from './App.vue'
import { routes } from './router'
import VueRouter from 'vue-router';
import 'ant-design-vue/dist/antd.css';
import Antd from 'ant-design-vue';
import { Component, Prop, Provide, Inject } from "vue-property-decorator";

declare global {
  interface Window {
    __POWERED_BY_QIANKUN__?: boolean;
    __INJECTED_PUBLIC_PATH_BY_QIANKUN__?: string;
  }
}
Antd.install(Vue);
Vue.config.productionTip = false
let router: any = null;
let instance: any = null;
// new Vue({
//   router,
//   render: h => h(App)
// }).$mount('#app')
function render(props: any = {}) {
  const { container, RootStore } = props;
  router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? '/vue' : '/',
    mode: 'history',
    routes,
  });
  Vue.prototype.getRootStore = () => {
    return RootStore
  }
  @Component({
    router,
    render: h => h(App)
  })
  class StartApp extends Vue {
    // @Provide("RootStore")
    // RootStore = props.RootStore;
  }
  instance = new StartApp().$mount(container ? container.querySelector('#app') : '#app');
}

if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

function storeTest(props: any) {
  props.onGlobalStateChange &&
    props.onGlobalStateChange(
      (value, prev) => console.log(`[onGlobalStateChange - ${props.name}]:`, value, prev),
      true,
    );
  props.setGlobalState &&
    props.setGlobalState({
      ignore: props.name,
      user: {
        name: props.name,
      },
    });
}

export async function bootstrap() {
  console.log('[vue] vue app bootstraped');
}

export async function mount(props) {
  console.log('[vue] props from main framework', props);
  // storeTest(props);
  render(props);
}

export async function unmount() {
  console.log('[vue] props from main unmount');
  instance.$destroy();
  instance.$el.innerHTML = '';
  instance = null;
  router = null;
}

declare module 'vue/types/vue' {
  interface Vue {
    getRootStore: () => any;
  }
}