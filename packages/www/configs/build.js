const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const lodash = require('lodash');
const path = require('path');
const production = process.env.NODE_ENV === 'production';
console.log();
console.log("LENG: process.env.NODE_ENV", process.env.NODE_ENV);
console.log();
/*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
module.exports = {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
        // 图库替换
        lodash.update(config, 'resolve.alias', alias => {
            return lodash.merge({
                // '@xt/client': path.resolve(path.dirname(process.cwd()), 'client'),
                "@ant-design/icons/lib/dist$": path.resolve(process.cwd(), 'plugins/icon.ts'),
            }, alias)
        });
        // i18n 单文件组件 https://kazupon.github.io/vue-i18n/zh/guide/sfc.html#%E5%AE%89%E8%A3%85-vue-i18n-loader
        lodash.update(config, 'module.rules', rules => {
            rules.push({
                resourceQuery: /blockType=i18n/,
                type: 'javascript/auto',
                loader: '@kazupon/vue-i18n-loader'
            })
            return rules
        })
        // console.log("extend -> config", config.module.rules)
    },
    // 分离css
    extractCSS: production,
    loaders: {
        less: {
            lessOptions: {
                // modifyVars: modifyVars,
                javascriptEnabled: true
            }
        }
    },
    // 包分析 
    analyze: {
        analyzerMode: 'static'
    },
    plugins: [
        new MomentLocalesPlugin({ localesToKeep: ['es-us', 'zh-cn'] })
    ],
    optimization: {
        splitChunks: {
            chunks: 'async',
        }
    },
    splitChunks: {
        layouts: false,
        pages: false,
        commons: false
    },
    // transpile: ['ant-design-vue'],
    babel: {
        plugins: [
            // ['import', {
            //   libraryName: 'ant-design-vue',
            //   libraryDirectory: 'es',
            //   style: true
            // }, 'ant-design-vue'],
            // ['import', {
            //   libraryName: 'lodash',
            //   libraryDirectory: '',
            //   camel2DashComponentName: false
            // }, 'lodash']
        ]
    }
}