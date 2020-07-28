import { observable, computed, action } from 'mobx';
import { create, persist } from 'mobx-persist';
import { Subject, Subscription } from 'rxjs';
import { AjaxRequest } from 'rxjs/ajax';
import lodash from 'lodash';


export default class EntitiesVideo {
    constructor() {
    }
    /**
     * 课程详情
     * @memberof EntitiesVideo
     */
    @observable
    details: any = {};
    @action.bound
    protected setDetails(details) {
        this.details = details;
    }
}
