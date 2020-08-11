<template>
  <span>
    <span @click="onVisible(true,'links_signin')" v-t="locale.links_signin">登录</span>
    <span @click="onVisible(true,'links_register')" v-t="locale.links_register">注册</span>
    <a-modal :title="$t(title)" :visible="PageStore.visible" @ok="onOk" @cancel="onCancel" :footer="null">
      <signin v-if="title==='links_signin'" />
      <register v-else />
    </a-modal>
  </span>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import signin from "./signin.vue";
import register from "./register.vue";
import { Observer } from "mobx-vue";
@Observer
@Component({
  components: { signin, register },
})
export default class extends Vue {
  get PageStore() {
    return this.$store.$storeUser;
  }
  visible = false;
  title = "";
  get locale() {
    return this.$EnumLocaleLinks;
  }
  onVisible(visible, title?) {
    this.title = title;
    this.PageStore.onToggleVisible(visible)
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

