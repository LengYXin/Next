/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-06 17:14:10
 * @modify date 2020-08-06 17:14:10
 * @desc 课程
 */

<template>
  <div class="xt-content">
    <xt-tabs
      :affix="true"
      align="right"
      theme="not"
      :tabPane="tabPane"
      :defaultActiveKey="defaultActiveKey"
      @tabsChange="tabsChange"
    />
    <List
      :loading="Pagination.loading"
      :dataSource="Pagination.dataSource"
      :rowKey="Pagination.key"
    />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import lodash from "lodash";
import { Observer } from "mobx-vue";
import { Context } from "@nuxt/types";
import List from "./views/list.vue";
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
  components: { List },
})
export default class PageView extends Vue {
  @Provide("CourseStore")
  get PageStore() {
    return this.$store.$storeCourse;
  }
  get Pagination() {
    return this.$store.$storeCourse.Pagination;
  }

  tabPane = [
    { key: 1, title: "按时间排序" },
    { key: 2, title: "按学费排序" },
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