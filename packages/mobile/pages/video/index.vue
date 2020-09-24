/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:17:41
 * @modify date 2020-08-05 14:17:41
 * @desc [description]
 */
<template>
  <div class="xt-content xt-video">
    <xt-refresh-list :Pagination="Pagination" :body="body">
      <template #renderItem="item">
        <nuxt-link :to="{name:'video-id',params:{id:item.id}}">
          <div class="xt-video-item">
            <h1 class="xt-video-title" v-text="item.title"></h1>
            <div class="xt-video-des van-multi-ellipsis--l2" v-text="item.summary" v-show="item.summary"></div>
            <time class="xt-video-time" v-dateFormat="item.publishTime" format="YYYY-MM-DD" />
            <div class="xt-video-cover">
              <img v-lazy="item.videoCoverUrl" />
              <div class="xt-flex-center">
                <van-icon name="play-circle-o" />
              </div>
            </div>
            <van-grid class="xt-video-grid" direction="horizontal" column-num="3">
              <van-grid-item icon="friends-o" :text="String(item.playCount)" />
              <van-grid-item icon="chat-o" :text="String(item.commentCount)" />
              <VeLike :item="item" />
            </van-grid>
            <van-divider />
          </div>
        </nuxt-link>
      </template>
    </xt-refresh-list>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import { Observer } from "mobx-vue";
import VeLike from "./view/like.vue";
@Observer
@Component({
  name: "PageVideo",
  components: { VeLike },
})
export default class Page extends Vue {
  head() {
    return this.$AppCreateShareData({ title: "视频分享" });
  }
  get PageStore() {
    return this.$store.$storeVideo;
  }
  get Pagination() {
    return this.PageStore.Pagination;
  }
  get body() {
    return {};
  }

  created() {}
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less">
.xt-video {
  &-item {
    text-align: justify;
    color: #333;
  }
  &-title {
    font-size: 18px;
    line-height: 26px;
    margin: 16px 0;
    color: #333;
  }
  &-des {
    color: #555;
    font-size: 14px;
    margin: 16px 0;
  }
  &-time {
    color: #555;
    font-size: 14px;
    margin: 16px 0;
    display: block;
  }
  &-cover {
    border-radius: 5px;
    overflow: hidden;
    height: 180px;
    position: relative;
    img {
      display: block;
      object-fit: cover;
      height: 100%;
      width: 100%;
    }
    .xt-flex-center {
      background-color: @overlay-background-color;
      position: absolute;
      top: 0;
      left: 0;
      color: white;
      font-size: 40px;
    }
  }
  &-grid {
    color: @xt-yellow-6;
    &.van-hairline--top::after {
      opacity: 0;
    }
    .van-grid-item__content {
      &::after {
        opacity: 0;
      }
    }
  }
}
</style>
