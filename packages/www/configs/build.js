/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:28:48
 * @modify date 2020-08-05 14:28:48
 * @desc 扩展 配置信息 请勿随便更改
 */
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const webpack = require('webpack');
const lodash = require('lodash');
const path = require('path');
const production = process.env.NODE_ENV === 'production';
console.log();
console.log("LENG: process.env", process.env.ES, process.env.NODE_ENV);
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
        // lodash.set(config,'mode','development')
        // lodash.set(config,'devtool','eval-source-map')
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
        // console.log("extend -> config", config)
    },
    publicPath: '/assets/',
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
        analyzerMode: 'static',
        reportFilename: path.resolve(process.cwd(), 'report.html')
    },
    plugins: [
        new MomentLocalesPlugin({ localesToKeep: ['es-us', 'zh-cn'] }),
        new webpack.BannerPlugin({ banner: `@author 冷 (https://github.com/LengYXin)\n@email lengyingxin8966@gmail.com` })
    ],
    optimization: {
        splitChunks: {
            chunks: 'async',
            cacheGroups: {
                // css: {
                //     name: 'css',
                //     test: /[\\/]node_modules[\\/](.*.css)[\\/]/,
                //     chunks: 'all',
                // },
                min: {
                    name: 'min',
                    test: /[\\/]node_modules[\\/](vue.*|mobx.*|core.*|rxjs.*|nuxt.*|.*nuxt.*)[\\/]/,
                    chunks: 'all',
                },
                lib: {
                    name: 'lib',
                    test: /[\\/]node_modules[\\/](ant-.*|@ant-.*|lodash.*|swiper.*|moment.*|viewerjs.*|bn.*|elliptic.*)[\\/]/,
                    chunks: 'all',
                }
            }
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