import Vue from 'vue';
import inspect from './business/user/inspect.vue';
import comment from "./comment/index.vue";
import "./directives/dateFormat";
import "./directives/ellipsis";
import "./directives/money";
import face from "./face/index.vue";
import nine from "./nine/index.vue";
import refresh from "./refresh/index.vue";
import tabs from "./tabs/index.vue";
import wechatBowser from './wechatBowser/index.vue';

// 视频
Vue.component("xt-dplayer", () => import("./dplayer/index.vue"));
// 富文本
Vue.component("xt-editor", () => import("./editor/index.vue"));
// 检查用户登录
Vue.component('xt-inspect', inspect);
// 滚动加载
Vue.component('xt-refresh-list', refresh);
// 检查是否是微信浏览器 默认 slot 非微信
Vue.component('xt-wechat-bowser', wechatBowser);
// 表情
Vue.component("xt-face", face);
// 评论
Vue.component("xt-comment", comment);
// 标签页
Vue.component("xt-tabs", tabs);
// 九宫格
Vue.component("xt-nine", nine);