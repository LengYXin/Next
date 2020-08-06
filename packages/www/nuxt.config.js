const moment = require('moment');
const build = require('./configs/build');
const head = require('./configs/head');
const router = require('./configs/router');
// 生产环境
const production = process.env.NODE_ENV === 'production';
// api 地址
const env = {
  target: 'https://cr-api-uat.xuantong.cn',
  version: `${process.env.npm_package_version} ${moment().format("YYYY-MM-DD HH:mm")}`
};
const proxy = {
  "/api": {
    target: env.target, // 代理地址
    changeOrigin: true,
    pathRewrite: {
      "^/api": "/"
    }
  }
};
const vue = {
  config: {
    productionTip: false,
    devtools: false,
  }
}
module.exports = {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'spa',// spa universal,
  /*
  ** Nuxt target  
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'static',//static server
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head,
  server: {
    // port: 8000, // default: 3000
    host: '0.0.0.0' // default: localhost,
  },
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: ['@/plugins/index.ts'],
  /**
   * icon 替换
   */
  watch: ['@/plugins/icon.ts'],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/style-resources'
  ],
  /*
  ** Global CSS
  */
  css: [
    'ant-design-vue/dist/antd.less',
    'quill/dist/quill.snow.css',
    '@/assets/style/index.less'
  ],
  styleResources: {
    // your settings here
    sass: [],
    scss: [],
    less: [
      '@/assets/themes/modifyVars.less',
      '@/assets/themes/index.less'
    ],
    stylus: []
  },
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/proxy'
  ],
  router,
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  env,
  proxy,
  vue,
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: build
}
