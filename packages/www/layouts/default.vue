<template>
  <a-layout class="xt-layout">
    <a-layout-header class="xt-layout-header">
      <div class="xt-layout-header-content">
        <headerMenu />
        <headerUser />
      </div>
    </a-layout-header>
    <a-layout-header></a-layout-header>
    <a-layout-content
      class="xt-layout-content"
      v-auto-height="{ styleKey: 'minHeight', subtract: 240 }"
    >
      <!-- 面包屑 -->
      <breadcrumb />
      <!-- 页面 -->
      <!-- <Nuxt keep-alive /> -->
      <Nuxt :class="pageClass" :keep-alive="production" />
      <!-- 滚动 -->
      <a-back-top />
    </a-layout-content>
    <!-- 底部 -->
    <a-layout-footer>
      <layoutFooter />
    </a-layout-footer>
  </a-layout>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import headerMenu from "./views/headerMenu.vue";
import headerUser from "./views/headerUser.vue";
import layoutFooter from "./views/footer.vue";
import breadcrumb from "./views/breadcrumb.vue";
@Component({
  components: { headerMenu, headerUser, layoutFooter, breadcrumb }
})
export default class extends Vue {
  get pageClass() {
    return "xt-page-" + this.$route.name;
  }
  get production() {
    return process.env.NODE_ENV === "production";
  }
  mounted() {
    console.log(this);
  }
  updated() {}
  destroyed() {}
}
</script>
<style lang="less">
.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s;
}
.page-enter,
.page-leave-active {
  opacity: 0;
}
</style>
<style lang="less" scoped>
.xt-layout {
  min-height: 100vh;
}
.xt-layout-header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: @zindex-modal-mask + 1;
  overflow: hidden;
  box-shadow: @xt-header-box-shadow;
}
.xt-layout-header-content {
  max-width: 1000px;
  margin: auto;
  position: relative;
}
.xt-layout-content {
  transition: all 0.2s;
}
</style>
