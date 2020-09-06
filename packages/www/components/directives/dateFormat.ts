/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:16:00
 * @modify date 2020-08-05 14:16:00
 * @desc 倒计时
 */

import Vue from 'vue';
import lodash from 'lodash';
import moment from 'moment';
const key = 'DateFormatInterval';
Vue.directive('dateFormat', {
    // 当被绑定的元素插入到 DOM 中时……
    bind(el: HTMLDivElement, binding) {
        // console.log("LENG: bind -> binding", binding)
        // const value = binding.value;
        // el.innerHTML = moment(value).format();
    },
    inserted: onRender,
    componentUpdated: onRender,
    unbind(el: any) {
        onClear(el)
    }
});
/**
 * 时间格式化 渲染  interval 属性 表示倒计时
 * @param el 
 * @param binding 
 * @param vnode 
 * @param oldVnode 
 */
function onRender(el: HTMLDivElement, binding, vnode, oldVnode) {
    const { value, oldValue } = binding;
    if (value) {
        let { format = "YYYY-MM-DD HH:mm:ss", interval, fromNow } = vnode?.data?.attrs;
        interval = lodash.eq(interval, '') || lodash.eq(interval, 'true');
        fromNow = lodash.eq(fromNow, '') || lodash.eq(fromNow, 'true');
        if (lodash.eq(value, oldValue)) {
            return
        }
        // 倒计时
        if (interval) {
            onInterval(el, value, format, fromNow);
        }
        onInnerHTML(el, value, format, fromNow);
    }

}
/**
 * 倒计时
 * @param el 
 * @param value 
 * @param format 
 */
function onInterval(el: HTMLDivElement, value, format, fromNow) {
    onClear(el);
    const ms = fromNow ? 30000 : 1000;
    const interval = setInterval(() => {
        onInnerHTML(el, value -= ms, format, fromNow);
    }, ms);
    lodash.set(el, key, interval);
}
/**
 * 清理 倒计时
 * @param el 
 */
function onClear(el: HTMLDivElement) {
    clearInterval(lodash.get(el, key));
}
function onInnerHTML(el: HTMLDivElement, value, format, fromNow) {
    // 元素显示
    if (isConnected(el)) {
        let momentDate = moment(value);
        // 纠正时间差
        if (lodash.includes(value, 'T')) {
            momentDate = momentDate.add(-8, "hours")
        }
        if (fromNow) {
            value = momentDate.fromNow();
            if (value == "几秒前" || value == "几秒内" || value == "几秒后") {
                value = "刚刚";
            }
        } else {
            value = momentDate.format(format);
        }
        el.innerHTML = value
    }

}
function isConnected(el) {
    return lodash.get(el, "isConnected", true);
}