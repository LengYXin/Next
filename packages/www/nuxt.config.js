
const webpack = require('webpack');
const lodash = require('lodash');
const path = require('path');
module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: '暄桐教室',//process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    'ant-design-vue/dist/antd.less'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/use'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxt/typescript-build',
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // 图库替换
      lodash.set(config, `resolve.alias["@ant-design/icons/lib/dist$"]`, path.resolve(process.cwd(), 'plugins/icon.ts'))
    },
    loaders: {
      less: {
        javascriptEnabled: true
      }
    },
    plugins: [
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ],
    babel: {
      plugins: [
        // [
        //   "import",
        //   { libraryName: "ant-design-vue", libraryDirectory: "es", style: true }
        // ]
      ]
    },
    extractCSS: true,
    optimization: {
      splitChunks: {
        chunks: 'async',
        // cacheGroups: {
        //   commons: {
        //     test: /[\\/]node_modules[\\/](vue|ant-.*|@ant-.*|vue-.*|babel-.*|core-js|moment|lodash)[\\/]/,
        //     name: 'vendors',
        //     chunks: 'all'
        //   }
        // }
        //   pages: {
        //     test: /[\\/]pages[\\/]/,
        //     name: 'pages',
        //     chunks: 'all'
        //   }
        // }
      }
    },
    analyze: {
      analyzerMode: 'static'
    }
  }
}
