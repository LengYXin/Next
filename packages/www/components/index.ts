import Vue from 'vue';
// 自动高度
import "./directives/autoHeight";
// 图片预览
import "./directives/viewer";
// 格式化钱
import "./directives/money";
import pagination from "./pagination/index.vue";
import infiniteloading from "./infiniteloading/index.vue";
import tabs from "./tabs/index.vue";
import hover from "./hover/index.vue";
// 视频
Vue.component('xt-dplayer', () => import('./dplayer/index.vue'));
// 富文本
Vue.component('xt-editor', () => import('./editor/index.vue'));
// 分页
Vue.component('xt-pagination', pagination);
// 滚动
Vue.component('xt-infinite-loading', infiniteloading);
// 标签页
Vue.component('xt-tabs', tabs);
// 悬浮
Vue.component('xt-hover', hover);
