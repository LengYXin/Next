<template>
  <div>
    <navbar />
    <Nuxt :keep-alive="keepAlive"  />
    <!-- :keepAliveProps="keepAliveProps" -->
    <tabbar />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import tabbar from "./views/tabbar.vue";
import navbar from "./views/navbar.vue";
@Component({
  components: { navbar, tabbar },
})
export default class extends Vue {
  active = 0;
  get config() {
    return {};
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
@max-width: 750px;
html {
  background: #ccc;
  max-width: @max-width;
  margin: auto;
  height: 100%;
}
body {
  background: #fff;
  height: 100%;
}
.page-enter-active {
  transition: opacity 0.2s;
}
.page-enter,
.page-leave-active {
  opacity: 0;
}
</style>


