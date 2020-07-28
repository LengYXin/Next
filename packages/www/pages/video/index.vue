<template>
  <div class="xt-content xt-video">
    <a-spin :spinning="Pagination.loading">
      <a-row :gutter="16">
        <a-col v-for="item in Pagination.dataSource" :key="item.courseId" :span="8">
          <nuxt-link :to="`/video/${item.courseId}`">
            <a-card class="xt-video-card" :bordered="false">
              <img class="xt-video-img" v-lazy="item.courseThumPictureUri" />
              <div>
                <span v-text="item.courseName"></span>
                <span v-text="item.clickVolume"></span>
                <span v-text="item.likeNum"></span>
              </div>
            </a-card>
          </nuxt-link>
        </a-col>
      </a-row>
    </a-spin>
    <xt-pagination :Pagination="Pagination" :fetchBody="{}" :toQuery="true" />
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
