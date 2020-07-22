import 'nprogress/nprogress.css'
import "./clientConfig"
import "./icon"
import "./usePlugins/ant"
import "./usePlugins/lazyload"
import "./usePlugins/swiper"
import i18n from "./usePlugins/i18n"
export default (nuxt) => {
    i18n(nuxt)
}
