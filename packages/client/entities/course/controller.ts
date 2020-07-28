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
        onMapValues: this.onMapSource
    })
    /**
     * 获取
     * @memberof ControllerCourse
     */
    onMapSource(res) {
        let dataSource = [];
        lodash.map(res.courseFullResponseVos, item => {
            if (!lodash.isNil(item.courseFullId)) {
                dataSource = lodash.concat(dataSource, [item])
            }
            dataSource = lodash.concat(dataSource, item.courseSingleResponseVos)
        })
        return { dataSource, total: res.total }
    }
    /**
     * 获取课程详情
     * @param {*} [body]
     * @param {Object} [headers]
     * @memberof ControllerCourse
     */
    async onGetDetails(body?: any, headers?: Object) {
        const res = await this.$ajax.post<any>(EnumApiCourse.CourseDetails, body, headers);
        this.setDetails(res);
    }
}
export default ControllerCourse