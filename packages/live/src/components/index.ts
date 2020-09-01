import 'ant-design-vue/dist/antd.less';
import 'quill/dist/quill.snow.css';
import Vue from 'vue';
import infiniteloading from "./infiniteloading/index.vue";
import face from "./face/index.vue";
import comment from "./comment/index.vue";
import action from "./comment/action.vue";
import "./ant";
// 视频
Vue.component('lyx-dplayer', () => import('./dplayer/index.vue'));
// 富文本
Vue.component('lyx-editor', () => import('./editor/index.vue'));

// 滚动
Vue.component('lyx-infinite-loading', infiniteloading);
// 表情
Vue.component('lyx-face', face);
// 评论
Vue.component('lyx-comment', comment);
// 评论操作
Vue.component('lyx-action', action);

