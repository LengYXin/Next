/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:29:17
 * @modify date 2020-08-05 14:29:17
 * @desc 扩展路由 请勿随便更改
 */
const lodash = require('lodash');
const path = require('path');
const fs = require('fs');
module.exports = {
    middleware: 'auth',
    extendRoutes(routes, resolve) {
        // 删除 非 page 生成的路由
        const remRoutes = lodash.remove(routes, route => /[\\/](view|views|children)[\\/]|\.(ts)/.test(route.component));
        routes = lodash.map(routes, route => {
            // 查找当前有 children 页面
            const children = lodash.filter(remRoutes, rem => {
                if (lodash.startsWith(rem.name, `${route.name}-children`)) {
                    if (!/[\\/](view|views)[\\/]|\.(ts)/.test(rem.component)) {
                        return true
                    }
                }
                return false
            });
            if (children && children.length > 0) {
                lodash.set(route, 'children', lodash.map(children, item => {
                    const path = `/${route.name}/children`;
                    // index 页面
                    if (lodash.eq(item.path, path)) {
                        item.name = route.name;
                        lodash.unset(route, 'name');
                        item.path = "";
                    } else {
                        item.name = lodash.replace(item.name, '-children', '');
                        item.path = lodash.replace(item.path, `${route.path}/children/`, '');
                    }
                    return item
                }));
            }
            return route
        })
        // 生成可视化 路径文件 参考 使用
        fs.writeFile(path.resolve(process.cwd(), '_routers.json'), JSON.stringify(lodash.orderBy(routes, ['name']), null, 4), (err) => {
            console.log(err)
        });
        // 生成可视化 路径文件 参考 使用
        // fs.writeFile(path.resolve(process.cwd(), '_remRoutes.json'), JSON.stringify(remRoutes, null, 4), (err) => {
        //     console.log(err)
        // });
    }
}