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
    // componentUpdated: onRender,
    unbind(el: any) {
    }
});
function onRender(el, { value = 9 }: any) {
    value = (value || 9) + 1
    const style = window.getComputedStyle(el, null);
    // console.log("LENG: onRender -> style", style)
    const top = getPropertyValue('padding-top', style);
    const bottom = getPropertyValue('padding-bottom', style);
    const height = getPropertyValue('height', style) - top - bottom;
    const lineheight = getPropertyValue('line-height', style);
    const maxHeight = lineheight * value;
    el.style.maxHeight = maxHeight + 'px';
    el.classList.add('lyx-ellipsis');
    // console.log("LENG: onRender -> height", el, height)
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
        btn.className = "lyx-ellipsis-btn";
        btn.innerText = '查看全文';
        el.append(btn);

    }


}
function getPropertyValue(property, style) {
    return parseInt(lodash.replace(style.getPropertyValue(property), 'px', '')) || 0;
}