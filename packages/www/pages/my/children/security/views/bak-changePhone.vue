<template>
  <a-form-model
    ref="phoneForm"
    :model="phoneForm"
    :rules="rules"
    v-bind="layout"
  >
  
    <a-form-model-item label="验证码" prop="confirmCode">
      <a-input
        allowClear
        size="large"
        :maxLength="6"
        placeholder="请输入六位验证码"
        v-model="phoneForm.confirmCode"
      >
        <span slot="addonAfter"> 获取验证码 </span>
      </a-input>
    </a-form-model-item>

    <a-form-model-item :wrapper-col="{ span: 10, offset: 9 }">
      <a-button
        size="large"
        block
        class="ant-btn-yellow"
        type="primary"
        @click="submitForm('phoneForm')"
        >下一步</a-button
      >
    </a-form-model-item>
  </a-form-model>
</template>
<script>
import { Component, Prop, Vue, Ref } from "vue-property-decorator";
import { Observer } from "mobx-vue";

@Observer
@Component({
  scrollToTop: false,
})
export default class PageView extends Vue {
  phoneForm = {
    confirmCode: "",
  };
  rules = {
    confirmCode: [
      {
        required: true,
        message: "请输入六位验证码",
        trigger: "change",
      },
      { min: 6, max: 6, message: "请输入六位验证码", trigger: "blur" },
    ],
  };
  layout = {
    labelCol: { span: 9 },
    wrapperCol: { span: 10 },
  };
  submitForm(formName) {
    this.$refs[formName].validate((valid) => {
      if (valid) {
        alert("submit!");
      } else {
        console.log("error submit!!");
        return false;
      }
    });
  }

  resetForm(formName) {
    this.$refs[formName].resetFields();
  }

  onSendSms() {}
  toggleCountDown() {}
}
</script>