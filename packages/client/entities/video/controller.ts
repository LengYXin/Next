import { BindAll } from 'lodash-decorators';
import { toJS } from 'mobx';
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
        key: 'id',
        currentKey: 'pageIndex',
        defaultPageSize: 9,
        onMapValues: 'courseFreeResponseVos'
    });
    /**
     * 点赞
     * @param data 点赞的数据 
     */
    onLikes(data) {
        data = toJS(data)
        data.likeCount++;
        this.Pagination.onUpdate(data, data)
    }
}
export default ControllerVideo