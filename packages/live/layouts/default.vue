<template>
  <a-config-provider v-bind="config">
    <Nuxt :keep-alive="keepAlive" :keepAliveProps="keepAliveProps" />
    <div slot="renderEmpty">
      <!-- <span>暂时没有哦~</span> -->
    </div>
  </a-config-provider>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import zh_CN from "ant-design-vue/lib/locale-provider/zh_CN";
// import headerMenu from "./views/headerMenu.vue";
// import headerUser from "./views/headerUser.vue";
// import layoutFooter from "./views/footer.vue";
// import breadcrumb from "./views/breadcrumb.vue";
// import fab from "./views/fab.vue";
@Component({
  components: { 
    // fab, headerMenu, headerUser, layoutFooter, breadcrumb
     },
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
  background: #f1edeb;
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
  // padding-bottom: 20px;
  width: 100vw;
  background: #fff;
}
.xt-layout-footer {
  width: 100vw;
  background: #f1edeb;
}
</style>
