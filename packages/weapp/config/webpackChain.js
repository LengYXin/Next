module.exports = (chain) => {
    // chain.output.filename('script/[name].[hash:8].js');
    // chain.output.chunkFilename('script/[name].[hash:8].js');
    // console.log(chain.resolve.alias.get())
    // throw 'a'
    // config.resolve.alias
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
}