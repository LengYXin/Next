
<template>
  <div class="xt-content">
    <xt-tabs
      :affix="true"
      align="right"
      :tabPane="tabPane"
      :defaultActiveKey="defaultActiveKey"
      @tabsChange="tabsChange"
    />
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
          <Signup slot="actions" :give="true" :id="item.courseId" />
          <Signup slot="actions" :id="item.courseId" />
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
import Signup from "./views/signup.vue";
@Observer
@Component({
  // 每次进入页面都会调用
  // fetch(ctx: Context) {
  //   ctx.store.$storeCourse.Pagination.onReset().onLoading({
  //     // pageIndex: 1,
  //     columnId: 1,
  //     sortType: 1,
  //     sortName: "Asc",
  //     courseStyle: "1",
  //   });
  // },
  components: { Signup },
})
export default class PageView extends Vue {
  get Pagination() {
    return this.$store.$storeCourse.Pagination;
  }
  get PageStore() {
    return this.$store.$storeCourse;
  }
  tabPane = [
    { key: 1, name: "按时间排序" },
    { key: 2, name: "按学费排序" },
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
<i18n>
{
  "en": {
    "give": "Give to others",
    "signup": "Sign up now"
  },
  "zh": {
    "give": "赠课给他人",
    "signup": "立即报名"
  }
}
</i18n>