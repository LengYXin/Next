<template>
  <div class="xt-content xt-about">
    <a-affix :offset-top="72">
      <a-tabs :activeKey="activeKey" @change="tabsChange" class="xt-tabs-center">
        <a-tab-pane v-for="tab in PageStore.typelist" :key="String(tab.typeId)">
          <span slot="tab">
            <span v-text="tab.typeName"></span>
          </span>
        </a-tab-pane>
      </a-tabs>
    </a-affix>
    <a-list
      :loading="Pagination.loading"
      class="xt-content"
      item-layout="horizontal"
      :data-source="Pagination.dataSource"
    >
      <a slot="renderItem" slot-scope="item" target="_blank" :href="item.articleUrl">
        <a-list-item>
          <a-list-item-meta>
            <h1 slot="title" v-text="item.articleTitle">名称</h1>
            <div slot="description">
              <div v-text="item.articleIntroduction"></div>
            </div>
            <a-badge class="xt-badge-left" slot="avatar">
              <div class="xt-badge-text" slot="count">
                <div v-text="item.publishTime">直播</div>
              </div>
              <img width="480" height="270" alt="logo" v-lazy="item.thumbUrl" />
            </a-badge>
          </a-list-item-meta>
        </a-list-item>
      </a>
    </a-list>
    <xt-infinite-loading @loading="onLoading" :key="activeKey" />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Context } from "@nuxt/types";
import { Observer } from "mobx-vue";
import lodash from "lodash";
function getActive(query) {
  return lodash.get(query, "active", "1");
}
function getTypeId(ctx: Context, types) {
  const activeKey = getActive(ctx.query);
  if (
    activeKey &&
    lodash.some(types, ["typeId", lodash.toInteger(activeKey)])
  ) {
    return activeKey;
  }
  return 1;
}
@Observer
@Component({
  // 每次进入页面都会调用
  async fetch(ctx: Context) {
    const types = await ctx.store.$storeAbout.onGetTypelist();
  },
  components: {},
})
export default class PageView extends Vue {
  get PageStore() {
    return this.$store.$storeAbout;
  }
  get Pagination() {
    return this.$store.$storeAbout.Pagination;
  }
  activeKey = getActive(this.$route.query);
  tabsChange(activeKey) {
    this.$router.push({
      query: lodash.merge({}, this.$route.query, {
        active: activeKey,
      }),
    });
  }
  async onLoading(event) {
    this.Pagination.onLoading({ columnId: this.activeKey }, null, event);
  }
  // 组件中 使用不了 生命周期 beforeRouteUpdate
  @Watch("$route.query.active")
  queryUpdate(to, from, next) {
    const { active } = this.$route.query;
    if (active && !lodash.eq(active, this.activeKey)) {
      this.activeKey = active as any;
      // this.onLoading(1);
      this.Pagination.onReset();
    }
    // next();
  }
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" >
.xt-about {
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
