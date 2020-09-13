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
        this.SuccessSubject.next()
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
