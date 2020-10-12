<template>
  <div class="xt-course-id">
    <h1 v-text="PageStore.dataSource.courseName"></h1>
    <img v-lazy="PageStore.dataSource.coursePictureUri" />
    <tabs />
    <van-grid :border="false" :column-num="2" class="xt-course-id-grid">
      <van-grid-item>
        <signup :give="true" />
      </van-grid-item>
      <van-grid-item>
        <signup />
      </van-grid-item>
    </van-grid>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import lodash from "lodash";
import tabs from "./views/tabs.vue";
import signup from "../views/signup.vue";
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
  components: { tabs, signup },
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
  &-grid {
    position: fixed;
    bottom: 0;
    width: 100%;
    .van-grid-item__content {
      padding: 0;
    }
  }
}
</style>
