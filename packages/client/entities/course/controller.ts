import { observable, computed } from 'mobx';
import { create } from 'mobx-persist';
import { Subject, Subscription } from 'rxjs';
import { AjaxRequest } from 'rxjs/ajax';
import lodash from 'lodash';
import Entities from './entities';
import { AjaxBasics } from '../../helpers/ajaxBasics';
import { EnumApiCourse } from '../../api';


export class ControllerCourse extends Entities {
    constructor(protected $ajax: AjaxBasics) {
        super()
    }
    /**
     * 获取
     * @memberof ControllerCourse
     */
    async onGetDataSource(body?: any, headers?: Object) {
        const res = await this.$ajax.post<any>(EnumApiCourse.CourseList, body, headers);
        let dataSource = [];
        lodash.map(res.courseFullResponseVos, item => {
            dataSource = lodash.concat(dataSource, item.courseSingleResponseVos)
        })
        this.setDataSource(dataSource);
    }
}
export default ControllerCourse