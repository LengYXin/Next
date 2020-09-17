<template>
  <div class="xt-course-id">
    <h1 v-text="PageStore.dataSource.courseName"></h1>
    <img v-lazy="PageStore.dataSource.coursePictureUri" />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import lodash from "lodash";
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
  components: {},
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
  mounted() {
  }

  updated() {}
  destroyed() {}
}
</script>
<style lang="less" >
</style>
