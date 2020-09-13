/*
 * @Author: Erlin
 * @CreateTime: 2020-08-28 17:53:56
 * @LastEditors: Erlin
 * @LastEditTime: 2020-09-10 17:20:56
 * @Description: 我的 api 枚举
 */

export enum EnumApiMy {
  /**
   * 去上课课程列表
   */
  MyCourseList = "/usercourse/list",
  /**
   * 我的作业列表
   */
  MyHomeworkList = "/userhomework/list",
  /**
   * 我的作业详情
   */
  MyHomeworkDetail = "/userhomework/detail",
  /**
   * 晒出我的作业
   */
  SunHomework = "/userhomework/sunbyhomeworkId",
  /**
   * 删除我的作业
   */
  DelHomework = "/userhomework/delete",
  /**
   * 我的作业回复
   */
  MyHomeworkReply = "/userhomework/reply",
  /**
   * 我晒出的作业列表
   */
  MySunWorkList = "/moment/usermomentlist",
  /**
   * 我晒出的作业详情
   */
  MySunWorkDetail = "/moment/momentdetail",
  /**
   * 删除我晒出的作业
   */
  DelSunWork = "/moment/deletemoment",
}
