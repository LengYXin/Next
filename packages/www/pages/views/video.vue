<template>
  <a-card :bordered="false" :loading="loading">
    <xt-dplayer :options="dplayer" />
    <a-descriptions>
      <a-descriptions-item>暄桐线上公开课</a-descriptions-item>
      <a-descriptions-item>暄桐线上公开课</a-descriptions-item>
      <a-descriptions-item>暄桐线上公开课</a-descriptions-item>
      <a-descriptions-item>暄桐线上公开课</a-descriptions-item>
      <a-descriptions-item>暄桐线上公开课</a-descriptions-item>
      <a-descriptions-item>暄桐线上公开课</a-descriptions-item>
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
      thumbnails: "https://i.loli.net/2019/06/06/5cf8c5d9c57b510947.png",
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
</style>