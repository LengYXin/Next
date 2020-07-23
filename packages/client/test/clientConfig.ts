import lodash from 'lodash';
import { TimeoutError } from "rxjs";
import { AjaxError, AjaxResponse } from "rxjs/ajax";
import { AjaxBasics } from '../helpers/ajaxBasics';
// 重置  AjaxBasics  配置
onResetAjaxBasics()
export default new AjaxBasics({ target: 'https://cr-api-uat.xuantong.cn' });
/**
 * 重置  AjaxBasics  配置
 */
function onResetAjaxBasics() {
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
        // console.log("LENG: AjaxBasics.onMap -> res", res)
        return res.response.result
    }
    AjaxBasics.onError = function (error) {
        // console.log(error)
        // notification.error({ key: "AjaxBasics", message: '提示', description: lodash.get(error, 'response.msg', error.message) })
    }
    AjaxBasics.onNProgress = function (type: 'start' | 'done' = 'start') {
        if (type == "start") {
            // NProgress.start();
        } else {
            // NProgress.done();
        }
    }
}
