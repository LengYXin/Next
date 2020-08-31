/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:16:12
 * @modify date 2020-08-05 14:16:12
 * @desc 视频
 */
<template>
  <div class="lyx-layout">
    <a-row>
      <a-col :lg="18">
        <dplayer :options="dplayer" />
      </a-col>
      <a-col :lg="6">
        <editor class="lyx-editor-single" />
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts">
import dplayer from "./views/dplayer/index.vue";
import editor from "./views/editor/index.vue";
import lodash from "lodash";
import { Component, Prop, Vue, Provide, Emit } from "vue-property-decorator";
@Component({
  layout: "test",
  components: {
    dplayer,
    editor,
  },
})
export default class extends Vue {
  dplayer = {
    video: {
      url:
        "https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4",
      pic: "https://i.loli.net/2019/06/06/5cf8c5d9c57b510947.png",
      thumbnails: "https://i.loli.net/2019/06/06/5cf8c5d9c57b510947.png",
    },
  };
  mounted() {}

  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scoped>
.lyx-layout {
  height: 100vh;
  width: 100vw;
}
</style>
