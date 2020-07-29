import Vue from 'vue';
// 自动高度
import "./directives/autoHeight";
import "./directives/viewer";
import pagination from "./pagination/index.vue";
import infiniteloading from "./infiniteloading/index.vue";
// 视频
Vue.component('xt-dplayer', () => import('./dplayer/index.vue'));
Vue.component('xt-editor', () => import('./editor/index.vue'));
Vue.component('xt-pagination', pagination);
Vue.component('xt-infinite-loading', infiniteloading);
