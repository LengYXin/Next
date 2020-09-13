const moment = require('moment');
const lodash = require('lodash');
const path = require('path');
const fs = require('fs');
const config = {
    // 微信 App id
    appid: getWXAppid(),
    // 域名
    domain: getDomain(),
    // api 地址
    target: getTarget(),
    // 版本号
    version: `${process.env.npm_package_version} ${moment().format("YYYY-MM-DD HH:mm")}`,
    // 环境 uat pro
    DEPLOY_ENV: process.env.DEPLOY_ENV,
    NODE_ENV: process.env.NODE_ENV,
};
/**
 * API target
 * @param {*} env 
 */
function getTarget(env = process.env.DEPLOY_ENV) {
    const config = {
        pro: 'https://cr-api-uat.xuantong.cn',
        uat: 'https://cr-api-uat.xuantong.cn',
        dev: 'https://imweb.xuantong.cn'//'https://dev-api.xuantong.cn'
    }
    return lodash.get(config, env, config.dev)
}
/**
 * 微信 微信 Appid
 * @param {*} env 
 */
function getWXAppid(env = process.env.DEPLOY_ENV) {
    const config = {
        pro: 'wx86b9c08d1269ab6e',
        dev: 'wx0ec5ab0807138971'
    }
    return lodash.get(config, env, config.dev)
}
/**
 * 域名
 * @param {*} env 
 */
function getDomain(env = process.env.DEPLOY_ENV) {
    const config = {
        pro: 'https://www.xuantong.cn',
        uat: 'https://cr-uat.xuantong.cn',
        testing: 'https://testing.xuantong.cn',
        dev: 'https://dev.xuantong.cn'
    }
    return lodash.get(config, env, config.dev)
}

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
                // console.log("LENG: apply -> compilation", compilation)
                try {
                    const envPath = path.join(options.output.path, 'env.config.js');
                    if (fs.existsSync(envPath)) {
                        const envjs = fs.readFileSync(envPath).toString();
                        const newEnvjs = lodash.template(envjs, { interpolate: /\({([\s\S]+?)}\)/g })({
                            env: JSON.stringify(config, null, 4)
                        });
                        fs.writeFileSync(envPath, newEnvjs);
                    }
                } catch (error) {
                    console.log("env failed", error);
                }
            })
        }
    }

};