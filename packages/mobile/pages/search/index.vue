/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-06 17:13:24
 * @modify date 2020-08-06 17:13:24
 * @desc 搜索
 */

<template>
  <div>
    <van-search placeholder="请输入搜索关键词" show-action autofocus shape="round" @search="onSearch" @cancel="onCancel" />
    <van-tabs>
      <van-tab title="课程">内容 1</van-tab>
      <van-tab title="视频">内容 2</van-tab>
      <van-tab title="文章">内容 3</van-tab>
      <van-tab title="商品">内容 4</van-tab>
    </van-tabs>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import {
  ControllerAbout,
  ControllerCourse,
  ControllerHome,
  ControllerStationery,
  ControllerVideo,
} from "@xt/client";
import lodash from "lodash";
import { Observer } from "mobx-vue";
import { Context } from "@nuxt/types";
@Observer
@Component({
  components: {},
})
export default class PageView extends Vue {
  storeCourse = new ControllerCourse(this.$ajax);
  storeAbout = new ControllerAbout(this.$ajax);
  storeStationery = new ControllerStationery(this.$ajax);
  @Provide("VideoStore")
  storeVideo = new ControllerVideo(this.$ajax);
  get Pagination() {
    switch (this.activeKey) {
      case "course":
        return this.storeCourse.Pagination;
        break;
      case "about":
        return this.storeAbout.Pagination;
        break;
      case "stationery":
        return this.storeStationery.Pagination;
        break;
      case "videos":
        return this.storeVideo.Pagination;
        break;
    }
  }
  // get PageStore() {
  //   return this.$store.$storeCourse;
  // }
  tabPane = [
    { key: "course", title: "课程" },
    { key: "about", title: "文章" },
    { key: "stationery", title: "商品" },
    { key: "videos", title: "视频" },
  ];
  defaultActiveKey = "course";
  activeKey = lodash.get(this.$route.query, "active", this.defaultActiveKey);
  tabsChange(activeKey) {
    this.activeKey = activeKey;
    this.Pagination.onReset({ infinite: true });
  }
  async onLoading(event?) {
    let body = {};
    switch (this.activeKey) {
      case "course":
        break;
      case "about":
        body = {
          columnId: "1",
        };
        break;
      case "stationery":
        body = {
          typeId: "-1",
          commodityName: "",
        };
        break;
      case "videos":
        break;
    }
    this.Pagination.onLoading(body, null, event);
  }
  onSearch() {}
  onCancel() {
    this.$router.replace("/");
  }
  created() {
    this.Pagination.onReset({ infinite: true });
  }
  mounted() {
    console.log("LENG: PageView -> mounted -> this", this);
  }
  updated() {}
  destroyed() {}
}
</script>
<style lang="less">
@searchHeight: 340px;
// layout 自动注入 类名
.xt-page-search {
  .xt-breadcrumb {
    transform: translateY(@searchHeight);
  }
  &-input {
    transform: translateY(-67px);
    height: @searchHeight;
    background: url(/images/background/search.png);
    background-position: bottom;
    background-repeat: no-repeat;
    background-size: cover;
    text-align: center;
    .xt-flex-center {
      max-width: 700px;
      margin: auto;
    }
    // .ant-input-search-button {
    //   background: @xt-green-6;
    //   color: @white;
    // }
  }
  &-statistics {
    font-size: @font-size-md;
    font-weight: 400;
    color: @xt-grey-6;
    padding: 20px 0;
    span {
      color: @xt-green-6;
    }
  }
}
</style>