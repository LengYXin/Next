<template>
  <a-layout class="xt-layout" :class="pageClass">
    <a-layout-header>
      <headerMenu />
      <headerUser />
    </a-layout-header>
    <a-layout-content>
      <!-- <keep-alive key="main"> -->
        <Nuxt keep-alive/>
      <!-- </keep-alive> -->
      <a-back-top />
    </a-layout-content>
    <a-layout-footer>Footer</a-layout-footer>
  </a-layout>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import headerMenu from "./views/headerMenu.vue";
import headerUser from "./views/headerUser.vue";
@Component({
  components: { headerMenu, headerUser }
})
export default class extends Vue {
  get pageClass() {
    return "page-" + this.$route.fullPath;
  }
  mounted() {
    // console.log(this);
  }
  updated() {}
  destroyed() {}
}
</script>
<style lang="less">
.xt-layout {
  min-height: 100vh;
  .ant-layout-header {
    background: #fff;
    position: relative;
    .ant-menu-horizontal {
      text-align: center;
    }
  }
}
</style>

