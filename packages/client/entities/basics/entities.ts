import { observable, computed, action } from 'mobx';
import { create, persist } from 'mobx-persist';
import { Subject, Subscription } from 'rxjs';
import { AjaxRequest } from 'rxjs/ajax';
import lodash from 'lodash';


export default class EntitiesBasics {
    constructor() {
    }
    /**
     * 详情
     * @memberof EntitiesBasics
     */
    @observable
    details: any = {};
    @action.bound
    protected setDetails(details) {
        this.details = details;
    }
}
