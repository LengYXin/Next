/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:12:45
 * @modify date 2020-08-05 14:12:45
 * @desc [description]
 */
/// <reference types="@nuxt/types" />
import { Context } from "@nuxt/types";
import "~/components/index";
import "./icon";
import "./usePlugins/alife-logger";
import "./usePlugins/ant";
// import i18n from "./usePlugins/i18n";
import "./usePlugins/lazyload";
// import "./usePlugins/swiper";
export default (context: Context) => {
    console.log("LENG: context", context)
    // i18n(context)
    console.groupEnd()
}