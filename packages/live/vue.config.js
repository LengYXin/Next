const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const webpack = require('webpack');
const lodash = require('lodash');
const path = require('path');
const env = require('./env.config.js');
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
      new webpack.DefinePlugin(env),
      new MomentLocalesPlugin({ localesToKeep: ['es-us', 'zh-cn'] }),
      new webpack.BannerPlugin({ banner: `@author 冷 (https://github.com/LengYXin)\n@email lengyingxin8966@gmail.com` })
    ],
    resolve: {
      alias: {
        "@ant-design/icons/lib/dist$": path.resolve(process.cwd(), 'src/components/icon.ts'),
      }
    },
    // module: {
    //   rules: [
    //     {
    //       test: /\.art$/,
    //       loader: 'art-template-loader',
    //     },
    //   ]
    // }
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
