/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-09-25 15:58:24
 * @modify date 2020-09-25 15:58:24
 * @desc [description]
 */
import { observable, computed, action } from "mobx";
import { Subject } from "rxjs";
import { map, delay, throttleTime } from "rxjs/operators";

export class SocketMessageQueue<T> {
    constructor() {

    }
    SuccessSubject = new Subject();
    /**
     * 数据源
     * @type {Array<T>}
     * @memberof Pagination
     */
    @observable
    private _dataSource: Array<SocketMessage.MessageContent> = [];
    /**
     * 问题
     * @private
     * @type {Array<SocketMessage.MessageContent>}
     * @memberof SocketMessageQueue
     */
    @observable
    private problem: Array<SocketMessage.MessageContent> = [];

    @computed
    get dataSource(): Array<SocketMessage.MessageContent> {
        return [...this._dataSource]
    }
    /**
     * 追加
     * @param item 
     */
    @action
    onPush(msg: SocketMessage.MessageContent) {
        this._dataSource.push(msg);
        this.SuccessSubject.next(msg)
    }
    /**
     * 解析消息
     * @param msg 
     */
    onAnalysis(msg: SocketMessage.MessageContent) {
        // console.log("LENG: SocketMessageQueue<T> -> onAnalysis -> msg", msg)
        this.onPush(msg);
    }
}
export default SocketMessageQueue;
