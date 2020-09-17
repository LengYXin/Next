const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const webpack = require('webpack');
const lodash = require('lodash');
const path = require('path');
const build = require('@xt/client/config/build');
const env = require('./env.config');
console.log("LENG: env", env.config)
const deployUat = env.config.DEPLOY_ENV === 'uat';
const deployPro = env.config.DEPLOY_ENV === 'pro';
const production = env.config.NODE_ENV === 'production';
module.exports = {
  outputDir: env.config.dir,
  publicPath: env.config.publicPath,
  productionSourceMap: deployUat,
  configureWebpack: {
    plugins: [
      new env.plugin(),
      new webpack.DefinePlugin(env.process),
      ...build(env.config).plugins,
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
