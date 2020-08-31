const path = require('path');
module.exports = {
  // plugins: [
  //   [
  //     "import",
  //     { libraryName: "ant-design-vue", libraryDirectory: "es", style: true }
  //   ]
  // ],
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
