import lodash from "lodash"
import { BindAll } from "lodash-decorators"
import { EnumApiMy } from "../../api"
import { AjaxBasics } from "../../helpers/ajaxBasics"
import { Pagination } from "../basics/pagination"
import Entities from "./entities"
import MyWork from "./myWork"

@BindAll()
export class ControllerMy extends Entities {
  constructor(protected $ajax: AjaxBasics) {
    super()
  }
  /**
   * 晒作业
   * @memberof ControllerMy
   */
  MyWork = new MyWork(this.$ajax)

  async onGetMyCourseList() {
    const res = await this.$ajax.post(EnumApiMy.MyCourseList, {
      typeKey: 0,
      pageIndex: 1,
    })
    this.setMyCourseList(res)
  }
}
export default ControllerMy
