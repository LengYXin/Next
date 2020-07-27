const lodash = require('lodash');
const path = require('path');
const fs = require('fs');
module.exports = {
    middleware: 'auth',
    extendRoutes(routes, resolve) {
        // 删除 非 page 生成的路由
        lodash.remove(routes, route => /[\\/](view|views)[\\/]|\.(ts)/.test(route.component));
        // 生成可视化 路径文件 参考 使用
        fs.writeFile(path.resolve(process.cwd(), '_routers.json'), JSON.stringify(routes, null, 4), (err) => {
            console.log(err)
        });
    }
}