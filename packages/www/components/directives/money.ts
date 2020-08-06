/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:16:00
 * @modify date 2020-08-05 14:16:00
 * @desc [description]
 */

import Vue from 'vue';
import lodash from 'lodash';
Vue.directive('money', {
    // 当被绑定的元素插入到 DOM 中时……
    bind(el: HTMLDivElement, binding) {
        let value = binding.value;
        if (!lodash.includes('.', value)) {
            value += ".00"
        }
        el.innerHTML = value + '￥';
    },
    inserted(el: any, binding) {

    },
    unbind(el: any) {
    }
});
