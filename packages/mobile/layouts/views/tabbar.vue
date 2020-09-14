<template>
  <div class="xt-layout-tabbar">
    <div class="xt-layout-tabbar-fixed">
      <van-tabbar class="xt-tabbar" :fixed="false" route :active-color="activeColor">
        <van-tabbar-item replace to="/">
          <span>首页</span>
          <template #icon="props">
            <van-icon :name="props.active ? 'wap-home' : 'wap-home-o'" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item replace to="/toclass">
          <span>去上课</span>
          <template #icon>
            <van-icon name="cashier-o" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item replace to="/stationery">
          <span>暄桐文房</span>
          <template #icon="props">
            <van-icon :name="props.active ? 'shopping-cart' : 'shopping-cart-o'" />
          </template>
        </van-tabbar-item>
        <van-tabbar-item icon="setting-o" replace to="/user">
          <span>我的</span>
          <template #icon="props">
            <van-icon :name="props.active ? 'friends' : 'friends-o'" />
          </template>
        </van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
@Component({
  components: {},
})
export default class Page extends Vue {
  get activeColor() {
    return "#097276";
  }
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less">
@max-width: 750px;
.xt-layout-tabbar {
  height: @tabbar-height;
  &-fixed {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .van-tabbar {
    max-width: @max-width;
    margin: auto;
  }
}
</style>


