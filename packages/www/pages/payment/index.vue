/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:17:47
 * @modify date 2020-08-05 14:17:47
 * @desc 支付
 */
<template>
  <div class="xt-content xt-payment">支付</div>
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
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" >
</style>
