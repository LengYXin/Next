/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:17:41
 * @modify date 2020-08-05 14:17:41
 * @desc 写字的事
 */
<template>
  <xt-refresh-list :Pagination="Pagination" :body="body">
    <template #renderItem="item">
      <img v-lazy="item.thumbUrl" />
    </template>
  </xt-refresh-list>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import { Observer } from "mobx-vue";
import lodash from "lodash";
@Observer
@Component({
  components: {},
})
export default class Page extends Vue {
  get PageStore() {
    return this.$store.$storeAbout;
  }
  get Pagination() {
    return this.PageStore.Pagination;
  }
  get body() {
    return { columnId: lodash.get(this.$route.query, "active", 1) };
  }

  created() {}
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scoped>
</style>
