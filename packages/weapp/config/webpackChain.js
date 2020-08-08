const path = require('path');
module.exports = {
    alias: (chain) => {
        // chain.plugin('TsconfigPathsPlugin')
        //     .use(require('tsconfig-paths-webpack-plugin'), [{
        //         configFile: path.resolve(process.cwd(), 'tsconfig.json')
        //     }])
        chain.resolve.alias
            .set('~', path.resolve(process.cwd(), 'src'))
        // .set(key, value)
    },
    optimization: (chain) => {
        // chain.output.filename('script/[name].[hash:8].js');
        // chain.output.chunkFilename('script/[name].[hash:8].js');
        // console.log(chain.resolve.alias.get())
        // throw 'a'
        // chain.resolve.alias
        //     .set('lodash', require.resolve('lodash'))
        chain.optimization.splitChunks({
            chunks: 'async',
            minSize: 20000,
            cacheGroups: {
                components: {
                    name: 'lib',
                    test: module => {
                        return /@tarojs\/components/.test(module.request)
                    },
                    priority: 100
                }
            }
        })
    },
    analyzer: (chain) => {
        chain.plugin('analyzer')
            .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [{
                analyzerMode: 'static',
                reportFilename: path.resolve(process.cwd(), 'report.html')
            }])
    },
    vConsolePlugin: (chain) => {
        chain.plugin('vConsole')
            .use(require('vconsole-webpack-plugin'), [{
                filter: [],  // 需要过滤的入口文件
                enable: false // 发布代码前记得改回 false
            }])
    }
}