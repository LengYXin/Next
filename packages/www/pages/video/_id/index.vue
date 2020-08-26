<template>
  <div class="xt-content">
    <div>
      <h1 v-text="PageStore.dataSource.title"></h1>
      <VeView :item="PageStore.dataSource" />
      <VeLike :item="PageStore.dataSource" />
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
@Component({
  async fetch(ctx: Context) {
    const store = ctx.store.$storeVideo.Details;
    await store.onLoading(ctx.params.id);
  },
  validate({ params }) {
    return /^\d+$/.test(params.id);
  },
  components: { VeLike, VeView, VeComment },
})
export default class PageView extends Vue {
  @Provide("VideoStore")
  get VideoStore() {
    return this.$store.$storeVideo;
  }
  get PageStore() {
    return this.$store.$storeVideo.Details;
  }
  get options() {
    return {
      video: {
        // thumbnails: this.PageStore.dataSource.videoCoverUrl,
        pic: this.PageStore.dataSource.videoCoverUrl,
        quality: this.PageStore.dataSource.quality,
      },
    };
  }
  onLike() {
    console.log("onLike");
  }
  created() {
    this.$setBreadcrumb({ linksName: this.PageStore.dataSource.title }, true);
  }
  mounted() {
    // console.log(this.$route);
  }

  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scoped>
.xt-content {
  padding-bottom: @padding-lg;
}
</style>
