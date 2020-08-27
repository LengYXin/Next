const moment = require('moment');
const build = require('./configs/build');
const head = require('./configs/head');
const router = require('./configs/router');
const lodash = require('lodash');
const target = {
  pro: 'https://cr-api-uat.xuantong.cn',
  uat: 'https://cr-api-uat.xuantong.cn',
  dev: 'https://dev-api.xuantong.cn'
}
// api 地址
const env = {
  // api 地址
  target: lodash.get(target, process.env.DEPLOY_ENV, target.dev),
  // 版本号
  version: `${process.env.npm_package_version} ${moment().format("YYYY-MM-DD HH:mm")}`,
  // 环境 uat pro
  DEPLOY_ENV: process.env.DEPLOY_ENV,
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
const generate = {
  dir: `build_${lodash.snakeCase(process.env.npm_package_version)}`,
  // 设置为false时，将根据路由路径生成 HTML 文件：
  subFolders: false
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
    // 'ant-design-vue/dist/antd.less',
    'quill/dist/quill.snow.css',
    'swiper/css/swiper.css',
    '@/assets/style/index.less'
  ],
  styleResources: {
    // your settings here
    sass: [],
    scss: [],
    less: [
      '@/assets/themes/colors.less',
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
  globalName: 'XT',
  vue: {
    config: {
      productionTip: false,
      devtools: false,
    }
  },
  router,
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: false,
  env,
  proxy,
  generate,
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: build
}
