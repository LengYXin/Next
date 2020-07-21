<template>
  <span>
    <span @click="onVisible(true)">登录</span>
    <span @click="onVisible(true)">注册</span>
    <a-modal title="登录" :visible="visible"  @ok="onOk" @cancel="onCancel">
      <a-form-model
        layout="inline"
        :model="formInline"
        @submit="onSubmit"
        @submit.native.prevent
      >
        <a-form-model-item>
          <a-input v-model="formInline.user" placeholder="Username">
            <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
          </a-input>
        </a-form-model-item>
        <a-form-model-item>
          <a-input v-model="formInline.password" type="password" placeholder="Password">
            <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
          </a-input>
        </a-form-model-item>
        <a-form-model-item>
          <a-button
            type="primary"
            html-type="submit"
            :disabled="formInline.user === '' || formInline.password === ''"
          >Log in</a-button>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </span>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
@Component({
  components: {}
})
export default class extends Vue {
  @Prop() text;
  visible = false;
  formInline = {
    user: "",
    password: ""
  };
  onVisible(visible) {
    this.visible = visible;
  }
  onOk() {
    this.onVisible(false);
  }
  onCancel() {
    this.onVisible(false);
  }
  onSubmit(){

  }
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scoped>
.xt-header-user {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
}
</style>

