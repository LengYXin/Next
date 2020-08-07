import lodash from 'lodash';
import { BindAll } from 'lodash-decorators';
import { EnumApiUser } from '../../api';
import { AjaxBasics } from '../../helpers/ajaxBasics';
import { Pagination } from '../basics/pagination';
import Entities from './entities';
import cryptoMd5 from 'crypto-js/md5';
import { toJS } from 'mobx';

@BindAll()
export class ControllerUser extends Entities {
    constructor(protected $ajax: AjaxBasics) {
        super()
    }
    /**
     * 登录
     * @param itcode 
     * @param passworid 
     */
    async onLogin(itcode, password) {
        this.onToggleLoading(true);
        try {
            const res = await this.$ajax.post(EnumApiUser.Login, { account: itcode, password });
            const user = {
                appid: '48832f76dc1411e898f900163e048dd6',
                timestamp: Date.now(),
                password: '6581a04d-dc14-11e8-98f9-00163e048dd6',
                token: res,
                signature: ''
            };
            this.onToggleLoading(false)
            this.setUserInfo(user);
        } catch (error) {
            this.onToggleLoading(false)
            console.error("LENG: ControllerUser -> onLogin -> error", error)
        }
    }
    /**
     * 退出登录状态
     */
    onOutLogin() {
        this.setUserInfo({});
    }
    onSignatureUser() {
        if (!this.loggedIn) {
            return
        }
        const user = toJS(this.UserInfo);
        user.timestamp = Date.now();
        // const str='appid48832f76dc1411e898f900163e048dd6password6581a04d-dc14-11e8-98f9-00163e048dd6timestamp1596724426013token1e2a5c0b32b94434b66f2eefc864ecd4'
        const str = `appid${user.appid}password${user.password}timestamp${user.timestamp}token${user.token}`;
        user.signature = lodash.toUpper(cryptoMd5(str).toString())
        // console.log("LENG: ControllerUser -> onSignatureUser -> user", str, user)
        return user
    }
}
export default ControllerUser
// export const getRequestData = () => {
//     let token = getToken();
//     //无token直接返回空对象
//     if (!token) {
//       return {};
//     }
//     let data = {
//       appid: "48832f76dc1411e898f900163e048dd6",
//       password: "6581a04d-dc14-11e8-98f9-00163e048dd6",
//       token: token,
//       timestamp: new Date().valueOf()
//     };
//     let signature = getSignature(data);
//     //获取signature后删除password
//     delete data.password;
//     return { ...data, signature };
//   };

//   //获取sinagture 传入数组
//   export const getSignature = data => {
//     //按照appid，password，timestamp，token的排序进行md5加密
//     let str = `appid${data.appid}password${data.password}timestamp${data.timestamp}token${data.token}`;
//     return MD5(str).toUpperCase();
//   };