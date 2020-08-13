/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:12:26
 * @modify date 2020-08-05 14:12:26
 * @desc [description]
 */
import { Affix, Avatar, BackTop, Badge, Breadcrumb, Button, Card, Checkbox, Col, Comment, ConfigProvider, Descriptions, Divider, Dropdown, FormModel, Icon, Input, Layout, List, Menu, message, Modal, notification, Pagination, Popconfirm, Popover, Result, Row, Skeleton, Spin, Steps, Tabs, Tooltip } from 'ant-design-vue';
import Base from 'ant-design-vue/lib/base';
import Vue from 'vue';
Vue.use(Base)
Vue.use(ConfigProvider)
Vue.use(Badge)
Vue.use(FormModel)
Vue.use(Affix)
Vue.use(Layout)
Vue.use(Menu)
Vue.use(Tabs)
Vue.use(Button)
Vue.use(Modal)
Vue.use(Icon)
Vue.use(Spin)
Vue.use(BackTop)
Vue.use(Divider)
Vue.use(Popconfirm)
Vue.use(Avatar)
Vue.use(Input)
Vue.use(List)
Vue.use(Dropdown)
Vue.use(Descriptions)
Vue.use(Skeleton)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Pagination)
Vue.use(Breadcrumb)
Vue.use(Comment)
Vue.use(Tooltip)
Vue.use(Popover)
Vue.use(Result)
Vue.use(Steps)
Vue.use(Checkbox)
Vue.prototype.$message = message;
Vue.prototype.$notification = notification;
Vue.prototype.$info = Modal.info;
Vue.prototype.$success = Modal.success;
Vue.prototype.$error = Modal.error;
Vue.prototype.$warning = Modal.warning;
Vue.prototype.$confirm = Modal.confirm;
Vue.prototype.$destroyAll = Modal.destroyAll;

Spin.setDefaultIndicator({
    indicator: h => {
        const NodeJsx: any = Icon;
        return <NodeJsx type="loading" size="large" />;
    },
});