import { Context } from "@nuxt/types";
import { message } from "ant-design-vue";
import "./registerHooks";
console.group('Start')
console.info("LENG: middleware", process.env.NODE_ENV, process.env.version)
export default function (context: Context) {
    onLog(context)
    // if (context.route.fullPath === '/') {
    //     return
    // }
    // if (context.route.fullPath === '/my') {
    //     message.success({ content: '请登录' })
    //     return context.redirect('/')
    // }
}
function onLog(context: Context) {
    if (context.from.name !== context.route.name) {
        console.clear();
        console.group('Route', context.route);
        console.info("LENG: middleware", process.env.NODE_ENV, process.env.version);
        console.log("LENG: context", context);
        console.groupEnd();
    }
}