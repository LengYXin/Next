import { observable, computed, action } from 'mobx';
import { create, persist } from 'mobx-persist';

class Locale {
    // constructor() {
    //     this.hydrate('xt_locale', this).then(() => {

    //     });
    // // }
    // private hydrate = create({
    //     // storage: window.localStorage,   // or AsyncStorage in react-native.
    //     // default: localStorage
    //     // jsonify: true  // if you use AsyncStorage, here shoud be true
    //     // default: true
    // });
    // @persist
    @observable
    locale = 'zh';
    @action.bound
    onLocaleChanges(locale) {
        this.locale = locale;
    }
}
export default new Locale()