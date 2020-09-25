/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:17:41
 * @modify date 2020-08-05 14:17:41
 * @desc [description]
 */
<template>
  <div>
    <xt-wechat-bowser>
      <van-nav-bar title="暄桐文房" />
    </xt-wechat-bowser>
    <van-search shape="round" placeholder="查找我想要的" input-align="center" />
    <van-tree-select
      :height="height"
      :items="getItems(PageStore.typelist)"
      :main-active-index.sync="activeKey"
      @click-nav="tabsChange"
    >
      <template #content>
        <xt-refresh-list :key="activeKey" :Pagination="Pagination" :body="body">
          <van-grid :border="false" column-num="2">
            <van-grid-item
              v-for="item in Pagination.dataSource"
              :key="item.commodityId"
            >
              <a :href="item.commodityUrl" target="_blank">
                <van-image lazy-load :src="item.commodityCoverUrl" fit="cover" />
                <div class="xt-stationery-info">
                  <div
                    class="xt-stationery-name xt-text-gray van-multi-ellipsis--l2"
                    v-text="item.commodityName"
                  ></div>
                  <div
                    class="xt-stationery-money xt-text-yellow"
                    v-money="item.commodityPrice"
                  ></div>
                </div>
              </a>
            </van-grid-item>
          </van-grid>
        </xt-refresh-list>
      </template>
    </van-tree-select>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import { Observer } from "mobx-vue";
import { Context } from "@nuxt/types";
import lodash from "lodash";
@Observer
@Component({
  name: "PageStationery",
  // 每次进入页面都会调用
  async fetch(ctx: Context) {
    ctx.store.$storeStationery.onGetTypelist();
  },
  components: {},
})
export default class Page extends Vue {
  head() {
    return this.$AppCreateShareData({ title: "暄桐文房" });
  }
  get PageStore() {
    return this.$store.$storeStationery;
  }
  get Pagination() {
    return this.PageStore.Pagination;
  }
  get body() {
    return {
      typeId: lodash.get(
        this.PageStore.typelist,
        `[${this.activeKey}].key`,
        -1
      ),
    };
  }
  get height() {
    return `calc(100% - ${this.$store.$global.WechatBowser ? 54 : 100}px)`;
  }
  getItems(typelist) {
    return lodash.map(typelist, (item) => {
      return { text: item.title, ...item };
    });
  }
  activeKey = 0;
  tabsChange(activeKey) {
    this.activeKey = activeKey;
    this.Pagination.onReset({ infinite: true });
  }
  created() {}
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less">
.xt-page-stationery {
  height: 100%;
  .van-sidebar {
    max-width: 60px;
  }
  .van-grid-item__content {
    padding-top: 8px;
  }
}
.xt-stationery {
  &-info {
    min-height: 60px;
  }
  &-name {
    text-align: left;
    width: 100%;
  }
  &-money {
    text-align: left;
    width: 100%;
  }
}
</style>
