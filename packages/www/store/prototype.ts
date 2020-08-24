/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:13:00
 * @modify date 2020-08-05 14:13:00
 * @desc [description]
 */
// import * as EnumApi from '@xt/client/api';
import { AjaxBasics } from '@xt/client';
import { EnumLocaleDescriptions, EnumLocaleLinks } from '@xt/client';
import { toJS } from 'mobx';
import Vue from 'vue';
import { ajax } from "./clientConfig";
import store from './create';
import images from './images';
import lodash from 'lodash';
// 扩展
Vue.prototype.$ajax = ajax;
// Vue.prototype.$EnumApi = EnumApi;
Vue.prototype.$EnumLocaleLinks = EnumLocaleLinks;
Vue.prototype.$EnumLocaleDescriptions = EnumLocaleDescriptions;
Vue.prototype.$images = images;
/**
 * 检查用户 状态 已登录返回用户信息
 */
Vue.prototype.$InspectUser = function () {
    if (store.$storeUser.loggedIn) {
        return toJS(store.$storeUser.UserInfo);
    }
    store.$storeUser.onToggleVisible(true);
    throw 'Please log in'
};
/** 
 * 检查code 是否 是当前用户
*/
Vue.prototype.$eqUser = function (code) {
    if (store.$storeUser.loggedIn) {
        const UserInfo = toJS(store.$storeUser.UserInfo);
        return lodash.eq(UserInfo.studentId, code)
    }
    return false
};

declare module 'vue/types/vue' {
    interface Vue {
        /**
         * 检查用户是否登录
         */
        readonly $InspectUser: () => Object;
        /** 检查code 是否 是当前用户 */
        readonly $eqUser: (code: any) => Boolean;
        /** Ajax */
        readonly $ajax: AjaxBasics;
        /** APi 枚举 */
        // readonly $EnumApi: typeof EnumApi;
        /** 链接枚举 */
        readonly $EnumLocaleLinks: typeof EnumLocaleLinks;
        /** 说明枚举 */
        readonly $EnumLocaleDescriptions: typeof EnumLocaleDescriptions;
        /** 图片资源 */
        readonly $images: typeof images;
    }
}