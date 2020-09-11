const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const webpack = require('webpack');
const lodash = require('lodash');
const path = require('path');
const env = require('./env.config');
const deployUat = process.env.DEPLOY_ENV === 'uat';
const deployPro = process.env.DEPLOY_ENV === 'pro';
module.exports = {
  outputDir: `build_${lodash.snakeCase(process.env.npm_package_version)}/${env.config.DEPLOY_ENV}`,
  productionSourceMap: deployUat,
  configureWebpack: {
    plugins: [
      new env.plugin(),
      new webpack.DefinePlugin(env.process),
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
  devServer: {
    proxy: {
      '/api': {
        target: env.config.target,
        changeOrigin: true,
        logLevel: "debug",
        pathRewrite: {
          "^/api": ""
        }
      },
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
