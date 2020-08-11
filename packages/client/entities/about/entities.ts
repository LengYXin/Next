import { observable, computed, action } from 'mobx';
import { create, persist } from 'mobx-persist';
import { Subject, Subscription } from 'rxjs';
import { AjaxRequest } from 'rxjs/ajax';
import lodash from 'lodash';

interface tabs { key: any, title: string }
export default class EntitiesAbout {
    constructor() {
    }
    /**
     * 文房类型列表
     * @type {Array<{}>}
     * @memberof EntitiesAbout
     */
    @observable
    typelist: Array<tabs> = [];
    @action.bound
    protected setTypelist(typelist: Array<tabs>) {
        this.typelist = typelist;
        return typelist
    }
    /**
     * 课程详情
     * @memberof EntitiesAbout
     */
    @observable
    details: any = {};
    @action.bound
    protected setDetails(details) {
        this.details = details;
    }
}
