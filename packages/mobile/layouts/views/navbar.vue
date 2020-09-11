<template>
  <div class="xt-layout-nav">
    <van-nav-bar
      fixed
      title="标题"
      left-text="返回"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Watch } from "vue-property-decorator";
@Component({
  components: {},
})
export default class Page extends Vue {
  onClickLeft() {}
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
<style lang="less">
.xt-layout-nav {
  height: @nav-bar-height;
}
</style>


