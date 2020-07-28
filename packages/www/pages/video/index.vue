<template>
  <div class="xt-content xt-video">
    <a-spin :spinning="Pagination.loading">
      <a-row :gutter="16">
        <a-col v-for="item in Pagination.dataSource" :key="item.courseId" :span="8">
          <a-card class="xt-video-card" :bordered="false">
            <img class="xt-video-img" v-lazy="item.courseThumPictureUri" />
            <div>
              <span v-text="item.courseName"></span>
              <span v-text="item.clickVolume"></span>
              <span v-text="item.likeNum"></span>
            </div>
          </a-card>
        </a-col>
      </a-row>
    </a-spin>
    <a-pagination
      class="xt-pagination-center"
      :current="Pagination.current"
      :total="Pagination.total"
      :pageSize="Pagination.pageSize"
      @change="Pagination.onCurrentChange"
    />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Context } from "@nuxt/types";
import { Observer } from "mobx-vue";
import lodash from "lodash";
@Observer
@Component({
  // 每次进入页面都会调用
  fetch(ctx: Context) {
    ctx.store.$storeVideo.Pagination.onReset().onLoading();
  },
  components: {},
})
export default class PageView extends Vue {
  get PageStore() {
    return this.$store.$storeVideo;
  }
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
