import Taro from '@tarojs/taro';
import * as EnumApi from '@xt/client/api';
import '@xt/client/configure';
import { AjaxBasics, IAjaxBasicsOptions } from '@xt/client/helpers/ajaxBasics';
import lodash from 'lodash';
import { Component } from 'react';
import { Observable } from "rxjs";
import { AjaxRequest } from 'rxjs/ajax';
import { ControllerUser } from '@xt/client/entities';
export const ajax = new AjaxBasics({ target: 'https://cr-api-uat.xuantong.cn' });
// 重置 Ajax
// onResetAjaxBasics()
// 扩展 
Component.prototype.$ajax = ajax;
Component.prototype.$EnumApi = EnumApi;
declare module 'react' {
    interface Component {
        /** Ajax */
        $ajax: AjaxBasics;
        /** API 枚举 */
        $EnumApi: typeof EnumApi;
    }
}
/**
 * 重置 请求配置
 * @param $storeUser 
 */
export function onResetAjaxBasics($storeUser: ControllerUser) {
    AjaxBasics.onError = async function (error) {
        try {
            const message = lodash.get(error, 'data.msg', lodash.get(error, 'data.message', error.statusText || "Error"))
            Taro.atMessage({
                'message': message,
                'type': 'error',
            })
            // 登录失效
            if (lodash.includes([600002, 900004], lodash.get(error, 'data.code'))) {
                // if (Taro.getEnv() === Taro.ENV_TYPE.WEAPP) {
                //     Taro.switchTab({ url: '/pages/index/index' })
                // } else {
                //     Taro.redirectTo({ url: '/pages/index/index' })
                // }
                $storeUser.onOutLogin()
                $storeUser.onToggleVisible(true)
            }
        } catch (error) {
        }
    }
    AjaxBasics.onMergeBody = function () {
        return $storeUser.onSignatureUser()
    }
    AjaxBasics.onMap = function (res) {
        return lodash.get(res, 'response.result')
    }
    AjaxBasics.onNProgress = function (type: 'start' | 'done' = 'start') {
        if (type == "start") {
            Taro.showLoading({ title: '加载中' })
        } else {
            Taro.hideLoading()
        }
    }
    AjaxBasics.onFilter = function (res) {
        if (lodash.eq(lodash.get(res, 'status'), 200)) {
            if (lodash.eq(lodash.get(res, 'response.code'), 0)) {
                return true
            }
            throw { data: lodash.get(res, 'response') }
        }
        throw res
    }
    // 微信 Observable 替换
    if (Taro.getEnv() === Taro.ENV_TYPE.WEAPP) {
        AjaxBasics.onRequest = function (request: Taro.request.Option & AjaxRequest, options: IAjaxBasicsOptions) {
            // 先转换 为 body 解析
            request.body = lodash.merge({}, request.body, request.data);
            request = AjaxBasics.onCompatibleAjaxRequest(request, options) as Taro.request.Option;
            request.data = lodash.merge({}, request.data, request.body);
            const obs = new Observable((sub) => {
                onRequest()
                async function onRequest() {
                    try {
                        const RequestTask = await Taro.request(request);
                        sub.next(RequestTask);
                        sub.complete()
                    } catch (error) {
                        sub.error(error);
                    }
                }
            })
            return AjaxBasics.AjaxObservable(obs as any, options)
        }
        // AjaxBasics.onCompatibleBody=function()
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
    }
}