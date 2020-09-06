/*
 * @Author: Erlin
 * @CreateTime: 2020-09-06 18:15:02
 * @LastEditors: Erlin
 * @LastEditTime: 2020-09-06 18:34:14
 * @Description: 我晒出的作业列表
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
}
export default ControllerMySunWork
