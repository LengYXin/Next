<template>
  <a-form-model layout="horizontal" :model="formInline" @submit="onSubmit" @submit.native.prevent>
    <a-tabs default-active-key="1">
      <a-tab-pane key="1">
        <span slot="tab">
          <a-icon type="loading" />
          <span>邮箱</span>
        </span>
        <a-form-model-item>
          <a-input v-model="formInline.user" placeholder="Username">
            <a-icon slot="prefix" type="loading" style="color:rgba(0,0,0,.25)" />
          </a-input>
        </a-form-model-item>
        <a-form-model-item>
          <a-input v-model="formInline.password" type="password" placeholder="Password">
            <a-icon slot="prefix" type="loading" style="color:rgba(0,0,0,.25)" />
          </a-input>
        </a-form-model-item>
      </a-tab-pane>
      <a-tab-pane key="2">
        <span slot="tab">
          <a-icon type="loading" />
          <span>手机号</span>
        </span>
        <a-form-model-item>
          <a-input v-model="formInline.user" placeholder="Username">
            <a-icon slot="prefix" type="loading" style="color:rgba(0,0,0,.25)" />
          </a-input>
        </a-form-model-item>
        <a-form-model-item>
          <a-input v-model="formInline.password" type="password" placeholder="Password">
            <a-icon slot="prefix" type="loading" style="color:rgba(0,0,0,.25)" />
          </a-input>
        </a-form-model-item>
      </a-tab-pane>
    </a-tabs>
    <a-form-model-item >
      <a-button type="primary" block>Submit</a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
@Component({
  components: {},
})
export default class extends Vue {
  formInline = {
    user: "",
    password: "",
  };
  onSubmit() {}
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scoped>
</style>

