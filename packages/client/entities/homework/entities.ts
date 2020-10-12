import { observable, computed, action } from "mobx"
import { create, persist } from "mobx-persist"
import { Subject, Subscription } from "rxjs"
import { AjaxRequest } from "rxjs/ajax"
import lodash from "lodash"

interface tabs {
  key: any
  title: string
}
export default class EntitiesHomework {
  constructor() {}
  /**
   * 作业详情
   * @memberof EntitiesHomework
   */
  @observable
  detail: any = {}
  @action.bound
  protected setDetail(detail) {
    this.detail = detail
  }
}
