import { BindAll } from 'lodash-decorators';
import { AjaxBasics } from '../../helpers/ajaxBasics';
import SunDrying from './sunDrying';
import Details from './details';

@BindAll()
export class ControllerHomework {
    constructor(protected $ajax: AjaxBasics) {
    }
    /**
     * 晒作业
     * @memberof ControllerHomework
     */
    SunDrying = new SunDrying(this.$ajax);
    /**
     * 作业详情
     * @memberof ControllerHomework
     */
    Details = new Details(this.$ajax);

}
export default ControllerHomework