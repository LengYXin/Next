import { observable, computed, action } from 'mobx';
import { create } from 'mobx-persist';
import { Subject, Subscription } from 'rxjs';
import { AjaxRequest } from 'rxjs/ajax';
import lodash from 'lodash';


export default class EntitiesCourse {
    constructor() {

    }
    /**
     * 课程列表
     * @type {Array<{}>}
     * @memberof EntitiesCourse
     */
    @observable
    dataSource: Array<any> = [];
    @action.bound
    protected setDataSource(dataSource) {
        this.dataSource = dataSource;
    }
}
