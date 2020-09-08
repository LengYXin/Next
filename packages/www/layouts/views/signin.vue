<template>
  <a-row class="xt-signin" type="flex" justify="center" align="middle">
    <a-col :span="16" class="xt-signin-form">
      <a-form-model
        layout="horizontal"
        :model="formInline"
        @submit="onSubmit"
        @submit.native.prevent
      >
        <a-form-model-item>
          <img class="xt-signin-logo" :src="$images.title" alt srcset />
        </a-form-model-item>
        <h4 class="xt-font-bold">登录</h4>

        <a-form-model-item>
          <a-input
            size="large"
            addon-before="+86"
            v-model="formInline.user"
            placeholder="Username"
          ></a-input>
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
              <a-checkbox class="xt-signin-auto-login"
                >30天内自动登录</a-checkbox
              >
            </a-col>
            <a-col flex="auto" class="xt-text-align-right xt-font-size-base">
              <a-button size="small" type="link">海外登录</a-button>
            </a-col>
          </a-row>
        </a-form-model-item>
        <a-form-model-item>
          <a-button size="large" type="primary" html-type="submit" block
            >登录</a-button
          >
        </a-form-model-item>
        <a-form-model-item>
          <a-row type="flex">
            <a-col>
              <a-button class="ant-btn-gray" size="small" type="link"
                >手机验证码登录</a-button
              >
            </a-col>
            <a-col flex="auto" class="xt-text-align-right">
              <a-button
                size="small"
                type="link"
                @click="onToggle(locale.links_retrieve)"
                >找回密码</a-button
              >
              <a-divider type="vertical"></a-divider>
              <a-button
                class="ant-btn-green"
                size="small"
                type="link"
                @click="onToggle(locale.links_register)"
                >立即注册</a-button
              >
            </a-col>
          </a-row>
        </a-form-model-item>
      </a-form-model>
    </a-col>
    <a-col :span="8" class="xt-signin-qrcode">
      <img :src="$images.logo" alt srcset />
      <a-space direction="vertical" align="center">
        <xt-qrcode options="https://www.baidu.com/?tn=64075107_1_dg" />
        <div>微信扫码登录</div>
      </a-space>
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
  get locale() {
    return this.$EnumLocaleLinks;
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
<style lang="less">
@s-pd: 40px;
@l-pd: 80px;
@checkbox: ant-checkbox;
.xt-signin {
  min-height: 480px;
  background-color: rgba(14, 5, 10, 0.05);
  .xt-signin-auto-login {
    color: @xt-yellow-6;
    &:hover .ant-checkbox-inner,
    .@{checkbox}:hover .ant-checkbox-inner,
    .@{checkbox}-input:hover + .ant-checkbox-inner {
      border-color: @xt-yellow-6;
    }
    .@{checkbox} {
      &-checked {
        .ant-checkbox-inner {
          color: @xt-white-6;
          background-color: @xt-yellow-6;
        }
        &::after {
          color: @xt-white-6;
          border-color: @xt-yellow-6!important;
        }
      }
    }
  }

  &-logo {
    max-width: 100%;
  }
  &-qrcode.ant-col {
    height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 60px 0 80px;
  }
}
.xt-signin-form.ant-col {
  padding: @s-pd @l-pd;
  background-color: #ffffff;
  .ant-input.ant-input-lg {
    font-size: @font-size-base;
  }
}
</style>

