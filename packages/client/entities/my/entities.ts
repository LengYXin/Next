import { observable, computed, action } from "mobx"
import { create, persist } from "mobx-persist"
import { Subject, Subscription } from "rxjs"
import { AjaxRequest } from "rxjs/ajax"
import lodash from "lodash"
export default class EntitiesMy {
  constructor() {}
  /**
   * 课程详情
   * @memberof EntitiesMy
   */
  @observable MyCourseList: any = []
  @observable SingleList: any = []
  @observable FullList: any = []
  @action.bound
  protected setMyCourseList(list) {
    this.MyCourseList = list
    let singleList = []
    let fullList = []
    lodash.forEach(list, (item) => {
      if (!item.isFull) {
        singleList = lodash.concat(singleList, item.userCourseSingleResponseVos)
      } else {
        fullList.push(item)
      }
    })
    this.SingleList = singleList
    this.FullList = fullList
  }
}
