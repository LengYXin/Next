/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-09-25 15:58:14
 * @modify date 2020-09-25 15:58:14
 * @desc [description]
 */
declare module SocketMessage {
    enum MessageType {
         /** 私聊消息 */
         pri_msg = 'pri_msg',
         /** 群消息 */
         chan_msg = 'chan_msg',
         /** 系统消息 */
         sys_notice = 'sys_notice',
         /** 教室通知 */
         cr_notice = 'cr_notice',
    }
    enum ContentType {
        /** 上线 */
        online = 'online',
        /** 下线 */
        offline = 'offline',
        /** 进入直播间 */
        joinChan = 'joinChan',
        /** 离开直播间 */
        leaveChan = 'leaveChan',
        /** 开始直播 */
        biginLive = 'biginLive',
        /** 结束直播 */
        endLive = 'endLive',
        /** 禁言 */
        mute = 'mute',
        /** 关闭禁言 */
        closeMute = 'closeMute',
        /** 直播间禁言 */
        chanMute = 'chanMute',
        /** 关闭直播间禁言 */
        closeChanMute = 'closeChanMute',
        /** 纯文本 */
        txt = 'txt',
        /** 富文本 */
        richTxt = 'richTxt',
        /** 图片 */
        img = 'img',
        /** 视频 */
        video = 'video',
        /** 图文消息 */
        imgTxt = 'imgTxt',
    }
    interface Content {
        type?: ContentType | string;
        content?: string;
        thumb?: string;
        origin?: string;
        size?: number;
        width?: number;
        height?: number;
        cover?: string;
        video?: string;
        duration?: string;
        name?: string;
        title?: string;
        img?: Array<string>;
        jumpUrl?: string;
        extra?: any;
        [key: string]: any;
    }
    interface MessageContent {
        msgId?: string;
        type?: MessageType | BizType;
        senderId?: string;
        nickName?: string;
        header?: string;
        time?: number;
        chan?: string;
        content?: Content;
    }
}
