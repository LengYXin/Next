import { observable, computed, action } from 'mobx';
import { create } from 'mobx-persist';
import { Subject, Subscription } from 'rxjs';
import { AjaxRequest } from 'rxjs/ajax';
import lodash from 'lodash';


export default class EntitiesUser {
    constructor() {

    }
    /**
     * 用户信息
     * @memberof EntitiesStationery
     */
    @observable
    UserInfo: any = {};
    @action.bound
    protected setUserInfo(info) {
        this.UserInfo = info;
    }
    /**
     * 登录状态
     * @readonly
     * @memberof EntitiesUser
     */
    @computed
    get loggedIn() {
        return true
    }
}
