<template>
  <div class="xt-content">
    <div>
      <h1 v-text="PageStore.details.title"></h1>
      <VeView :item="PageStore.details" />
      <VeLike :item="PageStore.details" />
    </div>
    <xt-dplayer :options="options" />
    <a-row>
      <a-col :span="16">
        <VeComment />
      </a-col>
      <a-col :span="8"></a-col>
    </a-row>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import { Context } from "@nuxt/types";
import lodash from "lodash";
import VeLike from "../views/like.vue";
import VeView from "../views/view.vue";
import VeComment from "./views/comment.vue";
import { toJS } from "mobx";
@Component({
  async fetch(ctx: Context) {
    const store = ctx.store.$storeVideo;
    await store.onGetDetails(ctx.params.id);
    ctx.store.$menu.setBreadcrumb({
      linksName: store.details.title,
    });
  },
  validate({ params }) {
    return /^\d+$/.test(params.id);
  },
  components: { VeLike, VeView, VeComment },
})
export default class PageView extends Vue {
  @Provide("VideoStore")
  get PageStore() {
    return this.$store.$storeVideo;
  }
  get options() {
    return {
      video: {
        thumbnails: this.PageStore.details.videoCoverUrl,
        pic: this.PageStore.details.videoCoverUrl,
        quality: toJS(this.PageStore.details.quality),
      },
    };
  }
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
