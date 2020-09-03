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
        <lyx-dplayer :options="dplayer" />
      </a-col>
      <a-col :lg="6">
        <message />
        <!-- <lyx-editor class="lyx-editor-single" /> -->
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts">
import './components'
import lodash from "lodash";
import { Component, Prop, Vue, Provide, Emit } from "vue-property-decorator";
import message from "./message.vue";
// import message from "./test.vue";
// import RootStore from "./store";
@Component({
  components: { message },
})
export default class extends Vue {
  // RootStore = RootStore();
  dplayer = {
    video: {
      url:
        "https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4",
      pic: "https://i.loli.net/2019/06/06/5cf8c5d9c57b510947.png",
      thumbnails: "https://i.loli.net/2019/06/06/5cf8c5d9c57b510947.png",
    },
  };
  created() {
    console.log("LENG: extends -> created -> this", this);
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
}

</style>
