/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:29:33
 * @modify date 2020-08-05 14:29:33
 * @desc [description]
 */
const moment = require('moment');
const webpack = require('webpack');
const lodash = require('lodash');
const path = require('path');
const fs = require('fs');
module.exports = env => {
    return {
        generate: {
            done({ options }) {
                writeFileSync(env, path.join(options.generate.dir, env.publicPath));
                writeFileSyncMD(env, options.generate.dir);
            }
        }
    }
}
/**
 * 写入环境配置文件
 * @param {*} env 
 * @param {*} dir 
 * @param {*} global 
 */
function writeFileSync(env, dir, global = {}) {
    try {
        const envPath = path.join(dir, 'env.config.js');
        console.log("LENG: env.config.js ", envPath)
        if (fs.existsSync(envPath)) {
            const envjs = fs.readFileSync(envPath).toString();
            const newEnvjs = lodash.template(envjs, { interpolate: /\({([\s\S]+?)}\)/g })({
                // 环境配置
                env: JSON.stringify(env, null, 4),
                // 全局数据
                global: JSON.stringify(global, null, 4),
            });
            fs.writeFileSync(envPath, newEnvjs);
        } else {
            console.log()
            console.log("LENG: env.config.js 未找到配置文件 请检查路径")
            console.log()
        }
    } catch (error) {
        console.log("env failed", error);
    }
}
/**
 * 写入环境配置 备注 MD 文件
 * @param {*} env 
 * @param {*} dir 
 * @param {*} global 
 */
function writeFileSyncMD(env, dir, global = {}) {
    try {
        const envPath = path.join(dir, 'README.md');
        if (fs.existsSync(envPath)) {
            const envjs = fs.readFileSync(envPath).toString();

            const newEnvjs = lodash.template(envjs, { interpolate: /\({([\s\S]+?)}\)/g })({
                // 环境配置
                env: JSON.stringify(env, null, 4),
                // 全局数据
                global: JSON.stringify(global, null, 4),
                // process: JSON.stringify(process.env, null, 4),
            });
            fs.writeFileSync(envPath, newEnvjs);
        }
    } catch (error) {
        console.log("env failed", error);
    }
}
module.exports.writeFileSync = writeFileSync;
module.exports.writeFileSyncMD = writeFileSyncMD;