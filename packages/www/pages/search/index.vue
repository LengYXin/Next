/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-06 17:13:24
 * @modify date 2020-08-06 17:13:24
 * @desc 搜索
 */

<template>
  <div class="xt-content">
    <a-affix :offset-top="72">
      <div>
        <a-input-search placeholder="input search text" size="large" />
        <xt-tabs :tabPane="tabPane" :defaultActiveKey="defaultActiveKey" @tabsChange="tabsChange" />
      </div>
    </a-affix>
    <keep-alive>
      <component
        v-bind:is="activeKey"
        :loading="false"
        :dataSource="Pagination.dataSource"
        :rowKey="Pagination.key"
      ></component>
    </keep-alive>
    <xt-infinite-loading :key="activeKey" @loading="onLoading" />
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
} from "@xt/client/entities";
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
    { key: "course", name: "课程" },
    { key: "about", name: "文章" },
    { key: "stationery", name: "商品" },
    { key: "videos", name: "视频" },
  ];
  defaultActiveKey = "course";
  activeKey = lodash.get(this.$route.query, "active", this.defaultActiveKey);
  tabsChange(activeKey) {
    this.activeKey = activeKey;
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
    this.onLoading();
  }
  mounted() {
    // console.log(this);
  }
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scoped>
</style>