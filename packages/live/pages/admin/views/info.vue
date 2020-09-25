/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:16:12
 * @modify date 2020-08-05 14:16:12
 * @desc 信息
 */
<template>
  <div class="lyx-admininfo">
    <h1 class="lyx-admininfo-title" v-text="Details.dataSource.classhourName">
      第15课《玄密塔碑》楷书进阶~
    </h1>
    <div class="lyx-admininfo-time">
      <a-tag class="lyx-admininfo-tag">直播</a-tag>
      <time
        v-dateFormat="Details.dataSource.courseStartTime"
        format="YYYY.MM.DD HH:mm:ss"
      />
    </div>
    <div class="lyx-admininfo-des">
      简介：<span v-text="Details.dataSource.classhourIntroduction"></span>
    </div>
    <div class="lyx-admininfo-live">
      <h1>推流地址</h1>
      <div v-text="liveUrl"></div>
    </div>
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
  get Details() {
    return this.PageStore.Details;
  }
  get PageStore() {
    return this.$store.$storeCourse.Details.Map;
  }
  get id() {
    return this.$route.query.id as string;
  }
  get liveUrl() {
    return window.location.origin + `/live?id=${this.id}`;
  }
  async onLoading(classhourId) {
    if (classhourId) {
      this.Details.onLoading({ classhourId });
    }
  }
  mounted() {
    this.onLoading(this.id);
  }
  created() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scoped>
.lyx-admininfo {
  background: #fff;
  &-tag {
    background: #f05a5a;
    color: #fff;
    border: none;
  }
  &-title {
    padding: 10px 20px;
    font-size: 23px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.85);
    line-height: 31px;
    margin: 0;
  }
  &-time {
    padding: 10px 20px;
    font-size: 16px;
    font-weight: 400;
    color: #999999;
    line-height: 25px;
  }
  &-des {
    padding: 10px 20px;
    font-size: 18px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.85);
    line-height: 25px;
    text-align: justify;
    position: relative;
  }
  &-live {
    padding: 10px 20px;
    font-size: 18px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.85);
    line-height: 25px;
    text-align: justify;
    position: relative;
    > div {
      background: #f4f5f8;
      padding: 20px;
    }
  }
}
</style>