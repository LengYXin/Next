<!--
 * @Author: Erlin
 * @CreateTime: 2020-09-14 19:26:54
 * @LastEditors: Erlin
 * @LastEditTime: 2020-09-14 21:38:04
 * @Description: 修改密码折叠内容
-->
<template>
  <a-form-model
    ref="phoneForm"
    v-model="phoneForm"
    :label-col="{ span: 9 }"
    :wrapper-col="{ span: 10 }"
    @submit="onSubmit"
    @submit.native.prevent
  >
    <a-form-model-item has-feedback label="已绑定手机号" prop="">
      <span class="xt-text-yellow" v-phone="PageStore.UserInfo.phoneNum"></span>
    </a-form-model-item>
    <a-form-model-item has-feedback label="短信验证码" prop="checkPass">
      <a-input size="large" placeholder="请输入六位验证码">
        <span slot="addonAfter">获取验证码</span>
      </a-input>
    </a-form-model-item>

    <a-form-model-item :wrapper-col="{ span: 10, offset: 9 }">
      <a-button block class="ant-btn-yellow" type="primary" html-type="submit"
        >保存</a-button
      >
    </a-form-model-item>
  </a-form-model>
</template>

<script>
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import { Observer } from "mobx-vue";

@Observer
@Component({
  scrollToTop: false,
})
export default class PageView extends Vue {
  get PageStore() {
    return this.$store.$storeUser;
  }
  phoneForm = {};
  onSubmit() {}
}
</script>

<style>
</style>