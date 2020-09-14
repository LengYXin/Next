/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:13:00
 * @modify date 2020-08-05 14:13:00
 * @desc [description]
 */
// import * as EnumApi from '@xt/client/api';
import { AjaxBasics, EnumLocaleDescriptions, EnumLocaleLinks, EnumApiCurrency, Regulars } from '@xt/client';
import lodash from 'lodash';
import { toJS } from 'mobx';
import Vue from 'vue';
import { ajax } from "./ajaxBasics";
import store from './create';
import images from './images';
// 扩展
Vue.prototype.$ajax = ajax;
Vue.prototype.$EnumApiCurrency = EnumApiCurrency;
Vue.prototype.$EnumLocaleLinks = EnumLocaleLinks;
Vue.prototype.$EnumLocaleDescriptions = EnumLocaleDescriptions;
Vue.prototype.$images = images;
Vue.prototype.$regulars = Regulars;
/**
 * 检查用户 状态 已登录返回用户信息
 * @visible 吊起 登录框
 */
Vue.prototype.$InspectUser = function (visible = true) {
    if (store.$storeUser.loggedIn) {
        return toJS(store.$storeUser.UserInfo);
    }
    store.$storeUser.onToggleVisible(visible);
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
/** 
 * 设置 面包屑
*/
Vue.prototype.$setBreadcrumb = store.$menu.setBreadcrumb;

declare module 'vue/types/vue' {
    interface Vue {
        /** 
         * 检查用户是否登录
         * 没有登录会抛异常。try 包裹使用
         * @visible 吊起 登录框
         */
        readonly $InspectUser: (visible?: Boolean) => any;
        /** 检查code 是否 是当前用户 */
        readonly $eqUser: (code: any) => Boolean;
        /** 设置面包屑 */
        readonly $setBreadcrumb: typeof store.$menu.setBreadcrumb;
        /** Ajax */
        readonly $ajax: AjaxBasics;
        /** APi 枚举 */
        readonly $EnumApiCurrency: typeof EnumApiCurrency;
        /** 链接枚举 */
        readonly $EnumLocaleLinks: typeof EnumLocaleLinks;
        /** 说明枚举 */
        readonly $EnumLocaleDescriptions: typeof EnumLocaleDescriptions;
        /** 图片资源 */
        readonly $images: typeof images;
        /** 正则表达式 */
        readonly $regulars: typeof Regulars;
    }
}