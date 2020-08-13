<template>
  <a-row class="xt-register">
    <a-col :span="16" class="xt-register-form">
      <a-form-model
        layout="horizontal"
        :model="formInline"
        @submit="onSubmit"
        @submit.native.prevent
      >
        <a-form-model-item>
          <img class="xt-register-logo" :src="$images.title" alt srcset />
        </a-form-model-item>
        <a-form-model-item>
          <a-tabs>
            <a-tab-pane key="1" tab="手机注册"></a-tab-pane>
            <a-tab-pane key="2" tab="海外注册"></a-tab-pane>
          </a-tabs>
        </a-form-model-item>
        <a-form-model-item>
          <a-input size="large" addon-before="+86" v-model="formInline.user" placeholder="手机号"></a-input>
        </a-form-model-item>
        <a-form-model-item>
          <a-input size="large" placeholder="请输入六位验证码">
            <a-button slot="addonAfter">获取验证码</a-button>
          </a-input>
        </a-form-model-item>
        <a-form-model-item>
          <a-input size="large" placeholder="昵称"></a-input>
        </a-form-model-item>
        <a-form-model-item>
          <a-input size="large" type="password" placeholder="密码 (8-16位字母+数字组合)"></a-input>
        </a-form-model-item>
        <a-form-model-item>
          <a-input size="large" type="password" placeholder="再次确认密码"></a-input>
        </a-form-model-item>
        <a-form-model-item>
          <a-checkbox>我已经阅读过并同意《用户注册协议》</a-checkbox>
        </a-form-model-item>
        <a-form-model-item>
          <a-button size="large" type="primary" html-type="submit" block>注册</a-button>
        </a-form-model-item>
      </a-form-model>
    </a-col>
    <a-col :span="8" class="xt-register-qrcode">
      <div class="xt-flex-center">
        <img :src="$images.logo" alt srcset />
        <xt-qrcode options="https://www.baidu.com/?tn=64075107_1_dg" />
        <div>微信扫码注册</div>
      </div>
    </a-col>
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
.xt-register {
  min-height: 480px;
  .xt-register-logo {
    max-width: 100%;
  }
  .xt-register-qrcode {
    padding: @s-pd 0;
  }
  .xt-register-form {
    padding: @s-pd;
  }
  .ant-tabs-bar {
    margin: 0;
  }
}
</style>

