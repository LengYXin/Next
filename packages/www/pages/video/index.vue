<template>
  <div class="xt-content xt-video">
    <List :loading="Pagination.loading" :dataSource="Pagination.dataSource" />
    <xt-pagination :Pagination="Pagination" :toQuery="true" @change="onCurrentChange" />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch, Provide } from "vue-property-decorator";
import { Context } from "@nuxt/types";
import { Observer } from "mobx-vue";
import List from "./views/list.vue";
import lodash from "lodash";
@Observer
@Component({
  // 每次进入页面都会调用
  fetch(ctx: Context) {
    // ctx.store.$storeVideo.Pagination.onReset().onLoading();
  },
  components: { List },
})
export default class PageView extends Vue {
  get PageStore() {
    return this.$store.$storeVideo;
  }
  // @Provide("Pagination")
  get Pagination() {
    return this.$store.$storeVideo.Pagination;
  }
  /**
   *  初始化 和 页码 更改调用
   */
  onCurrentChange(current, options) {
    this.Pagination.onCurrentChange(current);
  }
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" >
</style>
