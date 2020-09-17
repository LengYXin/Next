import Bowser from 'bowser';
import lodash from 'lodash';
import store from './create';
import $global from "./global";
const Wechat = {
    onMerge(params) {
        return lodash.merge<wx.IupdateAppMessageShareData, wx.IupdateAppMessageShareData>({
            title: '暄桐教室', // 分享标题
            desc: '暄桐的写字课 | 文人式的生活与快乐',//
            link: window.location.href, // 分享链接
            imgUrl: window.location.origin + '/images/logo.png', // 分享图标
        }, params);
    },
    /**
     * 设置微信分享
     * @param params 
     */
    onAppMessageShareData: async (params?: wx.IupdateAppMessageShareData) => {
        if ($global.WechatBowser) {
            // 等待 认证完成 执行
            (await store.$wechat.onInit()).updateAppMessageShareData(Wechat.onMerge(params))
        }
    },
    /**
     * 创建 分享 数据 并且格式化成 meta 标签
     * @param params 
     */
    onCreateShareData(params?: wx.IupdateAppMessageShareData) {
        Wechat.onAppMessageShareData(params)
        params = Wechat.onMerge(params);
        return {
            title: params.title,
            meta: [
                {
                    hid: "wechat_desc",
                    name: "description",
                    content: params.desc,
                },
            ],
        };
    }
}
// Wechat.onAppMessageShareData()
export default Wechat