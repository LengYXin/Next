import { observable, computed, action } from "mobx";
import { create, persist } from "mobx-persist";
import { Subject, Subscription } from "rxjs";
import { AjaxRequest } from "rxjs/ajax";
import lodash from "lodash";
export default class EntitiesMy {
  constructor() {}
  /**
   * 课程详情
   * @memberof EntitiesMy
   */
  @observable
  MyCourseList: any = {};
  @action.bound
  protected setMyCourseList(list) {
    this.MyCourseList = list;
  }
}
