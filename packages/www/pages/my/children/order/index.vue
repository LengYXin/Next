/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:17:52
 * @modify date 2020-08-05 14:17:52
 * @desc 订单
 */
<template>
  <div class="xt-content">
    <xt-tabs
      :affix="true"
      :tabPane="PageStore.typelist"
      :defaultActiveKey="defaultActiveKey"
      @tabsChange="tabsChange"
    />
    <a-list class="xt-content" item-layout="horizontal" :data-source="Pagination.dataSource" :rowKey="Pagination.key">
      <RenderItem slot="renderItem" slot-scope="item" :dataSource="item" />
    </a-list>
    <!-- 存在 更改地址栏 页签的时候 设置 key 用于触发初始化 change   -->
    <xt-infinite-loading @loading="onLoading" :key="activeKey" />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Context } from "@nuxt/types";
import { Observer } from "mobx-vue";
import lodash from "lodash";
import RenderItem from "./views/item.vue";
@Observer
@Component({
  scrollToTop: true,
  // 每次进入页面都会调用
  async fetch(ctx: Context) {
    const types = await ctx.store.$storeOrder.onGetTypelist();
  },
  components: { RenderItem },
})
export default class PageView extends Vue {
  get PageStore() {
    return this.$store.$storeOrder;
  }
  get Pagination() {
    return this.$store.$storeOrder.Pagination;
  }
  defaultActiveKey = "-1";
  activeKey = lodash.get(this.$route.query, "active", this.defaultActiveKey);
  tabsChange(activeKey) {
    this.Pagination.onReset();
    this.activeKey = activeKey;
  }
  async onLoading(event) {
    this.Pagination.onLoading({ orderStatus: this.activeKey }, null, event);
  }
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
