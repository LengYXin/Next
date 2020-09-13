/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-09-08 11:39:02
 * @modify date 2020-09-08 11:39:02
 * @desc 环境配置文件 用于替换 store global.ts 默认配置 configs/hooks.js 自动写入
 */
'use strict';
(function (scope) {
    if (scope['__xt__env']) {
        return;
    }
    var env = {}
    scope.__xt__env = ({ env });
})(
    ('undefined' !== typeof process &&
        '[object process]' === {}.toString.call(process)) ||
        ('undefined' !== typeof navigator && navigator.product === 'ReactNative')
        ? global
        : self
);