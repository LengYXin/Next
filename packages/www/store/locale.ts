/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:13:07
 * @modify date 2020-08-05 14:13:07
 * @desc [description]
 */
import getlocales, { EnumLocaleLinks } from '@xt/client/languages';
import { action, intercept, observable } from 'mobx';
import moment from 'moment';
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