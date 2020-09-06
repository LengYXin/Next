/*
 * @Author: Erlin
 * @CreateTime: 2020-08-28 17:37:48
 * @LastEditors: Erlin
 * @LastEditTime: 2020-09-06 18:18:02
 * @Description:
 */
/*
 * @Author: Erlin
 * @CreateTime: 2020-08-28 17:37:48
 * @LastEditors: Erlin
 * @LastEditTime: 2020-09-06 11:15:06
 * @Description:
 */
import lodash from "lodash"
import { BindAll } from "lodash-decorators"
import { EnumApiMy } from "../../api"
import { AjaxBasics } from "../../helpers/ajaxBasics"
import { Pagination } from "../basics/pagination"
import Entities from "./entities"
import MyWork from "./myWork"
import MySunWork from "./mySunWork"

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
  MySunWork = new MySunWork(this.$ajax)

  /**
   * 获取我的课程列表
   * typeKey 0：全部，1：学习中，2：已学完，3：收藏
   */
  async onGetMyCourseList(typeKey: any = 0) {
    const res = await this.$ajax.post(EnumApiMy.MyCourseList, { typeKey })
    this.setMyCourseList(lodash.get(res, "userCourseFullResponseVos", []))
  }
}
export default ControllerMy
