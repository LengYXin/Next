<template>
  <div class="xt-course-id">
    <!-- 课程标题信息 -->
    <headerView />
    <tabsView />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import { Context } from "@nuxt/types";
import lodash from "lodash";
import tabsView from "./views/tabs.vue";
import headerView from "./views/header.vue";
@Component({
  async fetch(ctx: Context) {
    const store = ctx.store.$storeCourse.Details;
    await store.onLoading({
      courseId: ctx.params.id,
    });
  },
  validate({ params }) {
    return /^\d+$/.test(params.id);
  },
  components: {
    tabsView,
    headerView,
  },
})
export default class PageView extends Vue {
  get PageStore() {
    return this.$store.$storeCourse.Details;
  }
  created() {}
  mounted() {
    // console.log(this.$route);
  }

  updated() {}
  destroyed() {}
}
</script>
<style lang="less" >
@background: #f8f3ee;
.ant-layout-content.xt-page-course-id {
  padding: 60px 0;
  background: @background !important;
  .ant-card {
    background: @background;
  }
}
</style>
