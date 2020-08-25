import { action, observable } from 'mobx';


export default class EntitiesVideo {
    constructor() {
    }
    /**
     * 课程详情
     * @memberof EntitiesVideo
     */
    @observable
    details: any = {};
    /**
     * 设置详情
     * @param details 
     */
    @action.bound
    protected setDetails(details) {
        this.details = details;
    }
}
