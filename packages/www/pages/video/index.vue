<template>
  <div class="xt-content xt-video">
    <a-spin :spinning="Pagination.loading">
      <a-row :gutter="16">
        <a-col v-for="item in Pagination.dataSource" :key="item.id" :span="8">
          <a-card class="xt-video-card" :bordered="false">
            <xt-hover>
              <img class="xt-video-img" v-lazy="item.videoCoverThumbUrl" />
              <div>
                <span v-text="item.title"></span>
                <span v-text="item.viewCount"></span>
                <span @click.stop.prevent="PageStore.onLikes(item)" v-text="item.likeCount"></span>
              </div>
              <template #hover>
                <nuxt-link :to="`/video/${item.id}`">
                  <div>GO</div>
                </nuxt-link>
              </template>
            </xt-hover>
          </a-card>
        </a-col>
      </a-row>
    </a-spin>
    <xt-pagination :Pagination="Pagination" :toQuery="true" @change="onCurrentChange" />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch, Provide } from "vue-property-decorator";
import { Context } from "@nuxt/types";
import { Observer } from "mobx-vue";
import lodash from "lodash";
@Observer
@Component({
  // 每次进入页面都会调用
  fetch(ctx: Context) {
    // ctx.store.$storeVideo.Pagination.onReset().onLoading();
  },
  components: {},
})
export default class PageView extends Vue {
  get PageStore() {
    return this.$store.$storeVideo;
  }
  // @Provide("Pagination")
  get Pagination() {
    return this.$store.$storeVideo.Pagination;
  }
  /**
   *  初始化 和 页码 更改调用
   */
  onCurrentChange(current, options) {
    this.Pagination.onCurrentChange(current);
  }
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" >
.xt-video {
  &-card {
    .ant-card-body {
      padding: 20px 0;
    }
  }
  &-img {
    width: 320px;
    height: 180px;
    display: block;
    margin: auto;
  }
}
</style>
