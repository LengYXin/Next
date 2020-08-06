/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:13:07
 * @modify date 2020-08-05 14:13:07
 * @desc [description]
 */
import { BindAll } from 'lodash-decorators';
import { observable, action } from 'mobx';
@BindAll()
class XTGlobal {
    constructor() {

    }
    /**
     *生产环境
     * @memberof XTGlobal
     */
    production = process.env.NODE_ENV === "production";
}
export default new XTGlobal();
