/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-09-25 16:02:31
 * @modify date 2020-09-25 16:02:31
 * @desc 课程详情
 */
/// <reference types="./course" />
import { BindAll } from "lodash-decorators";
import { EnumApiCourse } from "../../api";
import { AjaxBasics } from "../../helpers/ajaxBasics";
import { EntitiesBasics } from "../basics/entities";
import { CourseMap } from "./map";
import { CourseThoughts } from "./thoughts";
/**
 * 课程详情
 */
@BindAll()
export class CourseDetails extends EntitiesBasics<ICourseDetails> {
  constructor(protected $ajax: AjaxBasics) {
    super($ajax, {
      // 课程详情地址
      url: EnumApiCourse.CourseDetails
    })
  }
  /**
   * 地图
   * @memberof ControllerCourse
   */
  Map = new CourseMap(this.$ajax);
  /**
   * 感想
   * @memberof CourseDetails
   */
  Thoughts = new CourseThoughts(this.$ajax);
  /**
   * 课程介绍
   * @param body 
   */
  async onGetCourseIntroduce(body) {
    const res = await this.$ajax.post<any>(EnumApiCourse.CourseIntroduce, body);
    return res;
  }
  async onGetCourseMap(courseId) {
    const res = await this.$ajax.post<any>(EnumApiCourse.CourseMap, { courseId });
    return res;
  }
}
export default CourseDetails;
