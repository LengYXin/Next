/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:12:55
 * @modify date 2020-08-05 14:12:55
 * @desc [description]
 */
import * as EnumApi from '@xt/client/api';
import '@xt/client/configure';
import { AjaxBasics } from '@xt/client/helpers/ajaxBasics';
import { notification, message } from 'ant-design-vue';
import lodash from 'lodash';
import NProgress from 'nprogress';
import { TimeoutError } from "rxjs";
import { AjaxError, AjaxResponse } from "rxjs/ajax";
import Vue from 'vue';
import { ControllerUser } from '@xt/client/entities';
const production = process.env.NODE_ENV === "production";
export const ajax = new AjaxBasics({ target: process.env.target });
// 扩展
Vue.prototype.$ajax = ajax;
Vue.prototype.$EnumApi = EnumApi;
/**
 * 重置  AjaxBasics  配置
 */
export function onResetAjaxBasics($storeUser: ControllerUser) {
    AjaxBasics.onMergeBody = function () {
        return $storeUser.onSignatureUser()
    }
    // 过滤
    AjaxBasics.onFilter = function (res) {
        // 数据 Response 
        if (res instanceof AjaxResponse) {
            // 无 响应 数据
            if (lodash.isNil(res.response)) {
                throw lodash.merge(res, production ? { message: '服务器开小差了' } : { message: '响应体不存在' })
            }
            else if (!lodash.eq(lodash.get(res.response, 'code', 0), 0)) {
                throw lodash.merge(res, { message: lodash.get(res.response, 'msg') })
            }
        }
        // 错误 超时
        if (res instanceof AjaxError || res instanceof TimeoutError) {
            throw production ? { message: '服务器开小差了' } : res;
        }
        return true
    }
    AjaxBasics.onMap = function (res) {
        return res.response.result
    }
    AjaxBasics.onError = function (error) {
        // notification.error({ key: "AjaxBasics", message: '提示', description: lodash.get(error, 'response.msg', error.message) })
        message.error({ content: lodash.get(error, 'response.msg', error.message), key: 'message' })
        if (lodash.includes([600002], lodash.get(error, 'response.code'))) {
            $storeUser.onToggleVisible(true)
        }
    }
    AjaxBasics.onNProgress = function (type: 'start' | 'done' = 'start') {
        if (type == "start") {
            NProgress.start();
        } else {
            NProgress.done();
        }
    }
}

declare module 'vue/types/vue' {
    interface Vue {
        /** Ajax */
        readonly $ajax: AjaxBasics;
        /** APi 枚举 */
        readonly $EnumApi: typeof EnumApi;
        // $locales: typeof locales;
    }
}