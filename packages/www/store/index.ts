
import $locale from './locale';
import Vue from 'vue';
import { ControllerHome, ControllerCourse } from "@xt/client/entities";
// Vue.prototype.$ajax
export default () => {
    return {
        $locale,
        $storeHome: new ControllerHome(Vue.prototype.$ajax),
        $storeCourse: new ControllerCourse(Vue.prototype.$ajax),
    }
}
declare module 'vuex/types/index' {
    interface Store<S> {
        /**
         * 本地语音全局状态
         */
        $locale: typeof $locale
        /**
         * 首页状态控制器
         */
        $storeHome: ControllerHome
        /**
         * 课程控制器
         */
        $storeCourse: ControllerCourse
    }
}