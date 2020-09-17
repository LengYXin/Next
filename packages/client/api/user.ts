/*
 * @Author: Erlin
 * @CreateTime: 2020-08-12 14:38:30
 * @LastEditors: Erlin
 * @LastEditTime: 2020-09-17 19:48:49
 * @Description:
 */
/**
 *  User api 枚举
 */
export enum EnumApiUser {
  /** 登录 */
  Login = "/user/loginbypassword",
  /** 用户信息 */
  Userinfo = "/user/getuserinfo",
  /** 更新昵称 */
  UpdateNickName = "/user/updatenickname",
  /** 查找国家 */
  SearchCountry = "/utility/searchcountry",
  /** 查找省份 */
  SearchProvince = "/utility/searchprovince",
  /** 查找市 */
  SearchCity = "/utility/searchcity",
  /** 更新用户信息 */
  UpdateUserInfo = "/user/updateuserinfo",
  /** 更新密码 */
  UpdatePassword = "/user/updatepassword",
  /** 发送短信 */
  SendSms = "/send/sendSms",
  /** 检测验证码是否正确 */
  CheckConfirmCode = "/user/checkConfirmCode",
}
