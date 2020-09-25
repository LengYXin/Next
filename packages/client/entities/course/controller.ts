/// <reference types="./course" />
import lodash from "lodash";
import { BindAll } from "lodash-decorators";
import { EnumApiCourse } from "../../api";
import { AjaxBasics } from "../../helpers/ajaxBasics";
import { Pagination } from "../basics/pagination";
import { CourseDetails } from "./details";
@BindAll()
export class ControllerCourse {
  constructor(protected $ajax: AjaxBasics) {

  }
  /**
   * 课程详情
   * @memberof ControllerCourse
   */
  Details = new CourseDetails(this.$ajax);
  /**
   * 分页列表数据
   * @memberof ControllerCourse
   */
  Pagination = new Pagination(this.$ajax, {
    url: EnumApiCourse.CourseList,
    key: "courseFullId",
    currentKey: "pageIndex",
    // infinite: true,
    onMapValues: this.onFactory(
      "courseFullResponseVos",
      "courseSingleResponseVos"
    ),
  });
  /**
   * onMapSource 工厂
   */
  onFactory(dataSourceKey, childrenKey) {
    return (res) => {
      let dataSource = [];
      lodash.map(lodash.get(res, dataSourceKey), (item) => {
        if (!lodash.isNil(item.courseFullId)) {
          dataSource = lodash.concat(dataSource, [item]);
        }
        dataSource = lodash.concat(dataSource, lodash.get(item, childrenKey));
      });
      return { dataSource, total: res.total };
    };
  }
}
export default ControllerCourse;
