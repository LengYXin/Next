/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:12:26
 * @modify date 2020-08-05 14:12:26
 * @desc [description]
 */
import {
  Affix,
  Tag,
  Empty,
  Avatar,
  BackTop,
  Badge,
  Breadcrumb,
  Button,
  Card,
  Radio,
  Checkbox,
  Col,
  Comment,
  ConfigProvider,
  Descriptions,
  Divider,
  Dropdown,
  FormModel,
  Icon,
  Input,
  Layout,
  List,
  Menu,
  message,
  Modal,
  notification,
  Pagination,
  Popconfirm,
  Popover,
  Result,
  Row,
  Skeleton,
  Spin,
  Statistic,
  Steps,
  Tabs,
  Timeline,
  Tooltip,
  Upload,
  Select,
  Collapse
} from "ant-design-vue";
import "ant-design-vue/lib/base/style/index";
import "ant-design-vue/lib/space/style/index";
import Base from "ant-design-vue/lib/base";
import Space from "ant-design-vue/lib/space";
import Vue from "vue";
Vue.use(Base);
Vue.use(Space);
Vue.use(Select);
Vue.use(ConfigProvider);
Vue.use(Tag);
Vue.use(Badge);
Vue.use(FormModel);
Vue.use(Affix);
Vue.use(Empty);
Vue.use(Layout);
Vue.use(Menu);
Vue.use(Tabs);
Vue.use(Button);
Vue.use(Modal);
Vue.use(Icon);
Vue.use(Upload);
Vue.use(Spin);
Vue.use(BackTop);
Vue.use(Divider);
Vue.use(Popconfirm);
Vue.use(Avatar);
Vue.use(Input);
Vue.use(List);
Vue.use(Dropdown);
Vue.use(Descriptions);
Vue.use(Skeleton);
Vue.use(Card);
Vue.use(Row);
Vue.use(Col);
Vue.use(Pagination);
Vue.use(Breadcrumb);
Vue.use(Comment);
Vue.use(Tooltip);
Vue.use(Popover);
Vue.use(Result);
Vue.use(Steps);
Vue.use(Checkbox);
Vue.use(Radio);
Vue.use(Statistic);
Vue.use(Timeline);
Vue.use(Collapse);

Vue.prototype.$message = message;
Vue.prototype.$notification = notification;
Vue.prototype.$info = Modal.info;
Vue.prototype.$success = Modal.success;
Vue.prototype.$error = Modal.error;
Vue.prototype.$warning = Modal.warning;
Vue.prototype.$confirm = Modal.confirm;
Vue.prototype.$destroyAll = Modal.destroyAll;
message.config({
  top: `80px`,
  duration: 2,
  maxCount: 3
});
Spin.setDefaultIndicator({
  indicator: h => {
    const NodeJsx: any = Icon;
    return <NodeJsx type="loading" size="large" />;
  }
});
