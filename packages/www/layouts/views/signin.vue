<template>
  <a-row class="xt-signin">
    <a-col :span="16" class="xt-signin-form">
      <a-form-model
        layout="horizontal"
        :model="formInline"
        @submit="onSubmit"
        @submit.native.prevent
      >
        <a-form-model-item>
          <img :src="$images.logo" alt srcset />
        </a-form-model-item>
        <a-form-model-item>
          <a-input size="large" addon-before="+86" v-model="formInline.user" placeholder="Username"></a-input>
        </a-form-model-item>
        <a-form-model-item>
          <a-input
            size="large"
            v-model="formInline.password"
            type="password"
            placeholder="Password"
          ></a-input>
        </a-form-model-item>
        <a-form-model-item>
          <a-row type="flex">
            <a-col>
              <a-checkbox>30天内自动登录</a-checkbox>
            </a-col>
            <a-col flex="auto" class="xt-text-align-right">
              <a-button size="large" type="link">海外登录</a-button>
            </a-col>
          </a-row>
        </a-form-model-item>
        <a-form-model-item>
          <a-button size="large" type="primary" html-type="submit" block>登录</a-button>
        </a-form-model-item>
        <a-form-model-item>
          <a-row type="flex">
            <a-col>
              <a-button size="large" type="link">手机验证码登录</a-button>
            </a-col>
            <a-col flex="auto" class="xt-text-align-right">
              <a-button size="large" type="link" @click="onToggle('links_retrieve')">找回密码</a-button>
              <a-divider type="vertical"></a-divider>
              <a-button size="large" type="link" @click="onToggle('links_register')">立即注册</a-button>
            </a-col>
          </a-row>
        </a-form-model-item>
      </a-form-model>
    </a-col>
    <a-col :span="8" class="xt-signin-qrcode">
      <div class="xt-flex-center">
        <img :src="$images.logo" alt srcset />
        <xt-qrcode options="https://www.baidu.com/?tn=64075107_1_dg" />
        <div>微信扫码登录</div>
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
    user: "18611752863",
    password: "leng147896325",
  };
  async onSubmit() {
    try {
      await this.PageStore.onLogin(
        this.formInline.user,
        this.formInline.password
      );
      this.PageStore.onToggleVisible(false);
      window.location.reload();
      // this.$message.success({ content: "欢迎", key: "login" });
    } catch (error) {
      // this.$message.error({ content: error, key: "login" });
    }
  }
  @Emit("toggle")
  onToggle(value) {
    return value; //"links_register";
  }
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" >
@s-pd: 40px;
.xt-signin {
  min-height: 480px;

  .xt-signin-qrcode {
    padding: @s-pd 0;
  }
  .xt-signin-form {
    padding: @s-pd;
  }
}
</style>

