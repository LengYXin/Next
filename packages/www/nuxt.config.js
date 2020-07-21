const lodash = require('lodash');
const build = require('./configs/build');
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
    '@/plugins/index.ts'
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
    '@nuxtjs/proxy'
  ],
  router: {
    extendRoutes(routes, resolve) {
      // 删除 非 page 生成的路由
      lodash.remove(routes, route => /[\\/](view|views)[\\/]|\.(ts)/.test(route.component))
      console.log("extendRoutes -> routes", routes)
    }
  },
  proxy: {
    "/api": {
      target: "https://cr-api-uat.xuantong.cn", // 代理地址
      changeOrigin: true,
      pathRewrite: {
        "^/api": "/"
      }
    }
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: build
}
