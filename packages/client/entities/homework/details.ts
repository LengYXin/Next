import { BindAll } from "lodash-decorators"
import lodash from "lodash"
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
   * 回复
   * @param body 
   */
  async onInstall(body: { content?, contentLength?, momentId?, toCommentId?, toUserId?, toUserNickname?, userType?}) {
    return this.$ajax.post(EnumApiHomework.Momentcomment, body);
  }

  /**
   * 删除回复
   * @param momentCommentId 
   */
  async onDeleteComment(body: { momentCommentId?, momentId?}) {
    this.onUpdate((old) => {
      const dataSource = old.momentComments;
      const result = lodash.remove(dataSource, ['id', body.momentCommentId]);
      old.momentComments = dataSource;
      return old
    })
    return this.$ajax.post(EnumApiHomework.MomentDeletecomment, body)
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
  /**
   * 点赞 评论
   * @param data
   */
  async onLikesComment(data) {
    if (data.likeRecord) {
      throw "您已经点过赞了"
    }
    this.onUpdate((old) => {
      const dataSource = old.momentComments;
      const index = lodash.findIndex(dataSource, ['id', data.id]);
      lodash.updateWith(dataSource, `[${index}]`, com => {
        com.likeCount++
        com.likeRecord = true
        return com
      });
      old.momentComments = dataSource;
      return old
    })
    return this.$ajax.post(EnumApiHomework.MomentLikeComment, { commentId: data.id })
  }
}
export default HomeworkDetails
