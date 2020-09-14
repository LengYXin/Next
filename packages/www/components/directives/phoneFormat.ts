/*
 * @Author: Erlin
 * @CreateTime: 2020-09-14 20:30:32
 * @LastEditors: Erlin
 * @LastEditTime: 2020-09-14 20:56:54
 * @Description: 格式化手机号码展示
 */

import Vue from "vue";
import lodash from "lodash";
Vue.directive("phone", {
  inserted: onRender,
  componentUpdated: onRender,
  unbind(el: any) {}
});
/**
 * 手机号格式化
 * @param el
 * @param binding
 * @param vnode
 * @param oldVnode
 */
function onRender(el: HTMLDivElement, binding, vnode, oldVnode) {
  let { value, oldValue } = binding;
  if (
    lodash.eq(value, oldValue) ||
    lodash.isEmpty(value) ||
    value.length !== 11
  ) {
    return;
  }
  let tel = value.split("");
  let res = lodash.join(lodash.fill(tel, "*", 3, tel.length - 4), "");
  el.innerHTML = res;
}
