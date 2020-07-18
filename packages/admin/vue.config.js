// const { name } = require('./package');
const name = 'vue'
module.exports = {
  outputDir: 'build',
  runtimeCompiler: true,
  css: {
    // modules: true,
    sourceMap: true,
    loaderOptions: {
      less: {
        // modifyVars: modifyVars,
        javascriptEnabled: true,
      }
    }
  },
  filenameHashing: true,
  devServer: {
    // host: '0.0.0.0',
    hot: true,
    disableHostCheck: true,
    overlay: {
      warnings: false,
      errors: true,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  // 自定义webpack配置
  configureWebpack: {
    output: {
      // 把子应用打包成 umd 库格式
      library: `${name}`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${name}`,
    },
  },
}