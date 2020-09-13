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
module.exports = {
    generate: {
        done({ options }) {
            try {
                const envPath = path.join(options.generate.dir, 'env.config.js');
                if (fs.existsSync(envPath)) {
                    const envjs = fs.readFileSync(envPath).toString();
                    const newEnvjs = lodash.template(envjs, { interpolate: /\({([\s\S]+?)}\)/g })({
                        env: JSON.stringify(options.env, null, 4)
                    });
                    fs.writeFileSync(envPath, newEnvjs);
                }
            } catch (error) {
                console.log("env failed", error);
            }
        }
    }
}