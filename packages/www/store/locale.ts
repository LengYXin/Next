import { observable, computed, action, intercept } from 'mobx';
import { create, persist } from 'mobx-persist';
import moment from 'moment';
import getlocales, { EnumLocaleLinks, EnumLocaleDescriptions } from '@xt/client/languages';
import Vue from 'vue';
class Locale {
    constructor() {
        intercept(this, 'locale', locale => {
            moment.locale({ zh: 'zh-cn', en: 'en' }[locale.newValue])
            return locale
        })
    }
    localeMessages = getlocales();
    EnumLocaleLinks = EnumLocaleLinks;
    @observable
    locale = 'zh';
    @action.bound
    onLocaleChanges(locale: 'zh' | 'en') {
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