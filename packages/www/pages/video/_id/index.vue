<template>
  <div class="xt-content">
    <xt-dplayer />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import { Context } from "@nuxt/types";
import lodash from "lodash";
@Component({
  async fetch(ctx: Context) {
    await ctx.store.$storeCourse.onGetDetails({
      courseId: ctx.params.id,
    });
  },
  validate({ params }) {
    return /^\d+$/.test(params.id);
  },
  components: {},
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
</style>
