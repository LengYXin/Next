/*
 * @Author: Erlin
 * @CreateTime: 2020-09-14 20:30:32
 * @LastEditors: Erlin
 * @LastEditTime: 2020-09-14 20:53:58
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
  if (value.length !== 11 || lodash.isEmpty(value)) {
    return;
  }
  if (lodash.eq(value, oldValue)) {
    return;
  }
  let tel = value.split("");
  console.log("onRender -> tel", tel);
  let res = lodash.fill(tel, "*", 3, tel.length - 4).join();
  el.innerHTML = res;
}
