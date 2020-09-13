/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:17:41
 * @modify date 2020-08-05 14:17:41
 * @desc 去上课
 */
<template>
  <xt-refresh-list :Pagination="Pagination" :body="body">
    <template #renderItem="item">
      <img v-lazy="item.commodityCoverUrl" />
    </template>
  </xt-refresh-list>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import { Observer } from "mobx-vue";
@Observer
@Component({
  components: {},
})
export default class Page extends Vue {
  get PageStore() {
    return this.$store.$storeStationery;
  }
  get Pagination() {
    return this.PageStore.Pagination;
  }
  get body() {
    return { typeId: -1 };
  }

  created() {
  }
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scoped>
</style>
