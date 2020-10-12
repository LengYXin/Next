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
        scope.addEventListener('resize', debounce(onResize, 300));
        onResize();
        /**
         * resize 事件
         * @param {*} event 
         */
        function onResize(event) {
            var innerWidth = scope.innerWidth;
            var innerHeight = scope.innerHeight;
            var proportion = innerWidth / innerHeight;//比例
            var location = scope.location;
            var href = location.href;
            var mobile = innerWidth <= 576 || proportion <= 0.563;//满足手机端要求
            var index = href.indexOf('/mobile');
            if (mobile) {
                if (index === -1) {
                    onReplace('/mobile')
                }
            } else {
                if (index !== -1) {
                    onReplace('')
                }
            }
        }
        /**
         * 重定向
         * @param {*} url 
         */
        function onReplace(url) {
            var location = scope.location;
            var origin = location.origin + url + '?t=' + Date.now();
            console.warn("LENG: onReplace -> origin", origin)
            // 本地环境 不跳转 404
            if (!scope.__xt__env.DEPLOY_ENV) {
                return
            }
            location.replace(origin)
        }
        /**
         * 防抖
         * @param {*} fn 
         * @param {*} wait 
         */
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