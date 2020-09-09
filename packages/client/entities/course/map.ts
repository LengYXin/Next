/// <reference types="./course" />
import { BindAll } from "lodash-decorators";
import lodash from "lodash";
import { EnumApiCourse } from "../../api";
import { AjaxBasics } from "../../helpers/ajaxBasics";
import { EntitiesBasics } from "../basics/entities";
import { computed, toJS, observable, runInAction } from "mobx";
/**
 * 课程详情
 */
@BindAll()
export class CourseMap extends EntitiesBasics<any> {
  constructor(protected $ajax: AjaxBasics) {
    super($ajax, {
      // 课程详情地址
      url: EnumApiCourse.CourseMap
    })
  }
  /**
   * 课程回顾
   * @type {*}
   * @memberof CourseMap
   */
  @observable CourseReview: any = {};
  /**
   * 地图页详情
   * @memberof CourseMap
   */
  Details = new EntitiesBasics(this.$ajax, { url: EnumApiCourse.CourseMapDetails })
  @computed
  get mapList() {
    if (this._dataSource?.courseMapList) {
      const data = lodash.orderBy(toJS(this._dataSource.courseMapList), ['sortNo']);
      // 没有头部课程 补充占位
      if (lodash.get(data, "[0].kind") !== "top") {
        data.unshift({
          kind: "top",
          classhourId: 0,
        });
      }
      if (lodash.get(data, `[${data.length - 1}].kind`) != "bottom") {
        data.push({
          kind: "bottom",
          classhourId: -1,
        });
      }
      return data;
    }
    return []
  }
  /**
   * 获取课程回顾
   * @param courseId 
   */
  async onGetCourseReview(courseId: string) {
    const res = await this.$ajax.post(EnumApiCourse.CourseReview, { courseId });
    runInAction(() => {
      this.CourseReview = res;
    })
  }
  /**
   * 创建分享 临时 token
   * @param courseId 
   */
  onGetCreatetempToken(courseId: string) {
    return this.$ajax.post(EnumApiCourse.CreatetempToken, { courseId })
  }
}
export default CourseMap;
