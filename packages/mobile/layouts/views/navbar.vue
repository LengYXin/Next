<template>
  <div class="xt-layout-nav" v-show="PageStore.breadcrumbShow">
    <van-nav-bar
      fixed
      left-arrow
      :title="getTitle(PageStore.breadcrumb)"
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
  get PageStore() {
    return this.$store.$menu;
  }
  getTitle(breadcrumb) {
    return this.$t(lodash.get(lodash.last(breadcrumb), "linksName"));
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

