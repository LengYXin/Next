import Vue from 'vue';
import { Button, Icon, message, Spin, Modal, notification } from 'ant-design-vue';

import { Observable, of, TimeoutError, interval } from "rxjs";
import { AjaxError, AjaxResponse, AjaxRequest } from "rxjs/ajax";
import request, { AjaxBasics } from '@xt/client/helpers/ajaxBasics';
import NProgress from 'nprogress';
import lodash from 'lodash';
// 过滤
AjaxBasics.onFilter = function (res) {
    // 数据 Response 
    if (res instanceof AjaxResponse) {
        // 无 响应 数据
        if (lodash.isNil(res.response)) {
            throw lodash.merge(res, { message: 'ajax response undefined' })
        }
        else if (!lodash.eq(lodash.get(res.response, 'code', 0), 0)) {
            throw lodash.merge(res, { message: lodash.get(res.response, 'msg') })
        }
    }
    // 错误 超时
    if (res instanceof AjaxError || res instanceof TimeoutError) {
        throw res
    }
    return true
}
AjaxBasics.onMap = function (res) {
    return res.response.result
}
AjaxBasics.onError = function (error) {
    notification.error({ key: "AjaxBasics", message: '提示', description: lodash.get(error, 'response.msg', error.message) })
}
AjaxBasics.onNProgress = function (type: 'start' | 'done' = 'start') {
    if (type == "start") {
        NProgress.start();
    } else {
        NProgress.done();
    }
}
// 扩展
Vue.prototype.$ajax = request;
declare module 'vue/types/vue' {
    interface Vue {
        $ajax: typeof request;
    }
}