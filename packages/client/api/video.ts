

/**
 *  Video api 枚举
 */
export enum EnumApiVideo {
    /** 文房列表 */
    VideoList = '/coursefree/list',
    /** 点赞 */
    VideoPraise = '/coursefree/praise',
    /** 视频详情 */
    VideoDetail = '/coursefree/detail',
    /** 评论列表 */
    VideoCommentList = '/coursefree/commentlist',
    /** 回复 评论 */
    VideoComment = '/coursefree/comment',
    /** 评论列表 点赞 */
    VideoCommentPraise = '/coursefree/comment/praise',
    /** 推荐列表 */
    VideoRecommend = '/coursefree/recommendlist',
    /** 添加播放量 */
    VideoPlayNumber = '/coursefree/playNumber',
    /** 课程详情 */
    // CourseDetails = '/course/singledetail',
}