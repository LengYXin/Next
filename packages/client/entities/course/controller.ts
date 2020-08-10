import lodash from 'lodash';
import { BindAll } from 'lodash-decorators';
import { EnumApiCourse } from '../../api';
import { AjaxBasics } from '../../helpers/ajaxBasics';
import { Pagination } from '../basics/pagination';
import Entities from './entities';

@BindAll()
export class ControllerCourse extends Entities {
    constructor(protected $ajax: AjaxBasics) {
        super()
    }
    /**
     * 分页列表数据
     * @memberof ControllerCourse
     */
    Pagination = new Pagination(this.$ajax, {
        url: EnumApiCourse.CourseList,
        key: 'courseFullId',
        currentKey: 'pageIndex',
        // infinite: true,
        onMapValues: this.onFactory('courseFullResponseVos', 'courseSingleResponseVos')
    });
    /**
     * 分页列表数据 H5
     * @memberof ControllerCourse
     */
    PaginationWeApp = new Pagination(this.$ajax, {
        url: EnumApiCourse.UsercourseList,
        key: 'courseFullId',
        currentKey: 'pageIndex',
        infinite: true,
        onMapValues: this.onFactory('userCourseFullResponseVos', 'userCourseSingleResponseVos')
    });
    /**
     * onMapSource 工厂
     */
    onFactory(dataSourceKey, childrenKey) {
        return (res) => {
            let dataSource = [];
            lodash.map(lodash.get(res, dataSourceKey), item => {
                if (!lodash.isNil(item.courseFullId)) {
                    dataSource = lodash.concat(dataSource, [item])
                }
                dataSource = lodash.concat(dataSource, lodash.get(item, childrenKey))
            })
            return { dataSource, total: res.total }
        }
    }
    /**
     * 获取
     * @memberof ControllerCourse
     */
    // onMapSource(res) {
    //     let dataSource = [];
    //     lodash.map(res.courseFullResponseVos, item => {
    //         if (!lodash.isNil(item.courseFullId)) {
    //             dataSource = lodash.concat(dataSource, [item])
    //         }
    //         dataSource = lodash.concat(dataSource, item.courseSingleResponseVos)
    //     })
    //     return { dataSource, total: res.total }
    // }
    /**
     * 获取课程详情
     * @param {*} [body]
     * @param {Object} [headers]
     * @memberof ControllerCourse
     */
    async onGetDetails(body: { courseId: any }, headers?: Object) {
        this.setDetails({});
        const res = await this.$ajax.post<any>(EnumApiCourse.CourseDetails, body, headers);
        this.setDetails(res);
    }
    async onGetCourseIntroduce(body) {
        const res = await this.$ajax.post<any>(EnumApiCourse.CourseIntroduce, body);
        return res
    }
}
export default ControllerCourse