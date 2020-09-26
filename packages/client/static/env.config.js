/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2019-09-08 11:39:02
 * @modify date 2019-09-08 11:39:02
 * @desc 环境配置文件 用于替换 store global.ts 默认配置 configs/hooks.js 自动写入
 */
'use strict';
(function (scope) {
    try {
        if (scope['__xt__env']) {
            return;
        }
        var env, global;
        // 环境配置
        scope.__xt__env = ({ env });
        // 全局数据
        scope.__xt__global = ({ global });
        scope.addEventListener('resize', debounce(onResize, 300))
        onResize();
        /** 跳转 */
        function onResize(event) {
            var innerWidth = scope.innerWidth;
            var innerHeight = scope.innerHeight;
            var proportion = innerWidth / innerHeight;
            var location = scope.location;
            var origin = location.origin;
            var href = location.href;
            var base = scope.__xt__env.base;
            if (base) {
                if (innerWidth <= 576 || proportion <= 0.563) {
                    if (href.indexOf('/mobile') != -1) {
                        return
                    }
                    location.replace(origin + '/mobile')
                } else {
                    if (base === '/') {
                        return
                    }
                    location.replace(origin)
                }
            }
        }
        /** 节流 */
        function debounce(fn, wait) {
            var timer = null;
            return function () {
                if (timer !== null) {
                    clearTimeout(timer);
                }
                timer = setTimeout(fn, wait);
            }
        }
    } catch (error) {
        console.log("LENG: error", error)
    }
})(
    ('undefined' !== typeof process &&
        '[object process]' === {}.toString.call(process)) ||
        ('undefined' !== typeof navigator && navigator.product === 'ReactNative')
        ? global
        : self
);