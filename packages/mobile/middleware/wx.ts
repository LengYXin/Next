import $global from '~/store/global'
import { ajax } from '~/store/ajaxBasics'
import { map } from 'rxjs/operators';
import lodash from 'lodash';
import cryptoSha1 from 'crypto-js/sha1';
import Bowser from 'bowser';
import { Encryption } from '@xt/client';
export default async () => {
    if (lodash.eq($global.userAgent.browser.name, Bowser.BROWSER_MAP.wechat)) {
        // https://mp.weixin.qq.com/debug/cgi-bin/sandbox?t=jsapisign
        const ticket = await ajax.request<string>({ url: "/wechat/wxshare", method: "post" }).pipe(map(res => {
            try {
                return lodash.get(JSON.parse(res), 'ticket')
            } catch (error) {
                console.log("LENG: error", error)
            }
        })).toPromise();
        const timestamp = new Date().getSeconds().toString();
        const noncestr = Encryption.uniqueId();
        const url = location.href.split('#')[0];
        const signature = cryptoSha1(`jsapi_ticket=${ticket}&noncestr=${noncestr}&timestamp=${timestamp}&url=${url}`).toString();
        const config = {
            // debug: !$global.production, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: $global.appid, // 必填，公众号的唯一标识
            timestamp: timestamp, // 必填，生成签名的时间戳
            nonceStr: noncestr, // 必填，生成签名的随机串
            signature: signature,// 必填，签名
            jsApiList: ['updateAppMessageShareData'] // 必填，需要使用的JS接口列表
        };
        console.log("LENG: config", config)
        wx.config(config as any);
        wx.ready(() => {
            // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
            wx.updateAppMessageShareData({
                title: '', // 分享标题
                desc: '', // 分享描述
                link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: '', // 分享图标
                cancel: () => { },
                success: () => {
                    // 设置成功
                }
            })
        });
        wx.error(err => {
            console.log("LENG: err", err)
        })
    }
}