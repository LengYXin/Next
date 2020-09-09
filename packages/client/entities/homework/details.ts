import { BindAll } from "lodash-decorators"
import { EnumApiHomework } from "../../api"
import { AjaxBasics } from "../../helpers/ajaxBasics"
import { EntitiesBasics } from "../basics/entities"
/**
 * 作业详情
 */
@BindAll()
export class HomeworkDetails extends EntitiesBasics<any> {
  constructor(protected $ajax: AjaxBasics) {
    super($ajax, {
      url: EnumApiHomework.Momentdetail,
    })
  }
  /**
   * 点赞
   * @param data
   */
  async onLikes(data) {
    if (data.likeRecord) {
      throw "您已经点过赞了"
    }
    this.onUpdate((old) => {
      old.likeCount++
      old.likeRecord = true
      return old
    })
    // return this.$ajax.post(EnumApiHomework.Momentlike, { momentId: data.id })
  }
}
export default HomeworkDetails
