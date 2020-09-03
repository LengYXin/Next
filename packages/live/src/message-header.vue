/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:16:12
 * @modify date 2020-08-05 14:16:12
 * @desc 视频
 */
<template>
  <div class="lyx-header">
    <a-row class="lyx-header-row">
      <a-col class="lyx-header-avatar" :span="4">
        <a-avatar :size="52" icon="user" />
      </a-col>
      <a-col class="lyx-header-title" :span="20">
        <h1>第15课《玄密塔碑》楷书进阶~</h1>
        <div class="lyx-header-time">
          <a-tag class="lyx-header-tag">直播</a-tag>
          <time v-dateFormat="dataTime" format="YYYY.MM.DD HH:mm:ss" />
        </div>
      </a-col>
    </a-row>
    <div class="lyx-header-des">简介：今天我们来学玄米塔碑，请大家准备好文房，按时参加哦~</div>
  </div>
</template>
<script lang="ts">
import lodash from "lodash";
import { Component, Prop, Vue, Provide, Emit } from "vue-property-decorator";
import { Observer } from "mobx-vue";
@Observer
@Component({
  components: {},
})
export default class extends Vue {
  get PageStore() {
    return this.$rootStore.$storeHomework;
  }
  get Pagination() {
    return this.PageStore.SunDrying;
  }
  get id() {
    return 28; //this.$route.params.id;
  }
  dataTime = Date.now();
  created() {
    this.Pagination.onReset({ direction: "top" });
  }
  onLoading(event?) {
    this.Pagination.onLoading({ singleCourseId: this.id }, {}, event);
  }
  getComment(item) {
    return {
      content: item.content,
      avatar: item.userHeader,
      author: item.userNickname,
      time: item.createTime,
      bishan: item.bishanNum,
    };
  }
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scoped>
.lyx-header {
  padding: 53px 0 0;
  font-family: PingFangSC-Regular, PingFang SC;
  &-row {
    // padding: 0 20px;
  }
  &-avatar {
    text-align: center;
  }
  &-tag {
    background: #f05a5a;
    color: #fff;
    border: none;
  }
  &-title {
    padding-right: 20px;
    > h1 {
      font-size: 23px;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.85);
      line-height: 31px;
      margin: 0;
    }
  }
  &-time {
    font-size: 16px;
    font-weight: 400;
    color: #999999;
    line-height: 25px;
  }
  &-des {
    padding: 18px 20px 24px;
    font-size: 18px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.85);
    line-height: 25px;
    text-align: justify;
    position: relative;
    &::after {
      content: " ";
      position: absolute;
      display: block;
      height: 1px;
      bottom: 0;
      background: #d0d0d0;
      left: 20px;
      right: 20px;
    }
  }
}
</style>
