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
        this.onInspectVersion()
    }
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
    version = process.env.version;
    /**
     *生产环境
     * @memberof XTGlobal
     */
    production = process.env.DEPLOY_ENV === 'pro' //&& process.env.NODE_ENV === "production";
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
