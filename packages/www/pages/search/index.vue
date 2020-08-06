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

    <a-list
      :loading="Pagination.loading"
      item-layout="horizontal"
      :data-source="Pagination.dataSource"
      :rowKey="Pagination.key"
    >
      <nuxt-link slot="renderItem" slot-scope="item" :to="`/course/${item.courseId}`">
        <a-list-item>
          <a-list-item-meta>
            <h1 slot="title" v-text="item.courseName">名称</h1>
            <div slot="description">
              <div v-text="item.statusName"></div>
              <div>开课中</div>
            </div>
            <a-badge class="xt-badge-left" slot="avatar">
              <div class="xt-badge-text" slot="count">
                <div>直播</div>
                <div>课程</div>
              </div>
              <img width="480" height="270" alt="logo" v-lazy="item.coursePictureUri" />
            </a-badge>
          </a-list-item-meta>
        </a-list-item>
      </nuxt-link>
    </a-list>
    <!-- <xt-infinite-loading :key="activeKey" @loading="onLoading" /> -->
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import lodash from "lodash";
import { Observer } from "mobx-vue";
import { Context } from "@nuxt/types";
@Observer
@Component({
  components: {},
})
export default class PageView extends Vue {
  get Pagination() {
    return this.$store.$storeCourse.Pagination;
  }
  get PageStore() {
    return this.$store.$storeCourse;
  }
  tabPane = [
    { key: 1, name: "课程" },
    { key: 2, name: "文章" },
    { key: 3, name: "商品" },
    { key: 4, name: "视频" },
  ];
  defaultActiveKey = "1";
  activeKey = lodash.get(this.$route.query, "active", this.defaultActiveKey);
  tabsChange(activeKey) {
    this.Pagination.onReset();
    this.activeKey = activeKey;
    this.onLoading();
  }
  async onLoading(event?) {
    this.Pagination.onLoading({}, null, event);
  }
  created() {
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