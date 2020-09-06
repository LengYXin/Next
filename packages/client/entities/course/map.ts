/// <reference types="./course" />
import { BindAll } from "lodash-decorators";
import lodash from "lodash";
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
          classhourId: 0,
        });
      }
      return data;
    }
    return []
  }
}
export default CourseMap;
