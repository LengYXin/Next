/*
 * @Author: Erlin
 * @CreateTime: 2020-09-01 18:28:10
 * @LastEditors: Erlin
 * @LastEditTime: 2020-09-06 18:16:32
 * @Description: 我的作业
 */
import { BindAll } from "lodash-decorators"
import { EnumApiMy } from "../../api"
import { AjaxBasics } from "../../helpers/ajaxBasics"
import { Pagination } from "../basics/pagination"
import { EntitiesBasics } from "../basics/entities"
import { toJS } from "mobx"
/**
 * 我的作业
 * @export
 * @class ControllerMyWork
 * @extends {Pagination<any>}
 */
@BindAll()
export class ControllerMyWork extends Pagination<any> {
  constructor($ajax: AjaxBasics) {
    super($ajax, {
      url: EnumApiMy.MyHomeworkList,
      key: "homeworkFinishId",
      onMapValues: "list",
      method: "post",
      infinite: true,
      currentKey: "pageIndex",
    })
  }

  /**
   * 晒作业详情
   * @memberof ControllerMyWork
   */
  Details = new EntitiesBasics<any>(this.$ajax, {
    url: EnumApiMy.MyHomeworkDetail,
  })

  /**
   * 晒作业
   */
  async onSunWork(data) {
    if (data.suned !== 0) {
      throw "作业已经晒出了"
    }
    this.onUpdate(data, (old) => {
      old.suned = 1
      return old
    })
    return this.$ajax.post(EnumApiMy.SunHomework, {
      courseType: 1,
      homeworkId: data.homeworkFinishId,
    })
  }
  /**
   * 删除作业
   */
  async onDelWork(data) {
    this.onRemove(data)
    return this.$ajax.post(EnumApiMy.DelHomework, {
      id: data.homeworkFinishId,
    })
  }

  /**
   * 回复助教
   */
  async onReply(body: {
    courseId?
    homeworkId?
    replyContent?
    replyContentNum?
  }) {
    return this.$ajax.post(EnumApiMy.MyHomeworkReply, body)
  }
}
export default ControllerMyWork
