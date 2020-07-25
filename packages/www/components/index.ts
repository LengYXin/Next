import Vue from 'vue';
// 自动高度
import "./directives/autoHeight";
// 视频
Vue.component('xt-dplayer', () => import('./dplayer/index.vue'));