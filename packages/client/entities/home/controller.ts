import { observable, computed } from "mobx";
import { create } from "mobx-persist";
import { Subject, Subscription } from "rxjs";
import { AjaxRequest } from "rxjs/ajax";
import lodash from "lodash";
import Entities from "./entities";
import { AjaxBasics } from "../../helpers/ajaxBasics";
import { EnumApiHome } from "../../api";

export class ControllerHome extends Entities {
  constructor(protected $ajax: AjaxBasics) {
    super();
  }
  /**
   * 获取
   * @memberof ControllerHome
   */
  async onGetBanners() {
    const res = await this.$ajax.post(EnumApiHome.Banner);
    this.setBanners(res);
  }

  async onGetH5Banners() {
    const res = await this.$ajax.post(EnumApiHome.H5Banner);
    this.setBanners(res);
  }
}
export default ControllerHome;
