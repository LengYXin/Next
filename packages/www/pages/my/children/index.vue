<!--
 * @Author: Erlin
 * @CreateTime: 2020-08-20 15:22:58
 * @LastEditTime: 2020-09-09 14:42:21
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
    <div class="xt-class-warp">
      <SingleList :dataSource="PageStore.SingleList" />
      <FullList :dataSource="PageStore.FullList" />
    </div>

    <a-row class="xt-class-foot xt-text-align-center" :gutter="[0, 16]">
      <a-col :span="24">
        <a-button size="large" type="primary" class="ant-btn-yellow">
          返回老教室
        </a-button>
      </a-col>
      <a-col :span="24" class="xt-font-family-FZLTHJW xt-text-yellow">
        点击此按钮，可以查看您所报名的《从书法之美到生活之美——全阶课程》或《从书法之美到生活之美——自在行草》课程。
      </a-col>
    </a-row>
    <!-- :loading="PageStore.loading" -->
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import lodash from "lodash";
import { Modal } from "ant-design-vue";
import { Observer } from "mobx-vue";
import { Context } from "@nuxt/types";
import SingleList from "./views/single.vue";
import FullList from "./views/full.vue";

@Observer
@Component({
  async fetch(ctx: Context) {
    let activeKey = lodash.get(ctx.query, "active", 0);
    await ctx.store.$my.onGetMyCourseList(activeKey);
  },
  scrollToTop: true,
  components: { SingleList, FullList },
})
export default class PageView extends Vue {
  @Provide("MyStore")
  get PageStore() {
    return this.$store.$my;
  }
  tabPane = [
    { key: 0, title: "全部" },
    { key: 1, title: "开课中" },
    { key: 2, title: "已结课" },
  ];
  defaultActiveKey = 0;
  activeKey = lodash.get(this.$route.query, "active", this.defaultActiveKey);
  tabsChange(activeKey) {
    this.activeKey = activeKey;
    this.PageStore.onGetMyCourseList(this.activeKey);
  }
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scope>
.xt-class {
  &-warp {
    padding-top: 45px;
  }
  &-foot {
    padding: 0px 196px 40px;
    line-height: 20px;
  }
}
</style>
