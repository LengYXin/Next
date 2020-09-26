/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:17:47
 * @modify date 2020-08-05 14:17:47
 * @desc 作业
 */
<template>
  <div class="xt-content xt-my-homework">
    <xt-tabs
      theme="yellow"
      :tabPane="tabPane"
      :defaultActiveKey="defaultActiveKey"
      @tabsChange="tabsChange"
    />
    <xt-refresh-list :Pagination="Pagination" :body="body">
      <template #renderItem="item">
      <div v-text="item.homeworkTitle"></div>
      </template>
    </xt-refresh-list>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Context } from "@nuxt/types";
import { Observer } from "mobx-vue";
import lodash from "lodash";
@Observer
@Component({
  // 每次进入页面都会调用
  async fetch(ctx: Context) {
    // await ctx.store.$storeStationery.onGetTypelist();
  },
  components: {},
})
export default class PageView extends Vue {
  head() {
    return this.$AppCreateShareData({ title: "我的作业" });
  }
  get PageStore() {
    return this.$store.$my;
  }
  get Pagination() {
    return this.PageStore.MyWork;
  }
  get body() {
    return { typeKey: this.activeKey };
  }
  tabPane = [
    { key: 1, title: "已评阅" },
    { key: 0, title: "已提交" },
  ];
  defaultActiveKey = 1;
  activeKey = lodash.get(this.$route.query, "active", this.defaultActiveKey);
  tabsChange(activeKey) {
    this.activeKey = activeKey;
  }
  created() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" >
</style>
