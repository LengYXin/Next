/// <reference types="./course" />
import { BindAll } from "lodash-decorators";
import { EnumApiCourse } from "../../api";
import { AjaxBasics } from "../../helpers/ajaxBasics";
import { EntitiesBasics } from "../basics/entities";
import { computed, toJS } from "mobx";
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
  @computed
  get mapList() {
    return toJS(this._dataSource?.courseMapList);
  }
}
export default CourseMap;
