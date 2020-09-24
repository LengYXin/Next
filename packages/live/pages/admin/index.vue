/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:16:12
 * @modify date 2020-08-05 14:16:12
 * @desc 视频
 */
<template>
  <lyx-inspect inspect>
    <a-row class="lyx-admin" type="flex" :gutter="16">
      <a-col :lg="16">
        <lyx-dplayer :options="dplayer" style="height: auto" />
        <a-row type="flex" :gutter="16">
          <a-col :lg="16">
            <Vinfo />
          </a-col>
          <a-col :lg="8">
            <Vmanage />
          </a-col>
        </a-row>
      </a-col>
      <a-col :lg="8">
        <a-tabs class="lyx-admin-tabs" default-active-key="1">
          <a-tab-pane key="1" tab="讨论">
            <message />
          </a-tab-pane>
          <a-tab-pane key="2" tab="提问"> Content of Tab Pane 2 </a-tab-pane>
          <a-tab-pane key="3" tab="封禁用户">
            Content of Tab Pane 3
          </a-tab-pane>
        </a-tabs>
      </a-col>
    </a-row>
  </lyx-inspect>
</template>
<script lang="ts">
import lodash from "lodash";
import { Component, Prop, Vue, Provide, Emit } from "vue-property-decorator";
import Vinfo from "./views/info.vue";
import Vmanage from "./views/manage.vue";
import message from "./views/message.vue";
@Component({
  layout: "admin",
  validate({ query }) {
    return /^\d+$/.test(query.id as string);
  },
  components: { Vinfo, Vmanage, message },
})
export default class extends Vue {
  dplayer = {
    video: {
      url: "https://pull.alienwow.cc/live/wuwh.flv",
      pic:
        "https://oss-free.xuantong.cn/picturePath/cdb95ce45e19957a1a55284c710b911c.png",
      // thumbnails: "https://i.loli.net/2019/06/06/5cf8c5d9c57b510947.png",
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
<style lang="less">
.lyx-admin {
  // background: #f4f5f8;
  &-tabs {
    .ant-tabs-nav-scroll {
      text-align: center;
    }
  }
}
</style>