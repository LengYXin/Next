/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:16:12
 * @modify date 2020-08-05 14:16:12
 * @desc 视频
 */
<template>
  <div class="lyx-layout">
    <a-row type="flex">
      <a-col :lg="18">
        <lyx-dplayer :options="dplayer" style="height:600px"/>
        <a-row type="flex" >
          <a-col :lg="18">
            <h1>第15课《玄密塔碑》楷书进阶~</h1>
            <div class="lyx-header-time">
              <a-tag class="lyx-header-tag">直播</a-tag>
              <time v-dateFormat="dataTime" format="YYYY.MM.DD HH:mm:ss" />
            </div>
          </a-col>
          <a-col :lg="6">
            <a-list  :data-source="data">
              <a-list-item slot="renderItem" slot-scope="item">
                {{ item }}
              </a-list-item>
              <div slot="header">管理员</div>
            </a-list>
          </a-col>
        </a-row>
      </a-col>
      <a-col :lg="6">
        <a-tabs default-active-key="1">
          <a-tab-pane key="1" tab="讨论"> Content of Tab Pane 1 </a-tab-pane>
          <a-tab-pane key="2" tab="提问"> Content of Tab Pane 2 </a-tab-pane>
          <a-tab-pane key="3" tab="封禁用户">
            Content of Tab Pane 3
          </a-tab-pane>
        </a-tabs>
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts">
import lodash from "lodash";
import { Component, Prop, Vue, Provide, Emit } from "vue-property-decorator";
@Component({
  layout: "admin",
  validate({ query }) {
    return /^\d+$/.test(query.id as string);
  },
  components: {},
})
export default class extends Vue {
  dataTime = Date.now();
  data = [
    "Racing car sprays burning fuel into crowd.",
    "Japanese princess to wed commoner.",
    "Australian walks 100km after outback crash.",
    "Man charged over missing wedding girl.",
    "Los Angeles battles huge wildfires.",
  ];
  dplayer = {
    video: {
      url:
        "https://xuantong-upload-private.oss-cn-beijing.aliyuncs.com/videoPath/dbc23465d21913b6728ef4ebd600da64.mov?Expires=1600935726&OSSAccessKeyId=LTAI4FoTa7tgoQpv1j3SU8zZ&Signature=DaNpXPquohTU%2F4T6uhikZonFU5Y%3D",
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