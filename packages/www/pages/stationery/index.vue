/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:17:47
 * @modify date 2020-08-05 14:17:47
 * @desc [description]
 */
<template>
  <div class="xt-content xt-stationery">
    <div class="xt-stationery-search-box"><a-icon type="shopping-cart" /></div>
    <xt-tabs
      theme="circle"
      :tabPane="PageStore.typelist"
      :defaultActiveKey="defaultActiveKey"
      @tabsChange="tabsChange"
    />
    <List :loading="Pagination.loading" :dataSource="Pagination.dataSource" />
    <!-- 存在 更改地址栏 页签的时候 设置 key 用于触发初始化 change   -->
    <xt-pagination
      :key="activeKey"
      :Pagination="Pagination"
      :toQuery="true"
      @change="onCurrentChange"
    />
  </div>
</template>
<script lang="ts">
import { Component, Provide, Vue, Watch } from "vue-property-decorator";
import { Context } from "@nuxt/types";
import { Observer } from "mobx-vue";
import List from "./views/list.vue";
import lodash from "lodash";
@Observer
@Component({
  // 每次进入页面都会调用
  async fetch(ctx: Context) {
    await ctx.store.$storeStationery.onGetTypelist();
  },
  components: { List },
})
export default class PageView extends Vue {
  @Provide("StationeryStore")
  get PageStore() {
    return this.$store.$storeStationery;
  }
  get Pagination() {
    return this.$store.$storeStationery.Pagination;
  }
  defaultActiveKey = "-1";
  activeKey = lodash.get(this.$route.query, "active", this.defaultActiveKey);
  async tabsChange(activeKey) {
    this.Pagination.onReset();
    this.activeKey = activeKey;
  }
  /**
   *  初始化 和 页码 更改调用
   */
  onCurrentChange(current, reset = false) {
    this.Pagination.onCurrentChange(current, {
      typeId: this.activeKey,
      commodityName: "",
    });
  }
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scoped>
.xt-stationery {
  padding-bottom: @padding-lg;
}
</style>
<i18n>
{
  "en": {
    "all": "All",
    "studyRoom": "Study Room",
    "book": "Book",
    "tea": "Tea",
    "fragrant": "Fragrant",
    "qin": "Qin",
    "furniture": "Furniture",
    "other": "Other"
  },
  "zh": {
    "all": "全部",
    "studyRoom": "文房",
    "book": "书",
    "tea": "茶",
    "fragrant": "香",
    "qin": "琴",
    "furniture": "家具",
    "other": "其他"
  }
}
</i18n>