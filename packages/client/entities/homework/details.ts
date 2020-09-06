import { BindAll } from "lodash-decorators";
import { EnumApiHomework } from "../../api";
import { AjaxBasics } from "../../helpers/ajaxBasics";
import { EntitiesBasics } from "../basics/entities";
/**
 * 作业详情
 */
@BindAll()
export class HomeworkDetails extends EntitiesBasics<any> {
  constructor(protected $ajax: AjaxBasics) {
    super($ajax, {
      url: EnumApiHomework.Momentdetail
    })
  }
}
export default HomeworkDetails;
