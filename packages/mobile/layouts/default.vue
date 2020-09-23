<template>
  <div class="xt-layout">
    <navbar />
    <Nuxt
      :keep-alive="keepAlive"
      :keepAliveProps="keepAliveProps"
      class="xt-layout-content"
      :class="pageClass"
    />
    <!-- :keepAliveProps="keepAliveProps" -->
    <tabbar />
    <signin />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import tabbar from "./views/tabbar.vue";
import navbar from "./views/navbar.vue";
import signin from "./views/signin.vue";
@Component({
  components: { navbar, tabbar, signin },
})
export default class extends Vue {
  active = 0;
  get config() {
    return {};
  }
  get pageClass() {
    return " xt-page-" + this.$route.name;
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
    include: [
      "PageIndex",
      "PageClass",
      "PageStationery",
      "PageMy",
      "PageVideo",
    ],
    // exclude: ["PageSearch", "PageSignin"],
  };
  mounted() {
    // console.log(this);
  }
  updated() {}
  destroyed() {}
}
</script>
<style lang="less">
@max-width: 1024px;
html {
  // max-width: @max-width;
  margin: auto;
  height: 100%;
  width: 100vw;
}
body {
  background: @gray-2;
  height: 100%;
  width: 100vw;
}
#__layout {
  min-height: 100vh;
  background: #fff;
  max-width: @max-width;
  margin: auto;
}
.page-enter-active {
  transition: opacity 0.2s;
}
.page-enter,
.page-leave-active {
  opacity: 0;
}
.xt-layout {
  height: calc(100vh - @tabbar-height);

  &-content {
    min-height: 100%;
    // padding: 0 10px 10px 10px;
    background: #fff;
    box-sizing: border-box;
    font-size: 14px;
  }
}
</style>


