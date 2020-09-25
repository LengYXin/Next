/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-09-25 15:58:08
 * @modify date 2020-09-25 15:58:08
 * @desc [description]
 */
/// <reference types="./message" />
import lodash from "lodash";
import { BindAll } from "lodash-decorators";
import { Observable } from "rxjs";
import { delay, filter } from "rxjs/operators";
import { webSocket, WebSocketSubject } from "rxjs/webSocket";
import { AjaxBasics } from "../../helpers/ajaxBasics";
import { SocketMessageQueue } from "./queue";
@BindAll()
export class SocketMessage {
    constructor(protected $ajax: AjaxBasics, protected $socketAjax: AjaxBasics) {

    }
    imServer = '';
    wsId = '';
    chan = '';
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
    /**
     * Socket
     * @type {WebSocketSubject<SocketMessage.MessageContent>}
     * @memberof SocketMessage
     */
    WebSocketSubject: WebSocketSubject<SocketMessage.MessageContent>;
    /**
     * 消息 Observable
     * @type {Observable<SocketMessage.MessageContent>}
     * @memberof SocketMessage
     */
    MessageObservable: Observable<SocketMessage.MessageContent>;
    /**
     * 建立链接
     * @param chan 
     */
    async onLink(chan) {
        this.chan = chan;
        const res = await this.$socketAjax.post<any>(this.options.connectUrl, { chan });
        this.wsId = res.wsId;
        this.imServer = res.imServer;
        await this.$socketAjax.post(this.options.joinUrl, { ...res, chan })
        this.WebSocketSubject = webSocket({
            url: `${this.protocol}${res.imServer}`,
            deserializer: e => {
                try {
                    return JSON.parse(e.data);
                } catch (error) {
                    console.log("LENG: SocketMessage -> onLink -> error", error)
                }
            }
        });
        this.MessageObservable = this.WebSocketSubject.pipe(
            // catchError((err) => of(err)),
            // 过滤消息
            filter<SocketMessage.MessageContent>((msg) => {
                try {
                    // console.warn("LENG: SocketMessage -> ", msg)
                    const msgType = lodash.get(msg, 'type');
                    const ctnType = lodash.get(msg, 'content.type');
                    const ischan_msg = lodash.includes([MessageType.chan_msg], msgType);
                    const isCtn = lodash.includes([ContentType.txt, ContentType.richTxt], ctnType);
                    return ischan_msg && isCtn
                } catch (error) {
                    console.log("LENG: SocketMessage  -> error", error)
                }
                return false
            }),
            // delay(100)
        );
        this.onSubscribeonMessage()
    }
    /**
     * 订阅消息
     */
    onSubscribeonMessage() {
        this.MessageObservable.subscribe(msg => {
            // lodash.defer(() => {
            this.MessageQueue.onAnalysis(msg)
            // })
        });
    }
    /**
     * 发送富文本消息
     * @param content 
     */
    async onSendRichTxt(content: SocketMessage.MessageContent) {
        await this.$socketAjax.post<any>(this.options.sendUrl, {
            senderId: this.wsId,
            chan: this.chan,
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
