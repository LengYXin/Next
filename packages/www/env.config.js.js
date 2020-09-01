const moment = require('moment');
const lodash = require('lodash');

// 环境配置
module.exports = {
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
};
/**
 * API target
 * @param {*} env 
 */
function getTarget(env = process.env.DEPLOY_ENV) {
    const config = {
        pro: 'https://cr-api-uat.xuantong.cn',
        uat: 'https://cr-api-uat.xuantong.cn',
        dev: 'https://dev-api.xuantong.cn'
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