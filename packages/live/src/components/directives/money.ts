/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:16:00
 * @modify date 2020-08-05 14:16:00
 * @desc 钱显示格式化
 */

import Vue from 'vue';
import lodash from 'lodash';
Vue.directive('money', {
    inserted: onRender,
    componentUpdated: onRender,
    unbind(el: any) {
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
    let { value, oldValue } = binding;
    if (lodash.eq(value, oldValue)) {
        return
    }
    // if (!lodash.includes('.', value)) {
    //     value += ".00"
    // }
    el.innerHTML = value + '元';
}