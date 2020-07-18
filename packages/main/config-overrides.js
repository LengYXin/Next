const { override, fixBabelImports, addBundleVisualizer, addLessLoader, disableEsLint, babelInclude, addWebpackResolve } = require('customize-cra');
const path = require('path');
module.exports = override(
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
);