const webpackChain = require('./webpackChain');
const path = require('path');
module.exports = {
  env: {
    NODE_ENV: '"production"'
  },
  defineConstants: {
  },
  mini: {
    webpackChain: (chain) => {
      webpackChain.analyzer(chain)
      webpackChain.alias(chain)
    }
  },
  h5: {
    /**
     * 如果h5端编译后体积过大，可以使用webpack-bundle-analyzer插件对打包体积进行分析。
     * 参考代码如下：
     */
    webpackChain: (chain) => {
      webpackChain.optimization(chain)
      webpackChain.alias(chain)
      webpackChain.analyzer(chain)
    }
  }
}
