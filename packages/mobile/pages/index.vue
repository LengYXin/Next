/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:17:41
 * @modify date 2020-08-05 14:17:41
 * @desc [description]
 */
<template>
  <div class="xt-home">
    <van-swipe class="xt-home-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe>
    <van-grid>
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
      <van-grid-item icon="photo-o" text="文字" />
    </van-grid>
    <van-button class="van-button" type="primary">主要按钮</van-button>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import { Observer } from "mobx-vue";
@Observer
@Component({
  name: "PageIndex",
  components: {},
})
export default class PageIndex extends Vue {
  created() {}
  mounted() {
    console.log("LENG: PageView -> mounted -> this", this);
  }
  updated() {}
  destroyed() {}
}
</script>
<style lang="less">
.xt-home {
  &-swipe {
    .van-swipe-item {
      color: @green;
      font-size: 20px;
      line-height: 150px;
      text-align: center;
      background-color: #39a9ed;
    }
  }
}
</style>
