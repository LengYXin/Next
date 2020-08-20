import { Context } from "@nuxt/types";
import { message } from "ant-design-vue";
import lodash from "lodash";
import "./registerHooks";
console.group('Start')
console.info("LENG: middleware", process.env.NODE_ENV, process.env.version)
export default function (context: Context) {
    // 面包屑
    context.store.$menu.initBreadcrumb(context.route);
    context.store.$storeUser.onToggleVisible(false);
    onLog(context)
    // if (context.route.fullPath === '/') {
    //     return
    // }
    if (lodash.startsWith(context.route.name, 'my')) {
        if (!context.store.$storeUser.loggedIn) {
            // message.success({ content: '请登录' })
            return context.redirect('/')
        }
    }
}
function onLog(context: Context) {
    if (context.from) {
        if (context.from.name !== context.route.name) {
            console.clear();
            console.group('Route', context.route);
            console.info("LENG: middleware", process.env.NODE_ENV, process.env.version);
            console.log("LENG: context", context);
            console.groupEnd();
        }
    }

}