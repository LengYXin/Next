/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-06 17:13:24
 * @modify date 2020-08-06 17:13:24
 * @desc 搜索
 */

<template>
  <div>
    <!-- <a-affix :offset-top="72"> -->
    <div class="xt-page-search-input">
      <div class="xt-flex-center">
        <a-input-search placeholder="搜索你感兴趣的内容" size="large">
          <a-button slot="enterButton" type="primary" icon="search">搜索</a-button>
        </a-input-search>
      </div>
    </div>
    <div class="xt-content">
      <xt-tabs
        theme="circle"
        :tabPane="tabPane"
        :defaultActiveKey="defaultActiveKey"
        @tabsChange="tabsChange"
      />
      <h1 class="xt-page-search-statistics">
        为你搜索到
        <span v-text="Pagination.dataSource.length" /> 个相关结果
      </h1>
      <!-- </a-affix> -->
      <!-- <keep-alive> -->
        <component
          v-bind:is="activeKey"
          :loading="false"
          :dataSource="Pagination.dataSource"
          :rowKey="Pagination.key"
        ></component>
      <!-- </keep-alive> -->
    </div>
    <xt-infinite-loading :identifier="Pagination.onlyKey" @loading="onLoading" />
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
import about from "~/pages/about/views/list.vue";
import course from "~/pages/course/views/list.vue";
import stationery from "~/pages/stationery/views/list.vue";
import videos from "~/pages/video/views/list.vue";
@Observer
@Component({
  components: { course, about, stationery, videos },
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
    this.setBreadcrumb();
    this.Pagination.onReset({ infinite: true });
    // this.onLoading();
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
  created() {
    this.Pagination.onReset({ infinite: true });
    this.setBreadcrumb();
    // this.onLoading();
  }
  /**
   * 设置 面包屑
   */
  setBreadcrumb() {
    const linksName = `搜索${
      lodash.find(this.tabPane, ["key", this.activeKey]).title
    }`;
    this.$setBreadcrumb(
      {
        linksName,
      },
      true
    );
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
    background: url(/images/search-bg.png);
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