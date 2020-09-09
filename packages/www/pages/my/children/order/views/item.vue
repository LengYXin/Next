/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:17:52
 * @modify date 2020-08-05 14:17:52
 * @desc 订单
 */
<template>
  <div class="xt-my-order-item">
    <!-- <a class="xt-my-order-item" target="_blank" :href="dataSource.articleUrl"> -->
    <!-- <a-list-item> -->
    <a-row type="flex" justify="space-between" align="middle">
      <a-col
        class="xt-font-size-lg xt-text-bold xt-text-yellow"
        v-text="dataSource.orderStatusText"
      ></a-col>
      <a-col class="xt-text-green">
        <span>实付学费：</span>
        <span
          class="xt-font-size-xxl xt-text-bold"
          v-money="dataSource.courseActualPaymentPrice"
        ></span>
      </a-col>
    </a-row>
    <div>
      <div>
        <time
          v-dateFormat="dataSource.orderTime"
          format="YYYY-MM-DD HH:mm:ss"
        />
        <a-divider type="vertical"></a-divider>
        <span>
          订单编号：
          <span v-text="dataSource.orderSn"></span>
        </span>
      </div>

      <div class="xt-my-order-item-warp">
        <a-badge class="xt-badge xt-badge-left">
          <div class="xt-badge-text" slot="count">
            <!-- v-text="dataSource.courseType" -->
            <div>直播</div>
            <div>课程</div>
          </div>
          <img
            class="xt-my-order-item-img"
            width="480"
            height="270"
            alt="logo"
            v-lazy="courseData.coursePictureThumbUri"
          />
        </a-badge>
        <div class="xt-my-order-item-content">
          <div class="xt-my-order-item-course-box">
            <div class="xt-font-size-md" v-text="courseData.courseName"></div>
            <div
              class="xt-text-green xt-text-bold xt-font-size-md"
              v-money="courseData.coursePrice"
            ></div>
            <div class="xt-text-yellow xt-font-size-sm">
              <span>退课截止至</span>
              <time
                v-dateFormat="courseData.refundEndTime"
                format="YYYY-MM-DD HH:mm:ss"
              />
            </div>
          </div>
          <Invoice :dataSource="dataSource" />
          <!-- <a-button
            type="primary"
            class="ant-btn-yellow xt-my-order-item-btn"
            block
          >
            申请发票
          </a-button> -->
        </div>
      </div>
    </div>
    <xt-shadow />

    <!-- <div class="xt-my-order-item-content">
        <h1>
          <span>实付学费：</span>
          <span v-money="dataSource.refundAmount"></span>
        </h1>
        <Invoice :dataSource="dataSource" />
      </div> -->
    <!-- </a-list-item> -->
    <!-- </a> -->
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Context } from "@nuxt/types";
import { Observer } from "mobx-vue";
import lodash from "lodash";
import Invoice from "./invoice.vue";
// @Observer
@Component({
  components: { Invoice },
})
export default class PageView extends Vue {
  @Prop({ default: {} }) dataSource;
  get courseData() {
    return lodash.get(this.dataSource, ["courseIdList", 0], {});
  }
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scoped>
@height: 270px;
@contentHeight: 115px;
.xt-my-order-item {
  display: block;
  height: @height;
  &-img {
    width: 200px;
    height: @contentHeight;
  }
  &-warp {
    height: @contentHeight;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
  }
  &-content {
    padding-left: 30px;
    height: @contentHeight;
    flex: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &-course-box {
    // padding-top: 20px;
    height: @contentHeight;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
  }
  &-btn {
    color: @white;
    width: 145px;
    height: 40px;
    font-size: @font-size-lg;
    // background: @orange-6;
  }
}
</style>
