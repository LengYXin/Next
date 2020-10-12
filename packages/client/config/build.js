/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:28:48
 * @modify date 2020-08-05 14:28:48
 * @desc 扩展 配置信息 请勿随便更改
 */
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const lodash = require('lodash');
const path = require('path');
/*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
module.exports = env => {
    const production = env.NODE_ENV === 'production';
    const deployUat = env.DEPLOY_ENV === 'uat';
    const deployPro = env.DEPLOY_ENV === 'pro';
    return {
        publicPath: env.publicPath,
        /*
        ** You can extend webpack config here
        */
        extend(config, ctx) {
            // uat 环境 
            if (!deployPro) {
                lodash.set(config, 'devtool', 'source-map')
            }
            // 图库替换
            lodash.update(config, 'resolve.alias', alias => {
                return lodash.merge({
                    // 'swiper': require.resolve('swiper'),
                    // "mobx-vue": path.resolve(path.dirname(process.cwd()), 'mobx-vue/src/index.ts'),
                }, alias)
            });
            // i18n 单文件组件 https://kazupon.github.io/vue-i18n/zh/guide/sfc.html#%E5%AE%89%E8%A3%85-vue-i18n-loader
            lodash.update(config, 'module.rules', rules => {
                rules.push({
                    resourceQuery: /blockType=i18n/,
                    type: 'javascript/auto',
                    loader: '@kazupon/vue-i18n-loader'
                });
                return rules
            })
            // console.log(config.resolve.alias)
        },
        transpile: ['swiper', 'serializr', 'dom7', 'asn1.js'],
        corejs: 3,
        // 分离css
        extractCSS: production,
        // postcss: {
        //     plugins: {
        //         'postcss-pxtorem': require('postcss-pxtorem')({
        //             rootValue: 16,
        //             unitPrecision: 5,
        //             // propList: ['font', 'font-size', 'line-height', 'letter-spacing', 'widht', 'height'],
        //             propList: ['*'],
        //             selectorBlackList: [],
        //             replace: true,
        //             mediaQuery: false,
        //             minPixelValue: 0,
        //             exclude: /node_modules/i
        //         })
        //     }
        // },
        // loaders: {
        //     less: {
        //         lessOptions: {
        //             javascriptEnabled: true
        //         }
        //     }
        // },
        // 包分析 
        analyze: {
            analyzerMode: 'static',
            reportFilename: path.resolve(process.cwd(), path.dirname(env.dir), `report_${env.DEPLOY_ENV}.html`)
        },
        plugins: [
            // https://github.com/webpack-contrib/copy-webpack-plugin/tree/v5
            new CopyPlugin([
                { from: require.resolve('@xt/client').replace('index.ts', 'static') },
            ]),
            new MomentLocalesPlugin({ localesToKeep: ['es-us', 'zh-cn'] }),
            new webpack.BannerPlugin({ banner: `@author 冷 (https://github.com/LengYXin)\n@email lengyingxin8966@gmail.com` })
        ],
        // optimization: {
        //     minimize: deployPro,
        //     namedModules: !deployPro,
        //     splitChunks: {
        //         chunks: 'async',
        //         cacheGroups: {

        //         }
        //     }
        // },
        splitChunks: {
            layouts: false,
            pages: false,
            commons: false
        },
        terser: {
            terserOptions: {
                compress: {
                    drop_console: deployPro,
                },
            }
        },
        // babel: {
        //     plugins: [
        //         'lodash',
        //     ]
        // }
    }
}