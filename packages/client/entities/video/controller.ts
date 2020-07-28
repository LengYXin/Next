import lodash from 'lodash';
import { BindAll } from 'lodash-decorators';
import { EnumApiVideo } from '../../api';
import { AjaxBasics } from '../../helpers/ajaxBasics';
import { Pagination } from '../basics/pagination';
import Entities from './entities';

@BindAll()
export class ControllerVideo extends Entities {
    constructor(protected $ajax: AjaxBasics) {
        super()
    }
    /**
     * 分页列表数据
     * @memberof ControllerVideo
     */
    Pagination = new Pagination(this.$ajax, {
        url: EnumApiVideo.VideoList,
        key: 'courseId',
        currentKey: 'pageIndex',
        defaultPageSize: 9,
        onMapValues: this.onMapSource
    })
    /**
     * 获取
     * @memberof ControllerVideo
     */
    onMapSource(res) {
        return { dataSource: res.courseFreeResponseVos, total: res.total }
    }

}
export default ControllerVideo