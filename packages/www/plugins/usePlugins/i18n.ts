/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:12:31
 * @modify date 2020-08-05 14:12:31
 * @desc [description]
 */
import { Context } from '@nuxt/types';
import Vue from 'vue';
import VueI18n from 'vue-i18n';
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
        messages: store.$locale.localeMessages
    })

    //   app.i18n.path = (link) => {
    //     if (app.i18n.locale === app.i18n.fallbackLocale) {
    //       return `/${link}`
    //     }
    //     return `/${app.i18n.locale}/${link}`
    //   }
}
