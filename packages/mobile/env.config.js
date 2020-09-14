const moment = require('moment');
const lodash = require('lodash');
const DEPLOY_ENV = process.env.DEPLOY_ENV || 'dev';
console.log();
console.log("LENG: process.env", DEPLOY_ENV, process.env.NODE_ENV);
console.log();
// 环境配置
module.exports = {
    // 微信 App id
    appid: getWXAppid(),
    // 阿里云日志
    logger: getLogger(),
    // 域名
    domain: getDomain(),
    // api 地址
    target: getTarget(),
    // 版本号
    version: `${process.env.npm_package_version} ${moment().format("YYYY-MM-DD HH:mm")}`,
    // 环境 uat pro
    DEPLOY_ENV: DEPLOY_ENV,
};
/**
 * API target
 * @param {*} env 
 */
function getTarget(env = DEPLOY_ENV) {
    const config = {
        pro: 'https://cr-api-uat.xuantong.cn',
        uat: 'https://cr-api-uat.xuantong.cn',
        test:'https://testing-api.xuantong.cn',
        dev: 'https://dev-api.xuantong.cn'
    }
    return lodash.get(config, env, config.dev)
}
/**
 * BrowerLogger Pid
 * @param {*} env 
 */
function getLogger(env = DEPLOY_ENV) {
    const config = {
        pro: "eezf26fnf7@53c926088ab1292",
        uat: "eezf26fnf7@7395531b1258a13",
        test:'eezf26fnf7@7395531b1258a13',
        dev: ''
    }
    return lodash.get(config, env, config.dev)
}
/**
 * 微信 微信 Appid
 * @param {*} env 
 */
function getWXAppid(env = DEPLOY_ENV) {
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
function getDomain(env = DEPLOY_ENV) {
    const config = {
        pro: 'https://www.xuantong.cn',
        uat: 'https://cr-uat.xuantong.cn',
        test: 'https://testing.xuantong.cn',
        dev: 'https://dev.xuantong.cn'
    }
    return lodash.get(config, env, config.dev)
}