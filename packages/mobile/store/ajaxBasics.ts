/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:12:55
 * @modify date 2020-08-05 14:12:55
 * @desc [description]
 */
// import '@xt/client/configure';
import { ControllerUser } from '@xt/client';
import { AjaxBasics } from '@xt/client';
// import { message } from 'ant-design-vue';
import { Notify } from 'vant';
import lodash from 'lodash';
import NProgress from 'nprogress';
import { TimeoutError } from "rxjs";
import $global from './global';
import { AjaxError, AjaxResponse } from "rxjs/ajax";
export const ajax = new AjaxBasics({ target: $global.target });
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
                throw lodash.merge(res, $global.production ? { message: '服务器开小差了' } : { message: '响应体不存在' })
            }
            else if (!lodash.eq(lodash.get(res.response, 'code', 0), 0)) {
                throw lodash.merge(res, { message: lodash.get(res.response, 'msg') })
            }
        }
        // 错误 超时
        if (res instanceof AjaxError || res instanceof TimeoutError) {
            console.error("LENG: AjaxBasics.onFilter -> res", res)
            throw { message: '服务器开小差了' };
        }
        return true
    }
    AjaxBasics.onMap = function (res) {
        return res?.response?.result
    }
    AjaxBasics.onError = function (error) {
        if (lodash.includes([600002, 900004], lodash.get(error, 'response.code'))) {
            $storeUser.onOutLogin()
            $storeUser.onToggleVisible(true)
            return
        }
        Notify({ type: 'danger', message: lodash.get(error, 'response.msg', error.message) });
        // notification.error({ key: "AjaxBasics", message: '提示', description: lodash.get(error, 'response.msg', error.message) })
        // message.error({ content: lodash.get(error, 'response.msg', error.message), key: 'message' })

    }
    AjaxBasics.onNProgress = function (type: 'start' | 'done' = 'start') {
        if (type == "start") {
            NProgress.start();
        } else {
            NProgress.done();
        }
    }
}
