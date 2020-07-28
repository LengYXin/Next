<template>
  <div class="xt-content xt-stationery">
    <a-tabs :activeKey="activeKey" @change="tabsChange" class="xt-tabs-center">
      <a-tab-pane v-for="tab in PageStore.typelist" :key="String(tab.typeId)">
        <span slot="tab">
          <span v-text="tab.typeName"></span>
        </span>
      </a-tab-pane>
    </a-tabs>
    <a-spin :spinning="Pagination.loading">
      <a-row :gutter="16">
        <a-col v-for="item in Pagination.dataSource" :key="item.commodityId" :span="6">
          <nuxt-link :to="`/stationery/${item.commodityId}`">
            <a-card class="xt-stationery-card" :bordered="false">
              <img class="xt-stationery-img" v-lazy="item.commodityCoverUrl" />
            </a-card>
          </nuxt-link>
        </a-col>
      </a-row>
    </a-spin>
    <xt-pagination
      v-if="PageStore.typelist.length"
      :Pagination="Pagination"
      :fetchBody="fetchBody"
      :toQuery="true"
    />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Context } from "@nuxt/types";
import { Observer } from "mobx-vue";
import lodash from "lodash";
function getActive(query) {
  return lodash.get(query, "active", "-1");
}
// function getTypeId(query, types) {
//   const activeKey = getActive(query);
//   if (
//     activeKey &&
//     lodash.some(types, ["typeId", lodash.toInteger(activeKey)])
//   ) {
//     return activeKey;
//   }
//   return -1;
// }
@Observer
@Component({
  // 每次进入页面都会调用
  async fetch(ctx: Context) {
    const types = await ctx.store.$storeStationery.onGetTypelist();
    // const res = await ctx.store.$storeStationery.Pagination.onReset().onLoading(
    //   {
    //     typeId: getTypeId(ctx.query, types),
    //     commodityName: "",
    //   }
    // );
  },
  components: {},
})
export default class PageView extends Vue {
  get PageStore() {
    return this.$store.$storeStationery;
  }
  get Pagination() {
    return this.$store.$storeStationery.Pagination;
  }
  get fetchBody() {
    return {
      typeId: this.activeKey,
    };
  }
  activeKey = getActive(this.$route.query);
  // tabPane = [
  //   "all",
  //   "studyRoom",
  //   "book",
  //   "tea",
  //   "fragrant",
  //   "qin",
  //   "furniture",
  //   "other",
  // ];
  tabsChange(activeKey) {
    this.activeKey = activeKey;
    const { current } = this.$route.query;
    this.$router.push({
      query: lodash.merge({}, this.$route.query, {
        active: activeKey,
        current: "1",
      }),
    });
    // 分页组件已经检测了 current 变更 但是 active 不会 触发
    if (lodash.eq(String(current), "1") || lodash.isNil(current)) {
      this.Pagination.onReset().onLoading({
        typeId: this.activeKey,
        commodityName: "",
      });
    }
  }
  // 组件中 使用不了 生命周期 beforeRouteUpdate
  // @Watch("$route.query.active")
  // queryUpdate(to, from, next) {
  //   const { active } = this.$route.query;
  //   if (active && !lodash.eq(active, this.activeKey)) {
  //     this.activeKey = active as any;
  //     this.Pagination.onReset().onLoading({
  //       typeId: this.activeKey,
  //       commodityName: "",
  //     });
  //   }
  //   // next();
  // }
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" >
.xt-stationery {
  &-card {
    .ant-card-body {
      padding: 20px 0;
    }
  }
  &-img {
    width: 230px;
    height: 230px;
    display: block;
    margin: auto;
  }
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