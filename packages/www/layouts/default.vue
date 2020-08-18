<template>
  <a-config-provider v-bind="config">
    <a-layout class="xt-layout">
      <a-layout-header class="xt-layout-header">
        <img class="xt-layout-header-logo" :src="$images.title" alt srcset />
        <dir class="xt-layout-header-version" v-if="!production">
          <span v-text="version"></span>
        </dir>
        <div class="xt-layout-header-content">
          <headerMenu />
          <headerUser />
        </div>
      </a-layout-header>
      <!-- 占位 -->
      <a-layout-header></a-layout-header>
      <a-layout-content
        class="xt-layout-content"
        :class="pageClass"
        v-auto-height="{ styleKey: 'minHeight', subtract: 350 }"
      >
        <!-- 面包屑 -->
        <breadcrumb />
        <!-- 页面 -->
        <!-- <Nuxt keep-alive /> -->
        <Nuxt :keep-alive="keepAlive" :keepAliveProps="keepAliveProps" />
        <!-- 滚动 -->
        <a-back-top />
        <!-- <xt-cat /> -->
      </a-layout-content>
      <!-- 底部 -->
      <a-layout-footer class="xt-layout-footer">
        <layoutFooter />
      </a-layout-footer>
    </a-layout>
    <div slot="renderEmpty">
      <!-- <span>暂时没有哦~</span> -->
    </div>
  </a-config-provider>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import zh_CN from "ant-design-vue/lib/locale-provider/zh_CN";
import headerMenu from "./views/headerMenu.vue";
import headerUser from "./views/headerUser.vue";
import layoutFooter from "./views/footer.vue";
import breadcrumb from "./views/breadcrumb.vue";
@Component({
  components: { headerMenu, headerUser, layoutFooter, breadcrumb },
})
export default class extends Vue {
  get config() {
    return {
      autoInsertSpaceInButton: false,
      locale: { zh: zh_CN, en: null }[this.$store.$locale.locale],
    };
  }
  get pageClass() {
    return "xt-page-" + this.$route.name;
  }
  get production() {
    return this.$store.$global.production;
  }
  get keepAlive() {
    return true; //this.$store.$global.production;
  }
  get version() {
    return this.$store.$global.version;
  }
  keepAliveProps = {
    include: "PageIndex",
  };
  mounted() {
    // console.log(this);
  }
  updated() {}
  destroyed() {}
}
</script>
<style lang="less">
.page-enter-active {
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
  overflow: hidden;
  // padding: 0 20px;
}
.xt-layout-header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: @zindex-modal-mask + 1;
  overflow: hidden;
  box-shadow: @xt-header-box-shadow;
  .xt-layout-header-version {
    position: absolute;
    top: 0;
    left: 0;
    margin: 0;
    color: @red-6;
    font-size: @font-size-lg;
    background: #fff;
  }
  .xt-layout-header-logo {
    position: absolute;
    // left: 400px;
    height: 100%;
    top: 0;
  }
}
.xt-layout-header-content {
  max-width: @xt-content-width;
  margin: auto;
  position: relative;
}
.xt-layout-content {
  transition: all 0.2s;
  width: 100vw;
}
.xt-layout-footer {
  max-width: @xt-content-width;
  margin: auto;
}
</style>
