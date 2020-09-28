/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:17:52
 * @modify date 2020-08-05 14:17:52
 * @desc [description]
 */
<template>
  <div class="xt-content xt-about">
    <xt-tabs
      :affix="true"
      theme="black"
      :tabPane="PageStore.typelist"
      :defaultActiveKey="defaultActiveKey"
      @tabsChange="tabsChange"
    />
    <a-divider></a-divider>
    <List :loading="Pagination.loading" :data-source="Pagination.dataSource" />
    <!-- 存在 更改地址栏 页签的时候 设置 key 用于触发初始化 change   -->
    <xt-infinite-loading @loading="onLoading" :identifier="Pagination.onlyKey" />
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
  name: "PageAbout",
  // 每次进入页面都会调用
  async fetch(ctx: Context) {
    ctx.store.$storeAbout.onGetTypelist();
  },
  components: { List },
})
export default class PageView extends Vue {
  @Provide("AboutStore")
  get PageStore() {
    return this.$store.$storeAbout;
  }
  get Pagination() {
    return this.$store.$storeAbout.Pagination;
  }
  defaultActiveKey = "1";
  activeKey = lodash.get(this.$route.query, "active", this.defaultActiveKey);
  tabsChange(activeKey) {
    this.Pagination.onReset();
    this.activeKey = activeKey;
  }
  async onLoading(event) {
    this.Pagination.onLoading({ columnId: this.activeKey }, null, event);
  }
  mounted() {}
  updated() {}
  destroyed() {
    // 无限滚动列表 销毁时 清理
    this.Pagination.onReset();
  }
}
</script>
<style lang="less" >
.xt-about {
  .ant-divider {
    background: transparent;
  }
}
</style>
