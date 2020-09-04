<!--
 * @Author: Erlin
 * @CreateTime: 2020-08-20 15:22:58
 * @LastEditTime: 2020-09-04 18:13:30
 * @LastEditors: Erlin
 * @Description: 去上课
-->

<template>
  <div class="xt-class">
    <xt-tabs
      :affix="true"
      theme="circle"
      :tabPane="tabPane"
      :defaultActiveKey="defaultActiveKey"
      @tabsChange="tabsChange"
    />
    <List :dataSource="PageStore.MyCourseList" />
    <!-- :loading="PageStore.loading" -->
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import lodash from "lodash";
import { Modal } from "ant-design-vue";
import { Observer } from "mobx-vue";
import { Context } from "@nuxt/types";
import List from "./views/list.vue";

@Observer
@Component({
  async fetch(ctx: Context) {
    await ctx.store.$my.onGetMyCourseList();
  },
  scrollToTop: true,
  components: { List },
})
export default class PageView extends Vue {
  @Provide("MyStore")
  get PageStore() {
    return this.$store.$my;
  }
  tabPane = [
    { key: 1, title: "全部" },
    { key: 2, title: "开课中" },
    { key: 3, title: "已结课" },
  ];
  defaultActiveKey = "1";
  activeKey = lodash.get(this.$route.query, "active", this.defaultActiveKey);
  tabsChange(activeKey) {
    // this.Pagination.onReset();
    this.activeKey = activeKey;
    // this.onLoading();
  }
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scope>
</style>
