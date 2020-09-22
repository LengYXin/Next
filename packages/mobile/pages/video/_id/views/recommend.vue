/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-06 17:14:10
 * @modify date 2020-08-06 17:14:10
 * @desc 视频 其他分享
 */

<template>
  <a-list item-layout="horizontal" :data-source="Pagination.dataSource" :rowKey="Pagination.key">
    <xt-hover class="xt-video-recommend" slot="renderItem" slot-scope="item">
      <img class="xt-video-recommend-img" v-lazy="item.videoCoverThumbUrl" />
      <div class="xt-video-recommend-title" v-text="item.title"></div>
      <template #hover>
        <nuxt-link class="xt-flex-center" :to="`/video/${item.id}`">
          <a-icon class="xt-video-recommend-play" type="play-circle" />
        </nuxt-link>
      </template>
    </xt-hover>
  </a-list>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import lodash from "lodash";
import { Observer } from "mobx-vue";
@Observer
@Component({
  components: {},
})
export default class PageView extends Vue {
  get PageStore() {
    return this.$store.$storeVideo;
  }
  get Pagination() {
    return this.$store.$storeVideo.RecommendPagination;
  }
  get id() {
    return this.$route.params.id;
  }
  created() {
    this.Pagination.onLoading({ videoShareId: this.id });
  }
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scoped>
.xt-video-recommend {
  display: block;
  position: relative;
  margin-bottom: @padding-lg;
  &-img {
    width: 100%;
    height: 180px;
    object-fit: cover;
  }
  &-title {
    // background: @modal-mask-bg;
    height: 44px;
    line-height: 44px;
    position: absolute;
    width: 100%;
    bottom: 0;
    padding: 0 @padding-lg;
    color: @white;
  }
  &-play {
    color: @white !important;
    font-size: 50px;
  }
}
</style>