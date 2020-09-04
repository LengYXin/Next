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

  /**
   * 获取我的课程列表
   * typeKey 0：全部，1：学习中，2：已学完，3：收藏
   */
  async onGetMyCourseList() {
    const res = await this.$ajax.post(EnumApiMy.MyCourseList, {
      typeKey: 0,
    })
    this.setMyCourseList(lodash.get(res, "userCourseFullResponseVos", []))
  }
}
export default ControllerMy
