import { Context } from "@nuxt/types";
import "core-js/es";
import lodash from "lodash";
import Bowser from "./utils/bowser";
import "./utils/es6-proxy-polyfill.js";
import "./utils/registerHooks";
// Bowser()
console.group('Start')
console.info("LENG: middleware", process.env.NODE_ENV, process.env.version)
export default function (context: Context) {
    isBowser(context)
    // 面包屑
    context.store.$menu.initBreadcrumb(context.route);
    context.store.$storeUser.onToggleVisible(false);
    onLog(context)
    loggedIn(context)
}
/**
 * 日志
 * @param context 
 */
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
/**
 * 登录状态
 * @param context 
 */
function loggedIn(context: Context) {
    if (lodash.startsWith(context.route.name, 'my')) {
        if (!context.store.$storeUser.loggedIn) {
            // message.success({ content: '请登录' })
            return context.redirect('/')
        }
    }
}
/**
 * 浏览器环境
 * @param context 
 */
function isBowser(context: Context) {
    // 不支持 浏览器
    if (Bowser() && !lodash.startsWith(context.route.name, 'bowser')) {
        return context.redirect('/bowser')
    }
}