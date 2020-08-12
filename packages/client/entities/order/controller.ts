import lodash from 'lodash';
import { BindAll } from 'lodash-decorators';
import { EnumApiOrder } from '../../api';
import { AjaxBasics } from '../../helpers/ajaxBasics';
import { Pagination } from '../basics/pagination';
import Entities from './entities';

@BindAll()
export class ControllerOrder extends Entities {
    constructor(protected $ajax: AjaxBasics) {
        super()
    }
    /**
     * 分页列表数据
     * @memberof ControllerOrder
     */
    Pagination = new Pagination(this.$ajax, {
        url: EnumApiOrder.OrderList,
        key: 'orderId',
        currentKey: 'pageIndex',
        // 无线滚动
        infinite: true,
        defaultPageSize: 10,
        onMapValues: 'orderResponseVos'
    })
    /*
    * 获取
    * @memberof ControllerCourse
    */
    async onGetTypelist() {
        if (this.typelist.length > 0) {
            return this.typelist;
        }
        const res = await this.$ajax.post<Array<{ typeId: number, typeName: string }>>(EnumApiOrder.OrderTypelist);
        return this.setTypelist(lodash.map(res, item => ({ key: item.typeId, title: item.typeName })));
    }
}
export default ControllerOrder