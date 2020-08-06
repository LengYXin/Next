import lodash from 'lodash';
import { BindAll } from 'lodash-decorators';
import { EnumApiUser } from '../../api';
import { AjaxBasics } from '../../helpers/ajaxBasics';
import { Pagination } from '../basics/pagination';
import Entities from './entities';

@BindAll()
export class ControllerUser extends Entities {
    constructor(protected $ajax: AjaxBasics) {
        super()
    }
    /**
     * 登录
     * @param itcode 
     * @param passworid 
     */
    async onLogin(itcode, password) {
        const res = await this.$ajax.post(EnumApiUser.Login, { account: itcode, password });
        this.setUserInfo({ token: res })
    }
}
export default ControllerUser