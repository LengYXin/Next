<template>
  <div class="xt-layout-nav" v-show="show">
    <xt-wechat-bowser>
      <van-nav-bar
        fixed
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
  title = this.getTitle();
  getTitle() {
    return (document.head.firstElementChild as any).innerText;
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
  mounted() {}
  @Watch("$route")
  RouteUpdate(to, from, next) {
    console.warn("LENG: Navbar -> this", this);
    lodash.delay(() => {
      this.title = this.getTitle();
    }, 100);
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

