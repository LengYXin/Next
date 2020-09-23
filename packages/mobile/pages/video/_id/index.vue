<template>
  <div class="xt-videoid">
    <xt-dplayer :options="options" @playing="onPlaying" />
    <div class="xt-content">
      <h1 v-text="PageStore.dataSource.title"></h1>
      <div v-text="PageStore.dataSource.summary" v-ellipsis="3"></div>
      <time v-dateFormat="PageStore.dataSource.publishTime" format="YYYY-MM-DD" />
      <van-grid class="xt-videoid-grid" direction="horizontal" column-num="3">
        <van-grid-item icon="chat-o" :text="String(PageStore.dataSource.playCount)" />
        <van-grid-item icon="friends-o" :text="String(PageStore.dataSource.commentCount)" />
        <VeLike :item="PageStore.dataSource" :list="false" />
      </van-grid>
      <VeComment />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import { Observer } from "mobx-vue";
import lodash from "lodash";
import VeLike from "../view/like.vue";
// import VeView from "../views/view.vue";
import VeComment from "./views/comment.vue";
import VeRecommend from "./views/recommend.vue";
@Observer
@Component({
  async fetch(ctx) {
    const store = ctx.store.$storeVideo.Details;
    await store.onLoading(ctx.params.id);
  },
  validate({ params }) {
    return /^\d+$/.test(params.id);
  },
  components: { VeLike, VeComment, VeRecommend },
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
  &-grid {
    color: @xt-yellow-6;
  }
}
</style>
