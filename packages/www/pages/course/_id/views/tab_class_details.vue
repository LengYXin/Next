/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:02:27
 * @modify date 2020-08-05 14:02:27
 * @desc 去上课
 */
<template>
  <a-modal
    wrapClassName="xt-cc-del"
    :visible="visible"
    destroyOnClose
    centered
    @cancel="onCancel"
    :footer="null"
    width="1140px"
  >
    <a-row>
      <a-col :span="12" class="xt-cc-del-info">
        <h2 v-text="Details.dataSource.classhourName" />
        <h3 v-text="Details.dataSource.classhourIntroduction" />
        <h3>
          <a-icon type="play-circle" />
          <span>直播课与回放</span>
          <span>（ 直播课： 回放已结束 ）</span>
        </h3>
        <nuxt-link class="xt-flex-center" :to="`/video/${Details.dataSource.classhourId}`">
          <img v-lazy="''" />
          <a-icon type="play-circle" />
        </nuxt-link>
        <h3>
          <a-icon type="play-circle" />
          <span>内容预告</span>
        </h3>
        <div v-html="Details.dataSource.classhourContent"></div>
      </a-col>
      <a-col :span="12" class="xt-cc-del-tabs">
        <a-tabs
          :activeKey="String(activeKey)"
          @change="tabsChange"
          class="xt-tabs-circle xt-tabs-center"
        >
          <a-tab-pane key="1" tab="资料区">
            <div class="xt-cc-del-pane">
              <h3>
                <a-icon type="play-circle" />
                <span>学习资料</span>
                <span class="xt-font-size-sm xt-text-yellow">
                  （请在
                  <time v-dateFormat="classhour.createTime" format="YYYY-MM-DD" />
                  前下载）
                </span>
              </h3>
              <ul class="xt-cc-del-material">
                <li v-for="item in Details.material" :key="item.materialId">
                  <h3 v-text="item.fileFullName"></h3>
                  <div>
                    大小：
                    <span v-text="getSize(item.fileSizeText)" />
                    <a :href="item.fileUri" target="_block">下载</a>
                  </div>
                </li>
              </ul>
            </div>
          </a-tab-pane>
          <a-tab-pane key="2" tab="交作业">
            <div class="xt-cc-del-pane" ref="Container">
              <h3>
                <a-icon type="play-circle" />
                <span>作业任务</span>
              </h3>
              <div class="xt-cc-del-homeworks">
                <a-timeline>
                  <a-timeline-item v-for="item in Details.homeworks" :key="item.homeworkAssignId">
                    <span v-text="item.homeworkTitle"></span>
                  </a-timeline-item>
                </a-timeline>
              </div>
              <h3>
                <a-icon type="play-circle" />
                <span>文房文具</span>
              </h3>
              <ul class="xt-cc-del-stationery">
                <li v-for="item in Details.stationery" :key="item.homeworkAssignId">
                  <a-tooltip :title="item.toolName" :getPopupContainer="getPopupContainer">
                    <a :href="item.toolUrl" target="_block">
                      <img v-lazy="item.toolThumbPic" />
                    </a>
                  </a-tooltip>
                </li>
              </ul>
            </div>
          </a-tab-pane>
        </a-tabs>
      </a-col>
    </a-row>
  </a-modal>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import { Modal } from "ant-design-vue";
import { Observer } from "mobx-vue";
import lodash from "lodash";

@Observer
@Component({
  components: {},
})
export default class PageView extends Vue {
  @Prop({ default: () => ({}) }) classhour;
  get visible() {
    return !!this.classhour?.classhourId;
  }
  tabPane = [
    { key: 1, title: "资料区" },
    { key: 2, title: "交作业" },
  ];
  activeKey = 1;
  get Details() {
    return this.PageStore.Details;
  }
  get PageStore() {
    return this.$store.$storeCourse.Details.Map;
  }
  getPopupContainer() {
    return this.$refs.Container;
  }
  tabsChange(activeKey) {
    this.activeKey = activeKey;
  }
  async onLoading(classhourId) {
    if (classhourId) {
      this.activeKey = 1;
      this.Details.onLoading({ classhourId });
      this.Details.onGetMaterial(classhourId);
    }
  }
  @Emit("cancel")
  onCancel() {
    this.Details.onReset();
  }
  @Watch("classhour.classhourId")
  updateClasshour(newVal, oldVal) {
    this.onLoading(newVal);
  }
  getSize(size) {
    let str = "";
    if (size <= 1024) {
      return Math.round(size) + "B";
    } else if (size <= 1024 * 1024 && size > 1024) {
      return Math.round(size / 1024) + "KB";
    } else if (size > 1024 * 1024) {
      return (size / 1024 / 1024).toFixed(2) + "MB";
    }
  }
  created() {}
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" >
.xt-cc-del {
  .ant-modal-body {
    padding: 0;
    // background-color: #0e050a0d;
  }
  &-info {
    padding: 36px 26px 26px 26px !important;
    background-color: white;
  }
  &-tabs {
    padding: 36px 26px 26px 26px !important;
    background-color: #0e050a0d;
  }
  &-pane {
    height: 400px;
    overflow: auto;
  }
  &-material {
    list-style: none;
    padding-left: 25px;
    h3 {
      color: #606266;
      font-size: 14px;
      margin: 0;
    }
    > li {
      padding-bottom: 12px;
      color: #999;
    }
  }
  &-homeworks {
    padding-left: 25px;
  }
  &-stationery {
    list-style: none;
    padding-left: 25px;
    > li {
      width: 55px;
      height: 55px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 12px;
      margin-bottom: 12px;
      float: left;
      a {
        display: block;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
