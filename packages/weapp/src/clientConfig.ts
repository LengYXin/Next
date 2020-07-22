import Taro from '@tarojs/taro';
import { AjaxBasics } from '@xt/client/helpers/ajaxBasics';
import lodash from 'lodash';
import { Component } from 'react';
import { from, Observable } from "rxjs";
// 过滤
AjaxBasics.onFilter = function (res) {
    if (lodash.eq(lodash.get(res, 'statusCode'), 200) && lodash.eq(lodash.get(res, 'data.code'), 0)) {
        return true
    }
    throw res
}
AjaxBasics.onMap = function (res) {
    return lodash.get(res, 'data.result')
}
AjaxBasics.onError = function (error) {
    try {
        const message = lodash.get(error, 'data.msg', lodash.get(error, 'data.message', error.statusText))
        Taro.atMessage({
            'message': message,
            'type': 'error',
        })
    } catch (error) {

    }
}
AjaxBasics.onNProgress = function (type: 'start' | 'done' = 'start') {
    if (type == "start") {
        Taro.showLoading({ title: '加载中' })
    } else {
        Taro.hideLoading()
    }
}
class Request extends AjaxBasics {
    /**
    * ajax
    * @param request 
    */
    request<T>(request: Taro.request.Option) {
        request = AjaxBasics.onCompatibleAjaxRequest(request, this.options) as Taro.request.Option;
        return this.AjaxObservable(from(Taro.request(request)) as any) as Observable<T>
    }
}
// 扩展
declare module 'react' {
    interface Component {
        $ajax: Request;
    }
}
Component.prototype.$ajax = new Request({ target: 'https://cr-api-uat.xuantong.cn' });
