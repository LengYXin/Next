const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const lodash = require('lodash');
const path = require('path');
export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'static',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: '暄桐教室',//process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
      { hid: 'version', name: 'version', content: process.env.npm_package_version || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    'ant-design-vue/dist/antd.less'
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '@/plugins/use'
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
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
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // 图库替换
      lodash.set(config, `resolve.alias["@ant-design/icons/lib/dist$"]`, path.resolve(process.cwd(), 'plugins/icon.ts'))
    },
    extractCSS: true,
    loaders: {
      less: {
        javascriptEnabled: true
      }
    },
    analyze: {
      analyzerMode: 'static'
    },
    plugins: [
      new MomentLocalesPlugin({ localesToKeep: ['es-us', 'zh-cn'] })
    ],
    splitChunks: {
      layouts: false,
      pages: true,
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
}
