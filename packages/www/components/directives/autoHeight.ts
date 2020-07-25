
import lodash from "lodash";
import { fromEvent } from "rxjs";
import { debounceTime, filter } from "rxjs/operators";
import Vue from 'vue';
Vue.directive('auto-height', {
    // 当被绑定的元素插入到 DOM 中时……
    bind(el, binding) {

    },
    inserted(el: any, binding) {
        let height = 400;
        let subtract = 50;
        let styleKey = 'height';
        if (lodash.isObject(binding.value)) {
            height = lodash.toNumber(lodash.get(binding.value, 'height', height));
            subtract = lodash.toNumber(lodash.get(binding.value, 'subtract', subtract));
            styleKey = lodash.get(binding.value, 'styleKey', styleKey);
        } else {
            height = lodash.toNumber(binding.value);
        }
        el.ResizeEvent = fromEvent(window, "resize")
            .pipe(
                debounceTime(500),
                // 当前 节点 在 dom 树中
                filter(() => isConnected(el))
            )
            .subscribe(e => {
                onSetHeight(el, styleKey, height, subtract);
            });
        onSetHeight(el, styleKey, height, subtract);
    },
    unbind(el: any) {
        el.ResizeEvent && el.ResizeEvent.unsubscribe()
    }
});
function onSetHeight(el, styleKey, height = 400, subtract = 50) {
    try {
        const offsetTop = lodash.get(el, "offsetTop", 0),
            innerHeight = window.innerHeight;
        height = innerHeight - offsetTop - subtract;
        height = height < 400 ? 400 : height;
    } catch (error) {
        height = 400;
    }
    // return height + 'px'
    if (styleKey === 'height') {
        el.style.height = height + 'px'
    } else if (styleKey === 'minHeight') {
        el.style.minHeight = height + 'px'
    } else {
        el.style.maxHeight = height + 'px'
    }
}
function isConnected(el) {
    return lodash.get(el, "isConnected", false);
}