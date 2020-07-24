
import { ControllerCourse, ControllerHome } from "@xt/client/entities";
import { create, persist } from 'mobx-persist';
import { ajax } from "./clientConfig";
import $locale from './locale';
// 状态 导出
export default () => store;
const store = {
    $locale,
    $storeHome: new ControllerHome(ajax),
    $storeCourse: new ControllerCourse(ajax),
}
console.log("LENG: store", store)
// 配置缓存
onCreatePersist();

// 配置缓存
function onCreatePersist() {
    // https://github.com/pinqy520/mobx-persist
    const hydrate = create({
        // storage: window.localStorage,   // or AsyncStorage in react-native.
        // default: localStorage
        // jsonify: true  // if you use AsyncStorage, here shoud be true
        // default: true
    });
    persist({ locale: true })(store.$locale);
    persist({ Banners: { type: 'list' } })(store.$storeHome);
    hydrate('xt_locale', store.$locale);
    hydrate('xt_home', store.$storeHome);
}
// 扩展 ts
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