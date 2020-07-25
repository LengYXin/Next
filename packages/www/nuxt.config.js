const lodash = require('lodash');
const path = require('path');
const build = require('./configs/build');
// api 地址
const env = {
  target: 'https://cr-api-uat.xuantong.cn'
};
const head = {
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
}
const router = {
  middleware: 'auth',
  extendRoutes(routes, resolve) {
    // 删除 非 page 生成的路由
    lodash.remove(routes, route => /[\\/](view|views)[\\/]|\.(ts)/.test(route.component))
    // console.log("extendRoutes -> routes", routes)
  }
}
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
    // 'nprogress/nprogress.css',
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

  // render: {
  //   bundleRenderer: {
  //     basedir: path.dirname(path.dirname(process.cwd()))
  //   }
  // },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: build
}
