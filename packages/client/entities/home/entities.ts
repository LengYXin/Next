import { observable, computed, action } from 'mobx';
import { create, persist } from 'mobx-persist';
import { Subject, Subscription } from 'rxjs';
import { AjaxRequest } from 'rxjs/ajax';
import lodash from 'lodash';


export default class EntitiesHome {
    constructor() {
       
    }
    /**
     * 轮播图
     * @type {Array<{}>}
     * @memberof EntitiesHome
     */
    @observable
    Banners: Array<IBanners> = [];
    @action.bound
    protected setBanners(Banners) {
        this.Banners = Banners;
    }
}
export interface IBanners {
    id: string;
    pictureJumpUrl: string;
    pictureUri: string;
}