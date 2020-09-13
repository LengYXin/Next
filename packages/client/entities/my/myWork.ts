/*
 * @Author: Erlin
 * @CreateTime: 2020-09-01 18:28:10
 * @LastEditors: Erlin
 * @LastEditTime: 2020-09-10 17:32:32
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
   * 回复作业详情
   * @memberof ControllerMyWork
   */
  Details = new EntitiesBasics<any>(this.$ajax, {
    url: EnumApiMy.MyHomeworkDetail,
  })

  /**
   * 晒作业
   */
  async onSunWork(data, list = true) {
    try {
      if (data.suned !== 0) {
        throw "作业已经晒出了"
      }
      const updater = (old) => {
        old.suned = 1
        return old
      }
      let homeworkId
      if (list) {
        homeworkId = data.homeworkFinishId
        this.onUpdate(data, updater)
      } else {
        homeworkId = data.id
        this.Details.onUpdate(updater)
      }
      return this.$ajax.post(EnumApiMy.SunHomework, {
        courseType: 1,
        homeworkId,
      })
    } catch (error) {
      throw error
    }
  }

  /**
   * 删除作业
   */
  async onDelWork(id: string) {
    await this.$ajax.post(EnumApiMy.DelHomework, {
      id,
    })
    this.onRemove(id)
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
