/// <reference types="./message" />
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { AjaxBasics } from "../../helpers/ajaxBasics";
import { SocketMessageQueue } from "./queue";
import lodash from "lodash";

export class SocketMessage {
    constructor(protected $ajax: AjaxBasics) {

    }
    options = {
        connectUrl: `/ws/pre-connect/{chan}`,
        joinUrl: '/channels/join',
        sendUrl: '/channels/send',
    }
    get protocol() {
        return 'wss:'//window.location.protocol === "http:" ? 'ws:' : 'wss:'
    }
    /**
     * 消息队列
     * @memberof SocketMessage
     */
    MessageQueue = new SocketMessageQueue<SocketMessage.MessageContent>();
    WebSocketSubject: WebSocketSubject<any>
    async onLink(chan) {
        const res = await this.$ajax.post<any>(this.options.connectUrl, { chan });
        await this.$ajax.post(this.options.joinUrl, { ...res, chan })
        this.WebSocketSubject = webSocket(`${this.protocol}${res.imServer}`);
        this.onSubscribe()
    }
    onSubscribe() {
        this.WebSocketSubject.subscribe(msg => {
            this.MessageQueue.onAnalysis(msg)
        });
    }
    /**
     * 发送富文本消息
     * @param content 
     */
    async onSendRichTxt(content: SocketMessage.MessageContent) {
        await this.$ajax.post<any>(this.options.sendUrl, {
            senderId: "6a757a92-693b-419b-9063-aac86b2b0121",
            chan: "123",
            msg: lodash.merge<SocketMessage.MessageContent, SocketMessage.MessageContent>({
                type: MessageType.chan_msg,
                content: { type: ContentType.richTxt }
            }, content)
        });
    }
}
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
export default SocketMessage;
