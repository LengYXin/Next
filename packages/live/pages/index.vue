/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:16:12
 * @modify date 2020-08-05 14:16:12
 * @desc 视频
 */
<template>
  <lyx-inspect inspect>
    <div class="lyx-layout">
      <a-row type="flex" class="lyx-layout-row">
        <a-col :lg="18">
          <lyx-dplayer ref="dplayer" :options="options" />
        </a-col>
        <a-col :lg="6">
          <message />
        </a-col>
      </a-row>
    </div>
  </lyx-inspect>
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
            color: lodash.sample([
              "#d0021b",
              "#f5a623",
              "#8b572a",
              "#7ed321",
              "#9013fe",
              "#4a90e2",
              "#50e3c2",
            ]),
            type: "right", // should be `top` `bottom` or `right`
          }
          // function () {
          //   console.log("success");
          // }
        );
      }
    });
  }
  mounted() {
    console.log("LENG: extends -> mounted -> this", this);
  }

  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scoped>
.lyx-layout {
  &-row {
    height: 100vh;
    width: 100vw;
  }

  font-family: PingFangSC-Regular, PingFang SC;
}
</style>