<template>
  <span>
    <span @click="onVisible(true,'links_signin')" v-t="'links_signin'">登录</span>
    <span @click="onVisible(true,'links_register')" v-t="'links_register'">注册</span>
    <a-modal :title="$t(title)" :visible="visible" @ok="onOk" @cancel="onCancel">
      <signin v-if="title==='links_signin'" />
      <register v-else />
    </a-modal>
  </span>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import signin from "./signin.vue";
import register from "./register.vue";
@Component({
  components: { signin, register },
})
export default class extends Vue {
  visible = false;
  title = "";
  onVisible(visible, title?) {
    this.visible = visible;
    this.title = title;
  }
  onOk() {
    this.onVisible(false);
  }
  onCancel() {
    this.onVisible(false);
  }
  onSubmit() {}
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

