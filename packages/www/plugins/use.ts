// import Antd from 'ant-design-vue/lib'
import { Button, Icon, message, Spin, Modal, notification } from 'ant-design-vue';
import Base from 'ant-design-vue/lib/base';
import Vue from 'vue';
// console.log("Button", Button)
Vue.use(Base)
Vue.component(Button.name, Button)
Vue.component(Modal.name, Modal)
Vue.component(Icon.name, Icon)
Vue.component(Spin.name, Spin)
// Vue.use(Antd)
Vue.prototype.$message = message;
Vue.prototype.$notification = notification;
Vue.prototype.$info = Modal.info;
Vue.prototype.$success = Modal.success;
Vue.prototype.$error = Modal.error;
Vue.prototype.$warning = Modal.warning;
Vue.prototype.$confirm = Modal.confirm;
Vue.prototype.$destroyAll = Modal.destroyAll;