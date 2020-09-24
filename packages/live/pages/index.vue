/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:16:12
 * @modify date 2020-08-05 14:16:12
 * @desc 视频
 */
<template>
  <xt-inspect inspect>
    <div class="lyx-layout">
      <a-row type="flex">
        <a-col :lg="18">
          <lyx-dplayer ref="dplayer" :options="options" />
        </a-col>
        <a-col :lg="6">
          <message />
        </a-col>
      </a-row>
    </div>
  </xt-inspect>
</template>
<script lang="ts">
import lodash from "lodash";
import { Component, Prop, Vue, Provide, Emit } from "vue-property-decorator";
import message from "./views/message.vue";
@Component({
  validate({ query }) {
    return /^\d+$/.test(query.id as string);
  },
  components: { message },
})
export default class extends Vue {
  // RootStore = RootStore();
  get MessageQueue() {
    return this.socketMessage.MessageQueue;
  }
  get socketMessage() {
    return this.$store.$socketMessage;
  }
  get dplayer() {
    return (this.$refs?.dplayer as any)?.dplayer;
  }
  options = {
    video: {
      url: "https://pull.alienwow.cc/live/wuwh.flv",
      // pic:
      //   "https://oss-free.xuantong.cn/picturePath/cdb95ce45e19957a1a55284c710b911c.png",
      // thumbnails: "https://i.loli.net/2019/06/06/5cf8c5d9c57b510947.png",
    },
  };
  created() {
    this.MessageQueue.SuccessSubject.subscribe((msg) => {
      const dplayer = (this.$refs?.dplayer as any)?.dplayer;
      if (dplayer) {
        dplayer.danmaku.draw(
          {
            text: this["formatFace"](lodash.get(msg, "content.content")),
            color: "#b7daff",
            type: "right", // should be `top` `bottom` or `right`
          }
          // function () {
          //   console.log("success");
          // }
        );
      }
    });
  }
  mounted() {}

  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scoped>
.lyx-layout {
  height: 100vh;
  width: 100vw;
  font-family: PingFangSC-Regular, PingFang SC;
}
</style>
<style lang="less">
.lyx-icon {
  width: 2em;
  height: 2em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>