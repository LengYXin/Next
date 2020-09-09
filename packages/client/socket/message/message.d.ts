/**
 * 课程详情
 */
declare module SocketMessage {
    enum MessageType {
        /** 私聊消息 */
        pri_msg = 'pri_msg',
        /** 私聊消息 */
        chan_msg = 'chan_msg',
        /** 私聊消息 */
        sys_notice = 'sys_notice',
        /** 教室通知 */
        cr_notice = 'cr_notice',
        /** 进入直播间 */
        online = 'online',
        /** 离开直播间 */
        offline = 'offline',
        /** 开始直播 */
        biginLive = 'biginLive',
        /** 禁言 */
        mute = 'mute',
        /** 关闭禁言 */
        closeMute = 'closeMute',
        /** 直播间禁言 */
        chanMute = 'chanMute',
        /** 关闭直播间禁言 */
        closeChanMute = 'closeChanMute',
    }
    enum ContentType {
        /** 纯文本 */
        text = 'text',
        /** 富文本 */
        richTxt = 'richTxt',
        /** 图片 */
        img = 'img',
        /** 视频 */
        video = 'video',
        /** 图文消息 */
        imgtxt = 'imgtxt',
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
        type?: MessageType | string;
        senderId?: string;
        nickName?: string;
        header?: string;
        time?: number;
        chan?: string;
        content?: Content;
    }
}
