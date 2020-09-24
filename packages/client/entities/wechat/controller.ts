import cryptoSha1 from 'crypto-js/sha1';
import lodash from "lodash";
import { BindAll } from "lodash-decorators";
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { EnumApiCurrency } from '../../api';
import { Encryption } from '../../helpers';
import { AjaxBasics } from "../../helpers/ajaxBasics";
@BindAll()
export class ControllerWechat {
  constructor(protected $ajax: AjaxBasics, protected appId) {
  }
  /**
   * 微信授权后 返回 信息
   * @type {*}
   * @memberof ControllerWechat
   */
  AccessInfo: any = {

  };
  WeixinJSBridge = wx;
  isReady = false;
  loading = false;
  jsApiList = [
    'updateAppMessageShareData',
    'updateTimelineShareData',
    // 'onMenuShareWeibo',
    // 'onMenuShareQZone',
    // 'startRecord',
    // 'stopRecord',
    // 'onVoiceRecordEnd',
    // 'playVoice',
    // 'pauseVoice',
    // 'stopVoice',
    // 'onVoicePlayEnd',
    // 'uploadVoice',
    // 'downloadVoice',
    // 'chooseImage',
    // 'previewImage',
    // 'uploadImage',
    // 'downloadImage',
    // 'translateVoice',
    // 'getNetworkType',
    // 'openLocation',
    // 'getLocation',
    // 'hideOptionMenu',
    // 'showOptionMenu',
    // 'hideMenuItems',
    // 'showMenuItems',
    // 'hideAllNonBaseMenuItem',
    // 'showAllNonBaseMenuItem',
    // 'closeWindow',
    // 'scanQRCode',
    // 'chooseWXPay',
    // 'openProductSpecificView',
    // 'addCard',
    // 'chooseCard',
    // 'openCard'
  ]
  Promise: Promise<any>;
  /**
   * 初始化
   * @param appId 
   */
  async onInit(debug = false) {
    try {
      if (this.isReady) {
        return this.WeixinJSBridge
      }
      if (!this.loading) {
        this.loading = true;
        this.Promise = this.$ajax.request<string>({ url: EnumApiCurrency.WechatTicket, method: "post" }).pipe(
          map(res => {
            try {
              return lodash.get(JSON.parse(res), 'ticket')
            } catch (error) {
              console.log("LENG: error", error)
            }
          }),
          mergeMap(ticket => {
            this.loading = false;
            return new Observable<boolean>(sub => {
              if (!ticket) {
                sub.error('ticket is null')
                sub.complete()
              }
              const timestamp = new Date().getSeconds().toString();
              const noncestr = Encryption.uniqueId();
              const url = location.href.split('#')[0];
              const signature = cryptoSha1(`jsapi_ticket=${ticket}&noncestr=${noncestr}&timestamp=${timestamp}&url=${url}`).toString();
              const config = {
                debug: debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: this.appId, // 必填，公众号的唯一标识
                timestamp: timestamp, // 必填，生成签名的时间戳
                nonceStr: noncestr, // 必填，生成签名的随机串
                signature: signature,// 必填，签名
                jsApiList: this.jsApiList // 必填，需要使用的JS接口列表
              };
              console.log("LENG: config", config)
              this.WeixinJSBridge.config(config as any);
              this.WeixinJSBridge.ready(() => {
                // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
                // this.WeixinJSBridge.updateAppMessageShareData({
                //   link: window.location.href,
                //   title: '暄桐教室',
                //   imgUrl: 'https://lhyu-bucket.oss-cn-beijing.aliyuncs.com/picturePath/2c8637c3ebe20dd1809372a73230f7bc.blob',
                //   desc: '备注',
                //   success: () => { },
                //   cancel: () => { }
                // })
                sub.next(true)
                sub.complete()
              });
              wx.error(err => {
                sub.error(err)
                sub.complete()
              })
            })
          })
        ).toPromise()
      }
      await this.Promise;
      console.log("LENG: ControllerWechat -> onInit -> ready")
      this.isReady = true;
    } catch (error) {
      console.log("LENG: ControllerWechat -> onInit -> error", error)
      this.isReady = false;
    }
    return this.WeixinJSBridge
  }
  /**
   * 授权 url https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html#0
   * @param redirect_uri 
   */
  getAuthorizeUrl(redirect_uri, scope: 'snsapi_base' | 'snsapi_userinfo' = 'snsapi_userinfo') {
    return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${this.appId}&redirect_uri=${encodeURI(redirect_uri)}&response_type=code&scope=${scope}&state=WXLOGIN#wechat_redirect`
  }
  /**
   *  获取 access_token
   * @param code 
   */
  async onGetAccessToken(code, state) {
    // 已有 openid 
    if (this.AccessInfo.openid) {
      return
    }
    const res = await this.$ajax.post<{ loginSuccess }>(`/wechat/wapcallback`, {
      code,
      state,
      type: 1
    })
    this.AccessInfo = res;
  }
}
export default ControllerWechat
