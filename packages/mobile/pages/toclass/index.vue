/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:17:41
 * @modify date 2020-08-05 14:17:41
 * @desc 去上课
 */
<template>
  <div>
    <xt-wechat-bowser>
      <van-nav-bar title="上课" fixed placeholder>
        <template #right>我的全部课程</template>
      </van-nav-bar>
      <van-cell slot="yes" title=" " fixed placeholder>
        <template #right-icon>我的全部课程</template>
      </van-cell>
    </xt-wechat-bowser>
    <xt-inspect inspect>
      <xt-refresh-list :Pagination="Pagination" :body="body">
        <template #renderItem="item">
          <img v-lazy="item.commodityCoverUrl" />
        </template>
      </xt-refresh-list>
      <!-- <div class="xt-inspect-center" slot="not">
        <van-button type="primary">返回老教室</van-button>
        <div>点击此按钮，可以查看您所报名的《从书法之美到生活之美——全阶课程》或《从书法之美到生活之美——自在行草》课程。</div>
      </div> -->
    </xt-inspect>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import { Observer } from "mobx-vue";
@Observer
@Component({
  name: "PageClass",
  components: {},
})
export default class Page extends Vue {
  head() {
    return this.$AppCreateShareData({ title: "去上课" });
  }
  get PageStore() {
    return this.$store.$storeStationery;
  }
  get Pagination() {
    return this.PageStore.Pagination;
  }
  get body() {
    return { typeId: -1 };
  }

  created() {}
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scoped>
</style>
