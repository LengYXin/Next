<template>
  <div class="xt-layout-nav" v-show="show">
    <div class="xt-layout-nav-wechat" v-if="WechatBowser">
      <van-icon class="xt-layout-nav-icon" name="arrow-left" @click="onClickLeft" />
    </div>
    <van-nav-bar
      v-else
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
    if (window.history.length > 2) {
      return this.$router.back();
    }
    return this.$router.push({ name: "index" });
  }
  onClickRight() {}
  mounted() {
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
  padding: @nav-bar-height / 4;
  box-sizing: border-box;
  &-wechat {
    height: @nav-bar-height / 2;
    width: @nav-bar-height / 2;
    border-radius: 100%;
    background: @overlay-background-color;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 10;
  }
}
</style>

