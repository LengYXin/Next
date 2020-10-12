/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:16:12
 * @modify date 2020-08-05 14:16:12
 * @desc 视频
 */
<template>
  <div class="lyx-dplayer" ref="dplayer">播放器</div>
</template>

<script lang="ts">
import dplayer from "dplayer";
import flvjs from "flv.js";
import lodash from "lodash";
import { Component, Prop, Vue, Provide, Emit } from "vue-property-decorator";
@Component({
  components: {},
})
export default class extends Vue {
  @Prop() options;
  // @Prop() video;
  dplayer: dplayer;
  isPlaying = false;
  mounted() {
    // console.log(lodash.cloneDeep(this.options));
    try {
      const video = {
        defaultQuality: 1,
        // url:
        //   "https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4",
        // pic: "https://i.loli.net/2019/06/06/5cf8c5d9c57b510947.png",
        // thumbnails:
        //   "https://i.loli.net/2019/06/06/5cf8c5d9c57b510947.png",
        type: "customFlv",
        customType: {
          customFlv: function (video, player) {
            const flvPlayer = flvjs.createPlayer({
              type: "flv",
              url: video.src,
            });
            flvPlayer.attachMediaElement(video);
            flvPlayer.load();
          },
        },
      };
      if (!lodash.includes(lodash.get(this.options, "video.url"), "flv")) {
        lodash.unset(video, "type");
        lodash.unset(video, "customType");
      }
      const config = lodash.merge(
        {
          container: this.$refs.dplayer,
          screenshot: true,
          autoplay: true,
          video,
          // subtitle: {
          //   url: "https://s-sh-17-dplayercdn.oss.dogecdn.com/hikarunara.vtt",
          // },
          danmaku: {
            id: "live",
            // api: "https://api.prprpr.me/dplayer/",
          },
          // pluginOptions: {
          //   flv: {
          //     // refer to https://github.com/bilibili/flv.js/blob/master/docs/api.md#flvjscreateplayer
          //     mediaDataSource: {
          //       // mediaDataSource config
          //     },
          //     config: {
          //       // config
          //     },
          //   },
          // },
        },
        this.options
      );
      this.dplayer = new dplayer(config);
      console.log("LENG: extends -> mounted -> config", config);
      this.dplayer.on("playing", () => {
        if (this.isPlaying) {
          return;
        }
        this.onPlaying();
      });
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
      this.dplayer.destroy();
    } catch (error) {
      console.log("LENG: extends -> mounted -> error", error);
    }
  }
}
</script>

<style lang="less">
@import "./style.less";
.lyx-dplayer {
  height: 100%;
  .dplayer-comment {
    display: none !important;
  }
  .dplayer-video {
    // object-fit: cover;
  }
}
</style>