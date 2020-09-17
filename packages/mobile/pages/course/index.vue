/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:17:41
 * @modify date 2020-08-05 14:17:41
 * @desc [description]
 */
<template>
  <van-pull-refresh :value="Pagination.loading" @refresh="onRefresh">
    <van-list
      :value="Pagination.loading"
      :finished="Pagination.finished"
      finished-text="没有更多了"
      @load="onLoading"
    >
      <div v-for="(item,index) in Pagination.dataSource" :key="index">
        <nuxt-link :to="`/course/${item.courseId}`">
          <img v-lazy="item.coursePictureUri" />
        </nuxt-link>
      </div>
    </van-list>
  </van-pull-refresh>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import { Observer } from "mobx-vue";
@Observer
@Component({
  components: {},
})
export default class Page extends Vue {
  head() {
    return this.$AppCreateShareData({ title: "全部课程" });
  }
  get PageStore() {
    return this.$store.$storeCourse;
  }
  get Pagination() {
    return this.PageStore.Pagination;
  }
  onRefresh() {
    this.Pagination.onReset();
    this.onLoading();
  }
  onLoading() {
    this.Pagination.onLoading({});
  }
  created() {
    // this.onLoading();
  }
  mounted() {
    
  }
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scoped>
</style>
