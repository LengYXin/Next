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
}
export default ControllerMyWork
