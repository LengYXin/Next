/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:13:00
 * @modify date 2020-08-05 14:13:00
 * @desc [description]
 */

import { ControllerAbout, ControllerCourse, ControllerHome, ControllerStationery, ControllerVideo } from "@xt/client/entities";
import { create, persist } from 'mobx-persist';
import { ajax } from "./clientConfig";
import $locale from './locale';
const store = {
    $locale,
    $storeHome: new ControllerHome(ajax),
    $storeCourse: new ControllerCourse(ajax),
    $storeStationery: new ControllerStationery(ajax),
    $storeVideo: new ControllerVideo(ajax),
    $storeAbout: new ControllerAbout(ajax),
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
        readonly $locale: typeof $locale
        /**
         * 首页状态控制器
         */
        readonly $storeHome: ControllerHome
        /**
         * 课程控制器
         */
        readonly $storeCourse: ControllerCourse
        /**
         * 文房
         * @type {ControllerStationery}
         * @memberof Store
         */
        readonly $storeStationery: ControllerStationery
        /**
         * 视频
         * @type {ControllerStationery}
         * @memberof Store
         */
        readonly $storeVideo: ControllerVideo
        /**
         * 关于
         * @type {ControllerAbout}
         * @memberof Store
         */
        readonly $storeAbout: ControllerAbout
    }
}
// 状态 导出
export default store