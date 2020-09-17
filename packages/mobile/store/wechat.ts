import Bowser from 'bowser';
import lodash from 'lodash';
import store from './create';
import $global from "./global";
const Wechat = {
    /**
     * 设置微信分享
     * @param params 
     */
    onAppMessageShareData: async (params?: wx.IupdateAppMessageShareData) => {
        if ($global.WechatBowser) {
            (await store.$wechat.onInit()).updateAppMessageShareData(lodash.merge<wx.IupdateAppMessageShareData, wx.IupdateAppMessageShareData>({
                title: '暄桐教室', // 分享标题
                desc: '暄桐的写字课 | 文人式的生活与快乐',//
                link: window.location.href, // 分享链接
                imgUrl: window.location.origin + '/images/logo.png', // 分享图标
                // 用户确认分享后执行的回调函数
                success: () => {
                    console.log('分享成功')
                },
                // 用户取消分享后执行的回调函数
                cancel: () => {
                    console.log('分享失败')
                }
            }, params))
        }
    }
}
Wechat.onAppMessageShareData()
export default Wechat