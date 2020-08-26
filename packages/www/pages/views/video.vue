<template>
  <a-card :bordered="false" :loading="loading">
    <xt-dplayer class="xt-hoeme-video" :options="dplayer" />
    <a-descriptions class="xt-video-list">
      <a-descriptions-item>
        <a-badge class="xt-video-item xt-font-family-FZLTHJW" status="default" text="暄桐线上公开课" />
      </a-descriptions-item>
      <a-descriptions-item>
        <a-badge class="xt-video-item xt-font-family-FZLTHJW" status="default" text="如何上课和交作业" />
      </a-descriptions-item>
      <a-descriptions-item>
        <a-badge class="xt-video-item xt-font-family-FZLTHJW" status="default" text="暄桐线上公开课" />
      </a-descriptions-item>
      <a-descriptions-item>
        <a-badge class="xt-video-item xt-font-family-FZLTHJW" status="default" text="暄桐线上公开课" />
      </a-descriptions-item>
      <a-descriptions-item>
        <a-badge
          class="xt-video-item xt-font-family-FZLTHJW"
          status="default"
          text="ASK林曦 | 暄桐线上直播课的609天"
        />
      </a-descriptions-item>
      <a-descriptions-item>
        <a-badge class="xt-video-item xt-font-family-FZLTHJW" status="default" text="暄桐线上公开课" />
      </a-descriptions-item>
    </a-descriptions>
  </a-card>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Context } from "@nuxt/types";
import { Observer } from "mobx-vue";
import lodash from "lodash";
@Component({
  components: {},
})
export default class PageView extends Vue {
  loading = true;
  dataSource = {};
  dplayer = {
    video: {
      url:
        "https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4",
      pic: "https://i.loli.net/2019/06/06/5cf8c5d9c57b510947.png",
      // thumbnails: "https://i.loli.net/2019/06/06/5cf8c5d9c57b510947.png",
    },
  };
  created() {
    lodash.delay(() => {
      this.loading = false;
    }, 2000);
  }
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scoped>
.xt-hoeme-video {
  width: 560px;
  margin: auto;
}
.xt-video-list {
  margin-top: 46px;
}
</style>
<style lang="less" >
.xt-video-item {
  .ant-badge-status-text {
    color: #999899;
    font-size: 16px;
    line-height: 2.6;
  }
}
</style>