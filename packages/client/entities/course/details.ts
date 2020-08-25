/// <reference types="./course" />
import { BindAll } from "lodash-decorators";
import { EnumApiCourse } from "../../api";
import { AjaxBasics } from "../../helpers/ajaxBasics";
import { EntitiesBasics } from "../basics/entities";
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
   * 课程介绍
   * @param body 
   */
  async onGetCourseIntroduce(body) {
    const res = await this.$ajax.post<any>(EnumApiCourse.CourseIntroduce, body);
    return res;
  }
}
export default CourseDetails;
