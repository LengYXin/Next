import 'ant-design-vue/dist/antd.less';
import 'quill/dist/quill.snow.css';
import Vue from 'vue';
import VueVirtualScroller from 'vue-virtual-scroller';
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css';
import "./ant";
import action from "./comment/action.vue";
import comment from "./comment/index.vue";
// 自动高度
import "./directives/autoHeight";
// 时间处理
import "./directives/dateFormat";
// 多行折叠
import "./directives/ellipsis";
// 格式化钱
import "./directives/money";
// 图片预览
import "./directives/viewer";
import face from "./face/index.vue";
import infiniteloading from "./infiniteloading/index.vue";
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

Vue.use(VueVirtualScroller)
