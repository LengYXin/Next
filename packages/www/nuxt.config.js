const build = require('./configs/build');
const head = require('./configs/head');
const env = require('./env.config');
const router = require('./configs/router');
const hooks = require('./configs/hooks');
const lodash = require('lodash');

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
  dir: `build_${lodash.snakeCase(process.env.npm_package_version)}/${env.DEPLOY_ENV}`,
  // 设置为false时，将根据路由路径生成 HTML 文件：
  // subFolders: false
}
module.exports = {
  ssr: false,
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
  build,
  // https://zh.nuxtjs.org/api/configuration-hooks
  hooks
}
