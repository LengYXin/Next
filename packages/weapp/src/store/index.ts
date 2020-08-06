
import { ControllerAbout, ControllerCourse, ControllerHome, ControllerStationery, ControllerUser, ControllerVideo } from "@xt/client/entities";
import { create, persist } from 'mobx-persist';
import { ajax, onMergeBody } from "./clientConfig";
const store = {
    $storeHome: new ControllerHome(ajax),
    $storeCourse: new ControllerCourse(ajax),
    $storeStationery: new ControllerStationery(ajax),
    $storeVideo: new ControllerVideo(ajax),
    $storeAbout: new ControllerAbout(ajax),
    $storeUser: new ControllerUser(ajax),
}
console.log("LENG: store", store)
if (process.env.TARO_ENV === "h5") {
    // 模拟登录
    onLogin()
    // 配置缓存
    onCreatePersist();
    // 配置缓存
    function onCreatePersist() {
        // https://github.com/pinqy520/mobx-persist
        const hydrate = create({
            // storage: window.localStorage,   // or AsyncStorage in react-native.
            // default: localStorage
            // jsonify: true  // if you use AsyncStorage, here shoud be true
            // default: true
        });
        // persist({ locale: true })(store.$locale);
        persist({ Banners: { type: 'list' } })(store.$storeHome);
        // hydrate('xt_locale', store.$locale);
        persist({ UserInfo: { type: 'object' } })(store.$storeUser);
        // hydrate('xt_locale', store.$locale);
        hydrate('xt_home', store.$storeHome);
        hydrate('xt_user', store.$storeUser);
    }
    async function onLogin() {
        await store.$storeUser.onLogin('18611752863', 'leng147896325')
        onMergeBody({
            appid: '48832f76dc1411e898f900163e048dd6',
            signature: '6556F212B90709A013411F7B4676E130',
            timestamp: Date.now(),
            token: store.$storeUser.UserInfo.token
        })
    }
}
declare module 'react' {
    interface Component<P> {
        // /**
        //   * 首页状态控制器
        //   */
        // readonly $storeHome: ControllerHome
        // /**
        //  * 课程控制器
        //  */
        // readonly $storeCourse: ControllerCourse
        // /**
        //  * 文房
        //  * @type {ControllerStationery}
        //  * @memberof Store
        //  */
        // readonly $storeStationery: ControllerStationery
        // /**
        //  * 视频
        //  * @type {ControllerStationery}
        //  * @memberof Store
        //  */
        // readonly $storeVideo: ControllerVideo
        // /**
        //  * 关于
        //  * @type {ControllerAbout}
        //  * @memberof Store
        //  */
        // readonly $storeAbout: ControllerAbout
        // readonly props: Readonly<P> & Readonly<{ children?: ReactNode }>&Readonly<{ $storeHome: ControllerHome }>;
    }
}
// 状态 导出
export default store