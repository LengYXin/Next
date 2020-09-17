<template>
  <div v-if="WechatBowser"></div>
  <div class="xt-layout-nav" v-else v-show="show">
    <van-nav-bar
      fixed
      left-arrow
      :title="title"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Watch } from "vue-property-decorator";
import lodash from "lodash";
import { Observer } from "mobx-vue";
@Observer
@Component({
  components: {},
})
export default class Page extends Vue {
  get WechatBowser() {
    return this.$store.$global.WechatBowser;
  }
  get show() {
    return !lodash.includes(
      ["index", "toclass", "stationery", "my"],
      this.$route.name
    );
  }
  get title() {
    return this.$t(this.$route.name);
  }
  onClickLeft() {
    return this.$router.back();
  }
  onClickRight() {}
  mounted() {
    // console.log(this.$route);
  }
  @Watch("$route")
  RouteUpdate(to, from, next) {
    console.log(this);
  }
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scoped>
.xt-layout-nav {
  height: @nav-bar-height;
}
</style>

