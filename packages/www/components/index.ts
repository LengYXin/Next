import Vue from "vue";
// 自动高度
import "./directives/autoHeight";
// 图片预览
import "./directives/viewer";
// 格式化钱
import "./directives/money";
// 时间处理
import "./directives/dateFormat";
// 手机号处理
import "./directives/phoneFormat";
// 多行折叠
import "./directives/ellipsis";
// 时间处理
// import "./filter/dateTime";
import pagination from "./pagination/index.vue";
import infiniteloading from "./infiniteloading/index.vue";
import tabs from "./tabs/index.vue";
import hover from "./hover/index.vue";
import face from "./face/index.vue";
import comment from "./comment/index.vue";
import action from "./comment/action.vue";
import shadow from "./shadow/index.vue";
import qrcode from "./qrcode/index.vue";
import imgCode from "./imgCode/index.vue";
import inspect from "./business/user/inspect.vue";
import nine from "./nine/index.vue";

// 视频
Vue.component("xt-dplayer", () => import("./dplayer/index.vue"));
// 富文本
Vue.component("xt-editor", () => import("./editor/index.vue"));
// 图片裁剪
Vue.component("xt-img-cropper", () => import("./imgCropper/index.vue"));

// 检查用户登录
Vue.component("xt-inspect", inspect);
// 图片验证
Vue.component("xt-img-code", imgCode);
// 二维码
Vue.component("xt-qrcode", qrcode);
// Vue.component('xt-cat', () => import('./cat/index.vue'));
// 分页
Vue.component("xt-pagination", pagination);
// 滚动
Vue.component("xt-infinite-loading", infiniteloading);
// 标签页
Vue.component("xt-tabs", tabs);
// 悬浮
Vue.component("xt-hover", hover);
// 表情
Vue.component("xt-face", face);
// 评论
Vue.component("xt-comment", comment);
// 评论操作
Vue.component("xt-action", action);
// 阴影
Vue.component("xt-shadow", shadow);
// 九宫格
Vue.component("xt-nine", nine);
