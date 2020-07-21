<template>
  <div ref="dplayer">播放器</div>
</template>

<script lang="ts">
import dplayer from "dplayer";
import lodash from "lodash";
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
@Component({
  components: {}
})
export default class extends Vue {
  @Prop() options;
  mounted() {
    // console.log(this);
    try {
      new dplayer(
        lodash.merge(
          {
            container: this.$refs.dplayer,
            screenshot: true,
            video: {
              url:
                "https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4",
              pic: "https://i.loli.net/2019/06/06/5cf8c5d9c57b510947.png",
              thumbnails: "https://i.loli.net/2019/06/06/5cf8c5d9c57b510947.png"
            },
            subtitle: {
              url: "https://s-sh-17-dplayercdn.oss.dogecdn.com/hikarunara.vtt"
            },
            danmaku: {
              id: "demo",
              api: "https://api.prprpr.me/dplayer/"
            }
          },
          this.options
        )
      );
    } catch (error) {
      console.log("LENG: extends -> mounted -> error", error);
    }
  }
  updated() {}
  destroyed() {}
}
</script>

<style>
</style>