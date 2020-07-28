import lodash from 'lodash';
import { BindAll } from 'lodash-decorators';
import { EnumApiStationery } from '../../api';
import { AjaxBasics } from '../../helpers/ajaxBasics';
import { Pagination } from '../basics/pagination';
import Entities from './entities';

@BindAll()
export class ControllerStationery extends Entities {
    constructor(protected $ajax: AjaxBasics) {
        super()
    }
    /**
     * 分页列表数据
     * @memberof ControllerStationery
     */
    Pagination = new Pagination(this.$ajax, {
        url: EnumApiStationery.StationeryList,
        key: 'commodityId',
        currentKey: 'pageIndex',
        defaultPageSize: 12,
        onMapValues: this.onMapSource
    })
    /**
     * 获取
     * @memberof ControllerStationery
     */
    onMapSource(res) {
        return { dataSource: res.commodityResponseVos, total: res.total }
    }
    /*
    * 获取
    * @memberof ControllerCourse
    */
    async onGetTypelist() {
        if (this.typelist.length > 0) {
            return this.typelist;
        }
        const res = await this.$ajax.post<Array<{ typeId: number, typeName: string }>>(EnumApiStationery.StationeryTypelist);
        return this.setTypelist(res);
    }
}
export default ControllerStationery