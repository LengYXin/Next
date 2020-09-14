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
const production = process.env.NODE_ENV === 'production';
const deployUat = process.env.DEPLOY_ENV === 'uat';
const deployPro = process.env.DEPLOY_ENV === 'pro';
/*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
module.exports = {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
        // console.log("LENG: extend -> config", config)
        // lodash.set(config,'mode','development')
        // uat 环境 
        if (!deployPro) {
            lodash.set(config, 'devtool', 'source-map')
        }
        // 图库替换
        lodash.update(config, 'resolve.alias', alias => {
            return lodash.merge({
                // 'swiper': require.resolve('swiper'),
                "@ant-design/icons/lib/dist$": path.resolve(process.cwd(), 'plugins/icon.ts'),
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
        // console.log("extend -> config", config.resolve.alias)
        // throw 'aaa'
    },
    transpile: ['swiper', 'serializr', 'dom7', 'asn1.js'],
    publicPath: '/assets/',
    corejs: 3,
    // 分离css
    extractCSS: production,
    postcss: {
        plugins: {
            'postcss-pxtorem': require('postcss-pxtorem')({
                rootValue: 16,
                unitPrecision: 5,
                // propList: ['font', 'font-size', 'line-height', 'letter-spacing', 'widht', 'height'],
                propList: ['*'],
                selectorBlackList: [],
                replace: true,
                mediaQuery: false,
                minPixelValue: 0,
                exclude: /node_modules/i
            })
        }
    },
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
        // https://github.com/webpack-contrib/copy-webpack-plugin/tree/v5
        new CopyPlugin([
            { from: require.resolve('@xt/client').replace('index.ts', 'static') },
        ]),
        new MomentLocalesPlugin({ localesToKeep: ['es-us', 'zh-cn'] }),
        new webpack.BannerPlugin({ banner: `@author 冷 (https://github.com/LengYXin)\n@email lengyingxin8966@gmail.com` })
    ],
    optimization: {
        minimize: deployPro,
        namedModules: !deployPro,
        // moduleIds: deployPro ? 'deterministic' : 'named',
        // chunkIds: deployPro ? 'deterministic' : 'named',
        splitChunks: {
            chunks: 'async',
            cacheGroups: {
                // style: {
                //     name: 'style',
                //     test: /\.(css|less)$/,
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
    terser: {
        terserOptions: {
            compress: {
                drop_console: deployPro,
                // pure_funcs: ['console.log', 'console.warn']
            },
        }
    },
    // transpile: ['ant-design-vue'],
    babel: {
        plugins: [
            'lodash',
            ['import', {
                libraryName: 'ant-design-vue',
                libraryDirectory: 'lib',
                style: (name) => `${name}/style/index.js`
            }],
            // ['import', {
            //   libraryName: 'lodash',
            //   libraryDirectory: '',
            //   camel2DashComponentName: false
            // }, 'lodash']
        ]
    }
}