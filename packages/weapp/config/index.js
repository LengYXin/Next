const webpackChain = require('./webpackChain');
const lodash = require('lodash');
const fs = require('fs');
const config = {
  projectName: 'xt',
  date: '2020-7-22',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2
  },
  sourceRoot: 'src',
  outputRoot: 'dist_' + process.env.TARO_ENV,
  plugins: [],
  defineConstants: {
  },
  copy: {
    patterns: [
    ],
    options: {
    }
  },
  framework: 'react',
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {

        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  }
}
magicChange()
module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}

function magicChange() {
  try {
    const startPath = require.resolve('@tarojs/router').replace('index.js', 'router.esm.js');
    // 文件存在
    if (fs.existsSync(startPath)) {
      const startjs = fs.readFileSync(startPath).toString();
      if (lodash.includes(startjs, 'onLoad = false) {')) {
        console.log('------------------------------------ modify default setting ------------------------------------')
        // 替换 代码
        const newStartjs = startjs.replace('onLoad = false) {', 'onLoad = true) {// LENG magicChange ');
        fs.writeFileSync(startPath, newStartjs);
      }
    }
  } catch (error) {
    console.log("modify failed", error);
  }
}