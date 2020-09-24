<!--
 * @Author: Erlin
 * @CreateTime: 2020-09-14 19:26:54
 * @LastEditors: Erlin
 * @LastEditTime: 2020-09-24 15:58:03
 * @Description: 修改密码折叠内容
-->

<template>
  <a-form-model
    ref="passwordFormRef"
    :model="passwordForm"
    :rules="rules"
    v-bind="layout"
    @submit="onSubmit"
    @submit.native.prevent
  >
    <a-form-model-item label="当前密码" prop="oldPassword">
      <a-input-password v-model="passwordForm.oldPassword" />
    </a-form-model-item>
    <a-form-model-item label="新密码" prop="newPassword">
      <a-input-password
        placeholder="密码 (8-16位字母＋数字组合)"
        v-model="passwordForm.newPassword"
      />
    </a-form-model-item>
    <a-form-model-item label="确认密码" prop="confirmNewPassword">
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
  @Ref("passwordFormRef") passwordFormRef;
  passwordForm = {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  };

  validatePassword = (rule, value, callback, source, options) => {
    let { field } = rule;
    if (value == "") {
      callback(new Error("密码不能为空"));
    }
    if (/[\s]+/.test(value)) {
      callback(new Error("密码不能包含空格"));
    }
    if (value.length > 16 || value.length < 8) {
      callback(new Error("密码长度8-16位，须包含数字+字母"));
    }
    if (!this.$regulars.password.test(value)) {
      callback(new Error("密码长度8-16位，须包含数字+字母"));
    }

    if (field === "newPassword") {
      if (value === this.passwordForm.oldPassword) {
        callback(new Error("新密码不能与原密码一致"));
      }
      if (this.passwordForm.confirmNewPassword !== "") {
        this.$refs.passwordFormRef.validateField("confirmNewPassword");
      }
    }

    if (field === "confirmNewPassword") {
      if (value !== this.passwordForm.newPassword) {
        callback(new Error("密码不一样"));
      }
    }
    callback();
  };

  rules = {
    oldPassword: [{ validator: this.validatePassword, trigger: "change" }],
    newPassword: [{ validator: this.validatePassword, trigger: "change" }],
    confirmNewPassword: [
      { validator: this.validatePassword, trigger: "change" },
    ],
  };
  layout = {
    labelCol: { span: 9 },
    wrapperCol: { span: 10 },
  };

  async onSubmit() {
    this.passwordFormRef.validate(async (valid) => {
      if (valid) {
        try {
          await this.PageStore.onUpdatePassword(this.passwordForm);
          this.$emit("reset");
          this.PageStore.onOutLogin();
          // this.$router.replace("/", { login: "" });
        } catch (error) {}
      }
    });
  }
}
</script>

<style>
</style>