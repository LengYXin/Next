import { observable, computed, action } from 'mobx';
import { create, persist } from 'mobx-persist';
import getlocales, { EnumLocaleLinks, EnumLocaleDescriptions } from '@xt/client/languages';
import Vue from 'vue';
class Locale {
    localeMessages = getlocales();
    EnumLocaleLinks = EnumLocaleLinks;
    @observable
    locale = 'zh';
    @action.bound
    onLocaleChanges(locale) {
        this.locale = locale;
    }
}
export default new Locale();
Vue.prototype.$EnumLocaleLinks = EnumLocaleLinks;
Vue.prototype.$EnumLocaleDescriptions = EnumLocaleDescriptions;
declare module 'vue/types/vue' {
    interface Vue {
        /** 链接枚举 */
        readonly $EnumLocaleLinks: typeof EnumLocaleLinks;
        /** 说明枚举 */
        readonly $EnumLocaleDescriptions: typeof EnumLocaleDescriptions;
    }
}