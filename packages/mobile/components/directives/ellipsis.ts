/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:16:00
 * @modify date 2020-08-05 14:16:00
 * @desc 超出查看全文
 */

import Vue from 'vue';
import lodash from 'lodash';
// const inserted = lodash.debounce(onRender, 50);
Vue.directive('ellipsis', {
    inserted: onRender,
    //  (el, bind) => {
    //     const debouncedRender = lodash.debounce(onRender)
    //     debouncedRender(el, bind)
    // },
    // componentUpdated: onRender,
    unbind(el: any) {
    }
});
function onRender(el, { value = 9 }: any) {
    value = (value || 9) + 1;
    el.classList.add('xt-ellipsis');
    const style = window.getComputedStyle(el, null);
    const top = getPropertyValue('padding-top', style);
    const bottom = getPropertyValue('padding-bottom', style);
    const height = getPropertyValue('height', style) - top - bottom;
    const lineheight = getPropertyValue('line-height', style, 20);
    const maxHeight = lineheight * value;
    el.style.maxHeight = maxHeight + 'px';
    // console.log("LENG: onRender -> height", {
    //     el,
    //     top,
    //     bottom,
    //     height,
    //     maxHeight,
    //     lineheight
    // })
    if (height > (maxHeight - lineheight)) {
        let open = false;
        const btn = document.createElement('div');
        btn.addEventListener('click', () => {
            open = !open;
            if (open) {
                el.style.maxHeight = '';
                btn.innerText = '收起';
                btn.style.position = 'initial';
            } else {
                el.style.maxHeight = maxHeight + 'px';
                btn.innerText = '查看全文';
                btn.style.position = '';
            }
        }, false)
        btn.className = "xt-ellipsis-btn";
        btn.innerText = '查看全文';
        el.append(btn);

    }


}
function getPropertyValue(property, style, defaultValue = 0) {
    return parseInt(lodash.replace(style.getPropertyValue(property), 'px', '')) || defaultValue;
}