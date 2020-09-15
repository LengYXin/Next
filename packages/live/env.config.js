const lodash = require('lodash');
const env = require('@xt/client/config/env.config');
const { writeFileSync, writeFileSyncMD } = require('@xt/client/config/hooks');
const production = env.NODE_ENV === 'production';
const config = lodash.merge(env, { publicPath: production ? '/live/' : '/' })
// 环境配置
module.exports = {
    /** 配置 */
    config,
    /** 传入 webpack DefinePlugin  */
    process: lodash.mapValues(lodash.mapKeys(config, (value, key) => {
        return `process.env.${key}`
    }), value => JSON.stringify(value)),
    /** webpakc 更改 env.config.js  插件 */
    plugin: class {
        apply(compiler) {
            const { options } = compiler;
            compiler.plugin('done', compilation => {
                writeFileSync(config, options.output.path);
                writeFileSyncMD(config, options.output.path);
            })
        }
    }

};