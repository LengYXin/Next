import Vue from 'vue';
// 格式化钱
import "./directives/money";
import refresh from "./refresh/index.vue";
import inspect from './business/user/inspect.vue'


// 检查用户登录
Vue.component('xt-inspect', inspect);
// 滚动加载
Vue.component('xt-refresh-list', refresh);
