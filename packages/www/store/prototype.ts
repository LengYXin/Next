/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:13:00
 * @modify date 2020-08-05 14:13:00
 * @desc [description]
 */
import * as EnumApi from '@xt/client/api';
import { AjaxBasics } from '@xt/client/helpers/ajaxBasics';
import { EnumLocaleDescriptions, EnumLocaleLinks } from '@xt/client/languages';
import { toJS } from 'mobx';
import Vue from 'vue';
import { ajax } from "./clientConfig";
import store from './create';
import images from './images';
// 扩展
Vue.prototype.$ajax = ajax;
Vue.prototype.$EnumApi = EnumApi;
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

declare module 'vue/types/vue' {
    interface Vue {
        /**
         * 检查用户是否登录
         */
        readonly $InspectUser: () => Object;
        /** Ajax */
        readonly $ajax: AjaxBasics;
        /** APi 枚举 */
        readonly $EnumApi: typeof EnumApi;
        /** 链接枚举 */
        readonly $EnumLocaleLinks: typeof EnumLocaleLinks;
        /** 说明枚举 */
        readonly $EnumLocaleDescriptions: typeof EnumLocaleDescriptions;
        /** 图片资源 */
        readonly $images: typeof images;
    }
}