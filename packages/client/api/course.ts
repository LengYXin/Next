/**
 *  课程 api 枚举
 */
export enum EnumApiCourse {
  /** 课程列表 */
  CourseList = "/course/list",
  /** h5 去上课 */
  UsercourseList = "/usercourse/list",
  /** 课程详情 */
  CourseDetails = "/course/singledetail",
  /** 课程介绍 */
  CourseIntroduce = "/usercourse/courseIntroduce",
  /** 地图页 */
  CourseMap = "/userclasshour/map/list",
  /** 地图页详情 */
  CourseMapDetails = "/userclasshour/detail",
  /** 学习资料  */
  Coursematerial = "/coursematerial/list",
  /** 课程回顾 */
  CourseReview = "/activity/coursestudyreview",
  /** 创建分享 临时 token */
  CreatetempToken = "/activity/createtemptoken",
  /** 感想 */
  Thoughts  = "/coursecomment/list",
  /** 发感想 */
  ThoughtsComment  = "/coursecomment/comment"
}
