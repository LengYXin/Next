import lodash from "lodash"
import { BindAll } from "lodash-decorators"
import { EnumApiCurrency, EnumApiUser } from "../../api"
import { AjaxBasics } from "../../helpers/ajaxBasics"
import { Pagination } from "../basics/pagination"
import Entities from "./entities"
import cryptoMd5 from "crypto-js/md5"
import { toJS } from "mobx"

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
    this.onToggleLoading(true)
    try {
      const res = await this.$ajax.post(EnumApiUser.Login, {
        account: itcode,
        password,
      })
      const user = {
        // appid: '48832f76dc1411e898f900163e048dd6',
        // timestamp: Date.now(),
        // password: '6581a04d-dc14-11e8-98f9-00163e048dd6',
        token: res,
        // signature: ''
      }
      this.onToggleLoading(false)
      this.setUserInfo(user)
      this.onGetUserInfo()
    } catch (error) {
      this.onOutLogin()
      this.onToggleLoading(false)
      // console.error("LENG: ControllerUser -> onLogin -> error", error)
      throw error
    }
  }
  /**
   * 获取用户信息
   */
  async onGetUserInfo() {
    if (!this.loggedIn) {
      return
    }
    const res = await this.$ajax.post(EnumApiUser.Userinfo)
    this.setUserInfo(lodash.merge(toJS(this.UserInfo), res))
  }
  /**
   * 退出登录状态
   */
  onOutLogin() {
    this.setUserInfo({})
  }
  /**
   * 配置授权用户
   */
  onSignatureUser() {
    if (!this.loggedIn) {
      return
    }
    const user = {
      appid: "48832f76dc1411e898f900163e048dd6",
      timestamp: Date.now(),
      password: "6581a04d-dc14-11e8-98f9-00163e048dd6",
      token: this.UserInfo.token,
      signature: "",
    }
    // const str='appid48832f76dc1411e898f900163e048dd6password6581a04d-dc14-11e8-98f9-00163e048dd6timestamp1596724426013token1e2a5c0b32b94434b66f2eefc864ecd4'
    const str = `appid${user.appid}password${user.password}timestamp${user.timestamp}token${user.token}`
    lodash.unset(user, "password")
    user.signature = lodash.toUpper(cryptoMd5(str).toString())
    // console.log("LENG: ControllerUser -> onSignatureUser -> user", str, user)
    return user
  }

  /**
   * 更新密码
   */
  async onUpdatePassword(body: {
    confirmNewPassword?
    newPassword?
    oldPassword?
  }) {
    await this.$ajax.post(EnumApiUser.UpdatePassword, body)
  }

  /**
   * 更新姓名
   */
  async onUpdateNickName(nickName) {
    await this.$ajax.post(EnumApiUser.UpdateNickName, {
      nickName,
    })
    this.setUserInfo(
      lodash.merge(toJS(this.UserInfo), {
        nickName,
      })
    )
  }

  /**
   * 更新个人信息
   */
  async onUpdateUserInfo(body: {
    birthday?
    career?
    careerId?
    cityId?
    countryId?
    education?
    educationId?
    headThumbnailUri?
    headUri?
    industry?
    industryId?
    nickName?
    provinceId?
    sex?
  }) {
    const res = await this.$ajax.post(EnumApiUser.UpdateUserInfo, body)
    this.setUserInfo(lodash.merge(toJS(this.UserInfo), body))
  }

  /**
   * 获取国家
   */
  async onGetCountry() {
    const res: Array<any> = await this.$ajax.post(EnumApiUser.SearchCountry)
    return res
  }
  /**
   * 获取省
   */
  async onGetProvince(id) {
    const res = await this.$ajax.post(EnumApiUser.SearchProvince, { id })
    return res
  }
  /**
   * 获取市
   */
  async onGetCity(id) {
    const res = await this.$ajax.post(EnumApiUser.SearchCity, { id })
    return res
  }

  /**
   * 发送短信验证码
   */
  async onSendSms(phone, type) {
    await this.$ajax.post(EnumApiUser.SendSms, {
      phoneNumList: [phone],
      sendType: type,
    })
  }

  /**
   * 发送邮箱验证码
   */
  async onSendEmail(email, type) {
    await this.$ajax.post(EnumApiUser.SendEmail, {
      emailList: [email],
      sendType: type,
    })
  }

  /**
   * 检测验证码是否正确
   */
  async onCheckConfirmCode(body: {
    findWay?
    confirmCode?
    isExist?: false
    type?
  }) {
    await this.$ajax.post(EnumApiUser.CheckConfirmCode, body)
  }

  /**
   * 修改头像
   */
  async onUpdateAvatar(body) {
    // const res = await this.$ajax.post(EnumApiCurrency.UploadPicture, body, {
    //   "Content-Type": "multipart/form-data",
    //   cache: false,
    //   processData: false,
    //   contentType: false,
    // })
    // console.log("ControllerUser -> updateAvatar -> res", res)
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
