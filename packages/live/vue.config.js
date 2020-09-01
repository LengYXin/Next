const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const webpack = require('webpack');
const lodash = require('lodash');
const path = require('path');
module.exports = {
  outputDir: "build",
  // plugins: [
  //   [
  //     "import",
  //     { libraryName: "ant-design-vue", libraryDirectory: "es", style: true }
  //   ]
  // ],
  configureWebpack: {
    plugins: [
      new MomentLocalesPlugin({ localesToKeep: ['es-us', 'zh-cn'] }),
      new webpack.BannerPlugin({ banner: `@author 冷 (https://github.com/LengYXin)\n@email lengyingxin8966@gmail.com` })
    ]
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          // modifyVars: modifyVars,
          javascriptEnabled: true
        }
      }
    }

  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        // path.resolve(require.resolve('ant-design-vue'), 'lib/style/themes/default.less')
        // path.resolve(__dirname, './src/assets/themes/colors.less'),
        // path.resolve(__dirname, './src/assets/themes/modifyVars.less'),
      ]
    }
  }
}
