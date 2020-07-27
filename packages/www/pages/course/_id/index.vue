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
  fetch(ctx: Context) {
    ctx.store.$storeCourse.onGetDetails({
      courseId: ctx.params.id,
    });
  },
  validate({ params }) {
    // 必须是number类型
    return /^\d+$/.test(params.id);
    // return false;
  },
  components: {
    tabsView,
    titleView,
  },
})
export default class PageView extends Vue {
  mounted() {
    // console.log(this.$route);
  }

  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scoped>
.ant-tabs {
  text-align: center;
}
</style>
