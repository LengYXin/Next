/**
 *  作业 api 枚举
 */
export enum EnumApiHomework {
  /**
   * 朋友圈列表
   */
  Momentlist = "/moment/momentlist",
  /**
   * 朋友圈评论
   */
  Momentcomment = "/moment/momentcomment",
  /**
   * 发朋友圈
   */
  MomentAdd = "/moment/addmoment",
  /**
   * 添加浏览量
   */
  MomentAddbrowsenum = "/moment/addbrowsenum",
  /**
   * 删除评论
   */
  MomentDeletemoment = "/moment/deletemoment",
  /**
   * 删除回复
   */
  MomentDeletecomment = "/moment/deletecomment",
  /**
   * 朋友圈点赞
   */
  Momentlike = "/moment/momentlike",
  /**
   * 朋友圈 评论 点赞
   */
  MomentLikeComment = "/moment/momentcommentlike",
  /**
   * 晒作业详情
   */
  Momentdetail = "/moment/momentdetail",

  /**
   * 交作业详情
   */
  HomeworkDetail = "/homework/detail",
  /**
   * 已提交交作业列表
   */
  HomeworkList = "/userhomework/pastlist",
  /**
   * 交作业
   */
  HomeworkAdd = "/userhomework/add",
  /**
   * 晒出我的作业
   */
  HomeworkSun = "/userhomework/sunbyhomeworkId",
  /**
   * 删除我的作业
   */
  HomeworkDelete = "/userhomework/delete",
  /**
   * 我的作业回复
   */
  HomeworkReply = "/userhomework/reply",
}
