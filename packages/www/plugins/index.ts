/// <reference types="@nuxt/types" />
import { Context } from "@nuxt/types";
import 'nprogress/nprogress.css';
import "./clientConfig";
import "./icon";
import "./usePlugins/ant";
import i18n from "./usePlugins/i18n";
import "./usePlugins/lazyload";
import "./usePlugins/swiper";
// import { Context, Middleware, Transition, NuxtApp } from './index'
export default (context: Context) => {
    console.log("LENG: context", context)
    i18n(context)
}
