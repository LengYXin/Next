import lodash from 'lodash';
import { BindAll } from 'lodash-decorators';
import { EnumApiAbout } from '../../api';
import { AjaxBasics } from '../../helpers/ajaxBasics';
import { Pagination } from '../basics/pagination';
import Entities from './entities';

@BindAll()
export class ControllerAbout extends Entities {
    constructor(protected $ajax: AjaxBasics) {
        super()
    }
    /**
     * 分页列表数据
     * @memberof ControllerAbout
     */
    Pagination = new Pagination(this.$ajax, {
        url: EnumApiAbout.AboutList,
        key: 'articleUrl',
        currentKey: 'pageIndex',
        // 无线滚动
        infinite: true,
        defaultPageSize: 10,
        onMapValues: this.onMapSource
    })
    /**
     * 获取
     * @memberof ControllerAbout
     */
    onMapSource(res) {
        return { dataSource: res.artivityResponseVos, total: res.total }
    }
    /*
    * 获取
    * @memberof ControllerCourse
    */
    async onGetTypelist() {
        if (this.typelist.length > 0) {
            return this.typelist;
        }
        const res = await this.$ajax.post<Array<{ typeId: number, typeName: string }>>(EnumApiAbout.AboutTypelist);
        return this.setTypelist(res);
    }
}
export default ControllerAbout