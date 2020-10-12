<template>
  <div class="xt-course-id">
    <Vheader />
    <Vtabs />
    <van-grid :border="false" :column-num="2" class="xt-course-id-grid">
      <van-grid-item>
        <VSignup :give="true" />
      </van-grid-item>
      <van-grid-item>
        <VSignup />
      </van-grid-item>
    </van-grid>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import lodash from "lodash";
import Vtabs from "./views/tabs.vue";
import Vheader from "./views/header.vue";
import VSignup from "../views/signup.vue";
@Component({
  async fetch(ctx) {
    const store = ctx.store.$storeCourse.Details;
    await store.onLoading({
      courseId: ctx.params.id,
    });
  },
  validate({ params }) {
    return /^\d+$/.test(params.id);
  },
  components: { Vheader, Vtabs, VSignup },
})
export default class PageView extends Vue {
  head() {
    return this.$AppCreateShareData({
      title: this.PageStore.dataSource.courseName,
      desc: this.PageStore.dataSource.courseSubtitle,
      imgUrl: this.PageStore.dataSource.coursePictureUri,
    });
  }
  get PageStore() {
    return this.$store.$storeCourse.Details;
  }
  created() {}
  mounted() {}

  updated() {}
  destroyed() {}
}
</script>
<style lang="less" >
.xt-course-id {
  padding-bottom: 60px;
  &-grid {
    position: fixed;
    bottom: 0;
    width: 100%;
    left: 0;
    z-index: 99;
    .van-grid-item__content {
      padding: 0;
    }
  }
}
</style>
