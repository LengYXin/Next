import Vue from 'vue'
import VueI18n from 'vue-i18n'
import getlocales from '@xt/client/languages';
import { Context } from '@nuxt/types';
Vue.use(VueI18n)
// Vue.prototype.$locale = locale;
// declare module 'vue/types/vue' {
//     interface Vue {
//         /** locale */
//         $locale: typeof locale;
//     }
// }
export default ({ app, store }: Context) => {
    // Set i18n instance on app
    // This way we can use it in middleware and pages asyncData/fetch
    // console.log("LENG: locale.locale", locale.locale)
    app.i18n = new VueI18n({
        locale: store.$locale.locale,
        fallbackLocale: 'zh',
        messages: getlocales({})
    })

    //   app.i18n.path = (link) => {
    //     if (app.i18n.locale === app.i18n.fallbackLocale) {
    //       return `/${link}`
    //     }
    //     return `/${app.i18n.locale}/${link}`
    //   }
}
