import { observable, computed, action } from "mobx";
import { create, persist } from "mobx-persist";
import { Subject, Subscription } from "rxjs";
import { AjaxRequest } from "rxjs/ajax";
import lodash from "lodash";

export default class EntitiesCourse {
  constructor() {}
  // /**
  //  * 课程列表
  //  * @type {Array<{}>}
  //  * @memberof EntitiesCourse
  //  */
  // @observable
  // dataSource: Array<any> = null;
  // @action.bound
  // protected setDataSource(dataSource) {
  //     this.dataSource = dataSource;
  // }
  /**
   * 课程详情
   * @memberof EntitiesCourse
   */
  @observable
  details: CourseDetails = {};
  @action.bound
  protected setDetails(details: CourseDetails) {
    this.details = details;
  }
}
