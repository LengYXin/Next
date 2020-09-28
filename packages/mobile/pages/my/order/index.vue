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
      theme="yellow"
      :tabPane="PageStore.typelist"
      :defaultActiveKey="defaultActiveKey"
      @tabsChange="tabsChange"
    />
    <xt-refresh-list :Pagination="Pagination" :body="body">
      <template #renderItem="item">
        <div v-text="item.orderSn"></div>
      </template>
    </xt-refresh-list>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Observer } from "mobx-vue";
import lodash from "lodash";
@Observer
@Component({
  scrollToTop: true,
  // 每次进入页面都会调用
  async fetch(ctx) {
    const types = await ctx.store.$storeOrder.onGetTypelist();
  },
  components: {},
})
export default class PageView extends Vue {
  head() {
    return this.$AppCreateShareData({ title: "我的订单" });
  }
  get PageStore() {
    return this.$store.$storeOrder;
  }
  get Pagination() {
    return this.$store.$storeOrder.Pagination;
  }
  get body() {
    return { orderStatus: this.activeKey };
  }
  defaultActiveKey = "-1";
  activeKey = lodash.get(this.$route.query, "active", this.defaultActiveKey);
  tabsChange(activeKey) {
    this.activeKey = activeKey;
  }
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
