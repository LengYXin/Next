/*
 * @Author: Erlin
 * @CreateTime: 2020-09-06 18:15:02
 * @LastEditors: Erlin
 * @LastEditTime: 2020-09-26 16:54:01
 * @Description: 我晒出的作业列表
 */

import { BindAll } from "lodash-decorators"
import { EnumApiMy, EnumApiHomework } from "../../api"
import { AjaxBasics } from "../../helpers/ajaxBasics"
import { Pagination } from "../basics/pagination"
import { EnumMessage } from "../../languages"
import { EntitiesBasics } from "../basics/entities"
import { toJS } from "mobx"
/**
 * 我的作业
 * @export
 * @class ControllerMyWork
 * @extends {Pagination<any>}
 */
@BindAll()
export class ControllerMySunWork extends Pagination<any> {
  constructor($ajax: AjaxBasics) {
    super($ajax, {
      url: EnumApiMy.MySunWorkList,
      key: "id",
      method: "post",
      defaultPageSize: 10,
      infinite: true,
      currentKey: "pageIndex",
      onMapValues: "userMomentListResponseVoList",
    })
  }

  // /**
  //  * 我晒出的作业详情
  //  * @memberof ControllerMyWork
  //  */
  // Details = new EntitiesBasics<any>(this.$ajax, {
  //   url: EnumApiMy.MySunWorkDetail,
  // })
  /**
   * 点赞
   * @param data 点赞的数据
   */
  onLikes(data) {
    try {
      if (data.likeRecord) {
        throw EnumMessage.like_error
      }
      this.onUpdate(data, (old) => {
        old.likeCount++
        old.likeRecord = true
        return old
      })
      this.$ajax.post(EnumApiHomework.Momentlike, { momentId: data.id })
    } catch (error) {
      throw error
    }
  }

  /**
   * 删除作业
   */
  async onDelWork(momentId: string) {
    await this.$ajax.post(EnumApiMy.DelSunWork, {
      momentId,
    })
    this.onRemove(momentId)
  }
}
export default ControllerMySunWork
