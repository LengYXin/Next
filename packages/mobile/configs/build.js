/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:28:48
 * @modify date 2020-08-05 14:28:48
 * @desc 扩展 配置信息 请勿随便更改
 */
const lodash = require('lodash');
const path = require('path');
const vconsole = require("vconsole-webpack-plugin");
const build = require('@xt/client/config/build');
const env = require('../env.config');
const production = env.NODE_ENV === 'production';
const deployUat = env.DEPLOY_ENV === 'uat';
const deployPro = env.DEPLOY_ENV === 'pro';
const buildConfig = build(env);
if (production) {
    buildConfig.plugins.push(new vconsole({
        filter: [], // 需要过滤的入口文件
        enable: !deployPro // 发布代码前记得改回 false
    }))
}
/*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
module.exports = lodash.merge({}, buildConfig, {
    postcss: {
        plugins: {
            'postcss-pxtorem': {
                rootValue: 37.5,
                unitPrecision: 5,
                // propList: ['font', 'font-size', 'line-height', 'letter-spacing', 'widht', 'height'],
                propList: ['*'],
                selectorBlackList: [],
                replace: true,
                mediaQuery: false,
                minPixelValue: 0,
                // exclude: /node_modules/i
            }
        }
    },
    loaders: {
        less: {
            lessOptions: {
                // modifyVars: modifyVars,
                modifyVars: {
                    // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
                    hack: `true; @import "${path.resolve(process.cwd(), 'assets/themes/modifyVars.less')}";`,
                },
                javascriptEnabled: true
            }
        }
    },
    optimization: {
        minimize: deployPro,
        namedModules: !deployPro,
        splitChunks: {
            chunks: 'async',
            cacheGroups: {
                min: {
                    name: 'min',
                    test: /[\\/]node_modules[\\/](vue.*|mobx.*|core.*|rxjs.*|nuxt.*|.*nuxt.*)[\\/]/,
                    chunks: 'all',
                },
                lib: {
                    name: 'lib',
                    test: /[\\/]node_modules[\\/](vant.*|lodash.*|swiper.*|moment.*|viewerjs.*|bn.*|elliptic.*)[\\/]/,
                    chunks: 'all',
                }
            }
        }
    },
    babel: {
        plugins: [
            'lodash',
            // ['import', {
            //     libraryName: 'vant',
            //     libraryDirectory: 'lib',
            //     style: (name) => `${name}/style/less`,
            // }, 'vant'],
        ]
    }
}) 