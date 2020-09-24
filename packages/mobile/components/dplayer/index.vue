/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:16:12
 * @modify date 2020-08-05 14:16:12
 * @desc 视频
 */
<template>
  <!-- <div class="xt-dplayer" ref="dplayer">播放器</div> -->
  <video class="xt-dplayer" :src="src" controls autoplay :poster="poster"></video>
</template>

<script lang="ts">
// import dplayer from "dplayer";
import lodash from "lodash";
import { Component, Prop, Vue, Provide, Emit } from "vue-property-decorator";
@Component({
  components: {},
})
export default class extends Vue {
  @Prop() options;
  // @Prop() video;
  // dplayer: dplayer;
  isPlaying = false;
  get src() {
    return lodash.get(this.options, "video.quality[1].url");
  }
  get poster() {
    return lodash.gte(this.options, "video.pic");
  }
  mounted() {
    // console.log(lodash.cloneDeep(this.options));
    try {
      if (this.$refs.dplayer) {
        // this.dplayer = new dplayer(
        //   lodash.merge(
        //     {
        //       container: this.$refs.dplayer,
        //       screenshot: true,
        //       video: {
        //         defaultQuality: 1,
        //         // url:
        //         //   "https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4",
        //         // pic: "https://i.loli.net/2019/06/06/5cf8c5d9c57b510947.png",
        //         // thumbnails:
        //         //   "https://i.loli.net/2019/06/06/5cf8c5d9c57b510947.png",
        //       },
        //       // subtitle: {
        //       //   url: "https://s-sh-17-dplayercdn.oss.dogecdn.com/hikarunara.vtt",
        //       // },
        //       // danmaku: {
        //       //   id: "demo",
        //       //   api: "https://api.prprpr.me/dplayer/",
        //       // },
        //     },
        //     this.options
        //   )
        // );
        // this.dplayer.on("playing", () => {
        //   if (this.isPlaying) {
        //     return;
        //   }
        //   this.onPlaying();
        // });
      }
    } catch (error) {
      console.log("LENG: extends -> mounted -> error", error);
    }
  }
  @Emit("playing")
  onPlaying() {
    this.isPlaying = true;
    return true;
  }
  updated() {}
  destroyed() {
    try {
      // this.dplayer.destroy();
    } catch (error) {
      console.log("LENG: extends -> mounted -> error", error);
    }
  }
}
</script>

<style lang="less">
.xt-dplayer {
  width: 100%;
  height: auto;
  max-height: 210px;
  .dplayer-video {
    object-fit: cover;
  }
  .dplayer-controller {
    line-height: 30px;
  }
  .dplayer-icon {
    line-height: 20px;
  }
  .dplayer-full-in-icon {
    display: none !important;
  }
}
</style>