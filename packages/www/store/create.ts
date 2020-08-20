/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:13:00
 * @modify date 2020-08-05 14:13:00
 * @desc [description]
 */

import { ControllerAbout, ControllerCourse, ControllerHome, ControllerStationery, ControllerUser, ControllerVideo, ControllerOrder } from "@xt/client";
import { create, persist } from 'mobx-persist';
import { ajax, onResetAjaxBasics } from "./clientConfig";
import $global from './global';
import $locale from './locale';
import $menu from './menu';
const store = {
    // 语言
    $locale,
    // 菜单
    $menu,
    // 全局
    $global,
    // 首页
    $storeHome: new ControllerHome(ajax),
    // 课程
    $storeCourse: new ControllerCourse(ajax),
    // 文房
    $storeStationery: new ControllerStationery(ajax),
    // 视频
    $storeVideo: new ControllerVideo(ajax),
    // 关于
    $storeAbout: new ControllerAbout(ajax),
    // 订单
    $storeOrder: new ControllerOrder(ajax),
    // 用户
    $storeUser: new ControllerUser(ajax),
}
// 重置 AjaxBasics 配置
onResetAjaxBasics(store.$storeUser);
// 配置缓存数据
onCreatePersist();
console.log("LENG: store", store)
/**
 * 配置缓存数据
 */
async function onCreatePersist() {
    // https://github.com/pinqy520/mobx-persist
    const hydrate = create({
        // storage: window.localStorage,   // or AsyncStorage in react-native.
        // default: localStorage
        // jsonify: true  // if you use AsyncStorage, here shoud be true
        // default: true
    });
    // 配置缓存字段
    persist({ locale: true })(store.$locale);
    persist({ Banners: { type: 'list' } })(store.$storeHome);
    persist({ typelist: { type: 'list' } })(store.$storeStationery);
    persist({ typelist: { type: 'list' } })(store.$storeAbout);
    persist({ typelist: { type: 'list' } })(store.$storeOrder);
    persist({ UserInfo: { type: 'object' } })(store.$storeUser);
    // 设置类
    hydrate(`${$global.localStorageStartsWith}locale`, store.$locale);
    hydrate(`${$global.localStorageStartsWith}Home`, store.$storeHome);
    hydrate(`${$global.localStorageStartsWith}Stationery`, store.$storeStationery);
    hydrate(`${$global.localStorageStartsWith}About`, store.$storeAbout);
    hydrate(`${$global.localStorageStartsWith}Order`, store.$storeOrder);
    await hydrate(`${$global.localStorageStartsWith}User`, store.$storeUser);
    store.$storeUser.onGetUserInfo()
}
// 扩展 ts
declare module 'vuex/types/index' {
    interface Store<S> {
        /**
         * 全局公用
         */
        readonly $global: typeof $global
        /**
         * 菜单
         */
        readonly $menu: typeof $menu
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
        /**
         * 订单
         * @type {ControllerOrder}
         * @memberof Store
         */
        readonly $storeOrder: ControllerOrder
        /**
         * 用户
         * @type {ControllerUser}
         * @memberof Store
         */
        readonly $storeUser: ControllerUser
    }
}
// 状态 导出
export default store