const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const lodash = require('lodash');
const path = require('path');
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
        lodash.set(config, `resolve.alias["@ant-design/icons/lib/dist$"]`, path.resolve(process.cwd(), 'plugins/icon.ts'));
        // lodash.unset(config, 'resolve.alias.@');
        // console.log("extend -> config", config)
    },
    extractCSS: true,
    loaders: {
        less: {
            lessOptions: {
                javascriptEnabled: true
            }
        }
    },
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