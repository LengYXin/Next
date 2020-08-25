import lodash from 'lodash';
import { BindAll } from 'lodash-decorators';
import { EnumApiOrder } from '../../api';
import { AjaxBasics } from '../../helpers/ajaxBasics';
import { Pagination } from '../basics/pagination';
import Entities from './entities';
import SunDrying from './sunDrying';

@BindAll()
export class ControllerHomework {
    constructor(protected $ajax: AjaxBasics) {
    }
    /**
     * 晒作业
     * @memberof ControllerHomework
     */
    SunDrying = new SunDrying(this.$ajax);

}
export default ControllerHomework