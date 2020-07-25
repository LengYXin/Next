import { observable, computed, action } from 'mobx';
import { create, persist } from 'mobx-persist';
import getlocales from '@xt/client/languages';
class Locale {
    localeMessages = getlocales()
    @observable
    locale = 'zh';
    @action.bound
    onLocaleChanges(locale) {
        this.locale = locale;
    }
}
export default new Locale()