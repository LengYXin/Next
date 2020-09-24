/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:28:48
 * @modify date 2020-08-05 14:28:48
 * @desc 扩展 配置信息 请勿随便更改
 */
const lodash = require('lodash');
const path = require('path');
const build = require('@xt/client/config/build');
const env = require('../env.config');
const production = env.NODE_ENV === 'production';
const deployUat = env.DEPLOY_ENV === 'uat';
const deployPro = env.DEPLOY_ENV === 'pro';
const buildConfig = build(env);
/*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
module.exports = lodash.merge({}, buildConfig, {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
        buildConfig.extend(config, ctx);
        // 图库替换
        lodash.update(config, 'resolve.alias', alias => {
            return lodash.merge({
                // 'swiper': require.resolve('swiper'),
                "@ant-design/icons/lib/dist$": path.resolve(process.cwd(), 'plugins/icon.ts'),
            }, alias)
        });

    },
    postcss: {
        plugins: {
            'postcss-pxtorem': {
                rootValue: 16,
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
                    test: /[\\/]node_modules[\\/](ant-.*|@ant-.*|lodash.*|swiper.*|moment.*|viewerjs.*|bn.*|elliptic.*)[\\/]/,
                    chunks: 'all',
                }
            }
        }
    },
    babel: {
        plugins: [
            'lodash',
            ['import', {
                libraryName: 'ant-design-vue',
                libraryDirectory: 'lib',
                style: (name) => `${name}/style/index.js`
            }],
        ]
    }
}) 