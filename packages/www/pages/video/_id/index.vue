<template>
  <div class="xt-content">
    <xt-dplayer />
    <xt-comment content="[太开心][鼓掌][嘻嘻][哈哈][笑cry][挤眼][黑线]">
      <template slot="actions">
        <xt-action @click="onLike" />
        <xt-action title="回复" />
      </template>
      <template slot="overlay">
        <a-menu>
          <a-menu-item>
            <a href="javascript:;">1st menu item</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;">2nd menu item</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;">3rd menu item</a>
          </a-menu-item>
        </a-menu>
      </template>
      <!-- <xt-editor /> -->
    </xt-comment>
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
  onLike() {
    console.log("onLike");
  }
  mounted() {
    // console.log(this.$route);
  }

  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scoped>
</style>
