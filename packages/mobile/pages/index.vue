/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:17:41
 * @modify date 2020-08-05 14:17:41
 * @desc [description]
 */
<template>
  <div class="xt-home">
    <van-search shape="round" placeholder="搜索你感兴趣的内容" />
    <van-swipe class="xt-home-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe>
    <van-grid column-num="5">
      <van-grid-item
        v-for="item in grid"
        :key="item.key"
        icon="photo-o"
        :text="item.text"
        :to="item"
      />
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
  grid = [
    { key: 1, text: "全部课程", name: "course" },
    { key: 2, text: "写字的事", name: "about", query: { active: 2 } },
    { key: 3, text: "视频分享", name: "video" },
    { key: 4, text: "写字的人", name: "about", query: { active: 1 } },
    { key: 5, text: "同学作业", name: "homework-share" },
  ];
  created() {}
  mounted() {
    // console.log("LENG: PageView -> mounted -> this", this);
  }
  updated() {}
  destroyed() {}
}
</script>
<style lang="less">
.xt-home {
  height: 999px !important;
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
