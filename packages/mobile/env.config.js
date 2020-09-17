const config = require('@xt/client/config/env.config');
const lodash = require('lodash');
const production = process.env.NODE_ENV === 'production';
// 环境配置
module.exports = lodash.merge(config, {
    base: production ? '/mobile/' : '/'
})