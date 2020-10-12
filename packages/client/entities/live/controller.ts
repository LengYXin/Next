/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-09-25 16:02:31
 * @modify date 2020-09-25 16:02:31
 * @desc 课程详情
 */
import { BindAll } from "lodash-decorators";
import { EnumApiLive } from "../../api";
import { AjaxBasics } from "../../helpers/ajaxBasics";
import { EntitiesBasics } from "../basics/entities";
/**
 * 课程详情
 */
@BindAll()
export class ControllerLive extends EntitiesBasics<any> {
  constructor(protected $ajax: AjaxBasics) {
    super($ajax, {
      // 课程详情地址
      url: EnumApiLive.Info,
      method: 'get',
      onMapValues: 'obj',
    })
  }
}
export default ControllerLive;
