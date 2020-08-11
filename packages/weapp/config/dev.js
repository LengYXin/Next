const webpackChain = require('./webpackChain');
module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {
  },
  mini: {
    webpackChain: webpackChain.alias,
  },
  h5: {
    devServer: {
      proxy: {
        "/api": {
          target: "https://cr-api-uat.xuantong.cn", // 代理地址
          changeOrigin: true,
          pathRewrite: {
            "^/api": "/"
          }
        }
      },
    },
    webpackChain: (chain)=>{
      webpackChain.alias(chain)
      webpackChain.vConsolePlugin(chain)
    },
  }
}
