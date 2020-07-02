const { override, fixBabelImports, addBundleVisualizer, addLessLoader, disableEsLint, babelInclude, addWebpackResolve } = require('customize-cra');
const lodash = require('lodash');
const path = require('path');
const name = 'react'
module.exports = {
    webpack: (config) => {
        config = lodash.merge(override(
            // 按需加载
            fixBabelImports('import', {
                libraryName: 'antd',
                libraryDirectory: 'es',
                style: true,
            }),
            addLessLoader({
                javascriptEnabled: true,
                //    modifyVars: { '@primary-color': '#1DA57A' },
                localIdentName: "leng-[local]-[hash:base64:5]"
            }),
            // 依赖分布地图 --analyze
            addBundleVisualizer({
                "analyzerMode": "static",
                "reportFilename": "report.html"
            }, true),
            // 禁用 EsLint 
            disableEsLint()
        )(config), {
            output: {
                library: `${name}`,
                libraryTarget: `umd`,
                jsonpFunction: `webpackJsonp_${name}`,
                globalObject: `window`,
            }
        })
        // console.log("config", config)
        return config
    },
    devServer: (config) => {
        return () => lodash.merge(config(), {
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            historyApiFallback: true,
            hot: false,
            watchContentBase: false,
            liveReload: false
        })
    }
};