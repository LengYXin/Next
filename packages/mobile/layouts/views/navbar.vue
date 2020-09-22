<template>
  <div class="xt-layout-nav" v-show="show">
    <div class="xt-layout-nav-fixed">
      <xt-wechat-bowser>
        <van-nav-bar
          left-arrow
          :title="title"
          @click-left="onClickLeft"
          @click-right="onClickRight"
        />
        <!-- 微信显示 -->
        <div class="xt-layout-nav-wechat" slot="yes">
          <van-icon class="xt-layout-nav-icon" name="arrow-left" @click="onClickLeft" />
        </div>
      </xt-wechat-bowser>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Watch } from "vue-property-decorator";
import lodash from "lodash";
import { Observer } from "mobx-vue";
import { Debounce } from "lodash-decorators";
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
      ["index", "toclass", "stationery", "my", "search"],
      this.$route.name
    );
  }
  title = "";
  @Debounce(50)
  getTitle() {
    this.title = (document.head.firstElementChild as any).innerText;
  }
  // get title() {
  //   // return this.$t(this.$route.name);
  // }
  onClickLeft() {
    if (window.history.length > 2) {
      return this.$router.back();
    }
    return this.$router.push({ name: "index" });
  }
  onClickRight() {}
  mounted() {
    this.getTitle();
  }
  @Watch("$route")
  RouteUpdate(to, from, next) {
    console.warn("LENG: Navbar -> this", this);
    this.getTitle();
  }
  updated() {}
  destroyed() {}
}
</script>
<style lang="less">
@max-width: 1024px;
.xt-layout-nav {
  height: @nav-bar-height;
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
  &-fixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    .xt-wechat-bowser {
      padding: @nav-bar-height / 4;
    }
  }
  .van-nav-bar {
    max-width: @max-width;
    margin: auto;
  }
}
</style>

