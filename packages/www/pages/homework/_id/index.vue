<template>
  <div class="xt-content xt-homework-id">交作业</div>
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
  get PageStore() {
    return this.$store.$storeStationery;
  }
  created() {
    this.$setBreadcrumb({ linksName: "交作业" }, true);
  }
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" >
</style>
