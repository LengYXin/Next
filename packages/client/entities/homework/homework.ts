/*
 * @Author: Erlin
 * @CreateTime: 2020-09-01 18:28:10
 * @LastEditors: Erlin
 * @LastEditTime: 2020-10-12 10:46:14
 * @Description: 我的作业
 */
import { BindAll } from "lodash-decorators"
import { EnumApiHomework } from "../../api"
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
      url: EnumApiHomework.HomeworkList,
      onMapValues: (res) => {
        return { dataSource: res }
      },
      key: "id",
      method: "post",
      infinite: true,
      currentKey: "pageIndex",
    })
  }
  /**
   * 交作业
   */
  async onHomeworkAdd(body: {
    classhourId: "352"
    content: "<p>作业01</p>"
    contentNum: 5
    courseId: "29"
    courseType: 1
    homeworkAssignId?
    homeworkTypeId: 1
    isSun: false
    picList: []
  }) {
    await this.$ajax.post(EnumApiHomework.HomeworkAdd, body)
  }

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
      homeworkId = data.homeworkFinishId
      this.onUpdate(data, updater)
      return this.$ajax.post(EnumApiHomework.HomeworkSun, {
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
    await this.$ajax.post(EnumApiHomework.HomeworkDelete, {
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
    return this.$ajax.post(EnumApiHomework.HomeworkReply, body)
  }
}
export default ControllerMyWork
