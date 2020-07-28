import Vue from 'vue';
// 自动高度
import "./directives/autoHeight";
import pagination from "./pagination/index.vue";
// 视频
Vue.component('xt-dplayer', () => import('./dplayer/index.vue'));
Vue.component('xt-pagination', pagination);