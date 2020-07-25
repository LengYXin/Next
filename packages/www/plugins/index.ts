/// <reference types="@nuxt/types" />
import { Context } from "@nuxt/types";
import "./directives";
import "./icon";
import "./usePlugins/ant";
import i18n from "./usePlugins/i18n";
import "./usePlugins/lazyload";
import "./usePlugins/swiper";
export default (context: Context) => {
    console.log("LENG: context", context)
    i18n(context)
    console.groupEnd()
}