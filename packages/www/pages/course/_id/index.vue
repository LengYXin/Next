<template>
  <div class="xt-content">
    <titleView />
    <tabsView />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import { Context } from "@nuxt/types";
import lodash from "lodash";
import tabsView from "./views/tabs.vue";
import titleView from "./views/title.vue";
@Component({
  async fetch(ctx: Context) {
    const store = ctx.store.$storeCourse;
    await store.onGetDetails({
      courseId: ctx.params.id,
    });
    // ctx.store.$menu.setBreadcrumb({
    //   linksName: store.details.courseName,
    // });
  },
  validate({ params }) {
    return /^\d+$/.test(params.id);
  },
  components: {
    tabsView,
    titleView,
  },
})
export default class PageView extends Vue {
  get PageStore() {
    return this.$store.$storeCourse;
  }
  created() {
   
  }
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
