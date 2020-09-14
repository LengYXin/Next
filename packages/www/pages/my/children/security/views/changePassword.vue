<!--
 * @Author: Erlin
 * @CreateTime: 2020-09-14 19:26:54
 * @LastEditors: Erlin
 * @LastEditTime: 2020-09-14 20:28:16
 * @Description: 修改密码折叠内容
-->
<template>
  <a-form-model
    ref="passwordForm"
    v-model="passwordForm"
    :label-col="{ span: 9 }"
    :wrapper-col="{ span: 10 }"
    @submit="onSubmit"
    @submit.native.prevent
  >
    <a-form-model-item has-feedback label="当前密码" prop="pass">
      <a-input-password v-model="passwordForm.oldPassword" />
    </a-form-model-item>
    <a-form-model-item has-feedback label="新密码" prop="checkPass">
      <a-input-password
        placeholder="密码 (8-16位字母＋数字组合)"
        v-model="passwordForm.newPassword"
      />
    </a-form-model-item>
    <a-form-model-item has-feedback label="确认密码" prop="age">
      <a-input-password v-model="passwordForm.confirmNewPassword" />
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
  passwordForm = {};
  async onSubmit() {
    try {
      await this.PageStore.onUpdatePassword(this.passwordForm);
      this.PageStore.onOutLogin();
      this.$router.replace("/my");
    } catch (error) {}
  }
}
</script>

<style>
</style>