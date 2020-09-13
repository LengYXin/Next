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
}
