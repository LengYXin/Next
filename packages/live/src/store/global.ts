/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:13:07
 * @modify date 2020-08-05 14:13:07
 * @desc [description]
 */
import { BindAll } from 'lodash-decorators';
import lodash from 'lodash';
import Bowser from 'bowser';
@BindAll()
class XTGlobal {
    constructor() {
        this.onInspectVersion();
        console.log("LENG: XTGlobal -> ", this)
    }
    /**
     * 微信 appid
     * @memberof XTGlobal
     */
    appid = lodash.get(window, '__xt__env.appid', process.env.appid);
    /**
     * domain 域名
     * @memberof XTGlobal
     */
    domain = lodash.get(window, '__xt__env.domain', process.env.domain);
    /**
     * api 地址
     * @memberof XTGlobal
     */
    target = lodash.get(window, '__xt__env.target', process.env.target);
    /**
     * 环境设备信息
     * @memberof XTGlobal
     */
    userAgent = Bowser.parse(window.navigator.userAgent)
    /**
     *   localStorage  前缀 
     * @memberof XTGlobal
     */
    localStorageStartsWith = "__xt_";
    /**
     * 版本信息
     * @memberof XTGlobal
     */
    version = lodash.get(window, '__xt__env.version', process.env.version);
    /**
     * Node env
     * @memberof XTGlobal
     */
    NODE_ENV = lodash.get(window, '__xt__env.NODE_ENV', process.env.NODE_ENV);
    /**
     * 环境
     * @memberof XTGlobal
     */
    DEPLOY_ENV = lodash.get(window, '__xt__env.DEPLOY_ENV', process.env.DEPLOY_ENV);
    /**
     *生产环境
     * @memberof XTGlobal
     */
    get production() {
        return this.DEPLOY_ENV === 'pro'
    }
    /**
     * 检查版本信息 
     */
    onInspectVersion() {
        if (window && window.localStorage) {
            const version = window.localStorage.getItem('version');
            // 清理 版本 不统一缓存
            if (!lodash.eq(version, this.version)) {
                lodash.mapKeys(window.localStorage, (value, key: any) => {
                    if (lodash.startsWith(key, this.localStorageStartsWith)) {
                        window.localStorage.removeItem(key)
                    }
                })
            }
            window.localStorage.setItem('version', this.version)
        }
    }
}
export default new XTGlobal();
