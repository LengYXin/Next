<template>
  <van-dialog
    title="请登录"
    :value="PageStore.visible"
    :show-confirm-button="false"
    :close-on-click-overlay="true"
    :before-close="onClose"
    @cancel="onClose"
    @close="onClose"
  >
    <van-grid column-num="2">
      <van-grid-item icon="photo-o" text="手机" :to="toSignin()" />
      <van-grid-item icon="photo-o" text="微信" :to="toSignin('wx')" />
    </van-grid>
    <van-button class="van-button" type="primary">海外登陆</van-button>
    <van-divider />
  </van-dialog>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import { Observer } from "mobx-vue";
@Observer
@Component({
  components: {},
})
export default class Page extends Vue {
  get PageStore() {
    return this.$store.$storeUser;
  }
  get locale() {
    return this.$EnumLocaleLinks;
  }
  toSignin(active) {
    return { name: "user-signin", query: { active } };
  }
  onClose() {
    this.PageStore.onToggleVisible(false);
  }
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less">
@max-width: 750px;
.xt-layout-tabbar {
  height: @tabbar-height;
  &-fixed {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .van-tabbar {
    max-width: @max-width;
    margin: auto;
  }
}
</style>


