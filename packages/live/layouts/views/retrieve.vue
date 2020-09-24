<template>
  <a-row class="xt-retrieve">
    <a-form-model layout="horizontal" :model="formInline" @submit="onSubmit" @submit.native.prevent>
      <a-form-model-item>
        <h1>找回密码</h1>
      </a-form-model-item>
      <a-form-model-item>
        <a-steps>
          <a-step title="填写账号" />
          <a-step title="验证身份" />
          <a-step title="重置密码" />
          <a-step title="完成" />
        </a-steps>
      </a-form-model-item>
      <a-form-model-item>
        <a-input size="large" v-model="formInline.user" placeholder="请输入注册时的手机号/邮箱"></a-input>
      </a-form-model-item>
      <a-form-model-item>
        <a-input size="large" placeholder="请输入六位验证码">
          <a-button slot="addonAfter">获取验证码</a-button>
        </a-input>
      </a-form-model-item>
      <a-form-model-item>
        <a-button size="large" type="primary" html-type="submit" block>找回密码</a-button>
      </a-form-model-item>
    </a-form-model>
  </a-row>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Emit } from "vue-property-decorator";
@Component({
  components: {},
})
export default class extends Vue {
  get PageStore() {
    return this.$store.$storeUser;
  }
  formInline = {
    user: "",
  };
  async onSubmit() {}
  @Emit("toggle")
  onToggle() {
    return "links_signin";
  }
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" >
@s-pd: 40px;
.xt-retrieve {
  padding: @s-pd @s-pd * 2;
}
</style>

