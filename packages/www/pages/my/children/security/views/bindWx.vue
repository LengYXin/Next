<!--
 * @Author: Erlin
 * @CreateTime: 2020-09-14 19:26:54
 * @LastEditors: Erlin
 * @LastEditTime: 2020-09-25 13:42:35
 * @Description: 绑定微信
-->

<template>
  <a-row type="flex" align="middle" justify="center">
    <a-space direction="vertical" align="center">
      <xt-qrcode options="https://www.baidu.com/?tn=64075107_1_dg" />
      <div>请使用微信扫描二维码登录</div>
      <div>"暄桐教室"</div>
    </a-space>
  </a-row>
</template>

<script>
import { Component, Prop, Vue, Ref, Inject } from "vue-property-decorator";
import { Observer } from "mobx-vue";

@Observer
@Component({
  scrollToTop: false,
})
export default class PageView extends Vue {
  get PageStore() {
    return this.$store.$storeUser;
  }
}
</script>

<style>
</style>