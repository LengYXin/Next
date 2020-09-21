<template>
  <div class="xt-content xt-videoid">
    <div>
      <h1 v-text="PageStore.dataSource.title"></h1>
      <a-space size="large">
        <time v-dateFormat="PageStore.dataSource.publishTime" format="YYYY-MM-DD" />
        <VeView :item="PageStore.dataSource" />
        <xt-action title="0" icon="message" :statistics="PageStore.dataSource.commentCount" />
        <VeLike :item="PageStore.dataSource" />
      </a-space>
    </div>
    <xt-dplayer :options="options" @playing="onPlaying" />

    <a-row class="xt-videoid-row" :gutter="16">
      <a-col :span="16">
        <h1>视频介绍</h1>
        <div class="xt-ellipsis xt-videoid-summary" v-text="PageStore.dataSource.summary"></div>
        <VeComment />
      </a-col>
      <a-col :span="8">
        <h1>其他分享</h1>
        <VeRecommend />
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import { Observer } from "mobx-vue";
import { Context } from "@nuxt/types";
import lodash from "lodash";
import VeLike from "../views/like.vue";
import VeView from "../views/view.vue";
import VeComment from "./views/comment.vue";
import VeRecommend from "./views/recommend.vue";
@Observer
@Component({
  async fetch(ctx: Context) {
    const store = ctx.store.$storeVideo.Details;
    await store.onLoading(ctx.params.id);
  },
  validate({ params }) {
    return /^\d+$/.test(params.id);
  },
  components: { VeLike, VeView, VeComment, VeRecommend },
})
export default class PageView extends Vue {
  get id() {
    return this.$route.params.id;
  }
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
  onPlaying() {
    this.PageStore.onPlayNumber(this.id);
  }
  created() {
    this.$setBreadcrumb(
      { linksName: "视频分享", links: "video", linksKey: "video" },
      true
    ).setBreadcrumb({
      linksName: this.PageStore.dataSource.title,
    });
  }
  mounted() {
    // console.log(this.$route);
  }

  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scoped>
.xt-videoid {
  padding-bottom: @padding-lg;
  &-row {
    padding-top: @padding-lg;
  }
  &-summary {
    padding-bottom: @padding-lg;
  }
}
</style>
