<template>
  <div>
    <Nuxt :keep-alive="keepAlive" :keepAliveProps="keepAliveProps" />
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="search">去上课</van-tabbar-item>
      <van-tabbar-item icon="friends-o">暄桐文房</van-tabbar-item>
      <van-tabbar-item icon="setting-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
@Component({
  components: {},
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
.page-enter-active {
  transition: opacity 0.2s;
}
.page-enter,
.page-leave-active {
  opacity: 0;
}
</style>

