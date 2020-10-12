import { BindAll } from "lodash-decorators"
import { AjaxBasics } from "../../helpers/ajaxBasics"
import { EnumApiHomework } from "../../api"
import SunDrying from "./sunDrying"
import Details from "./details"
import Homework from "./homework"
import Entities from "./entities"

@BindAll()
export class ControllerHomework extends Entities {
  constructor(protected $ajax: AjaxBasics) {
    super()
  }
  /**
   * 晒作业
   * @memberof ControllerHomework
   */
  SunDrying = new SunDrying(this.$ajax)
  /**
   * 作业详情
   * @memberof ControllerHomework
   */
  Details = new Details(this.$ajax)
  /**
   * 交作业
   */
  Homework = new Homework(this.$ajax)

  /*
   * 获取
   * @memberof ControllerCourse
   */
  async onGetHomeworkDetail(id) {
    const res = await this.$ajax.post(EnumApiHomework.HomeworkDetail, { id })
    return this.setDetail(res)
  }
}
export default ControllerHomework
