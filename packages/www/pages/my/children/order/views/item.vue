/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:17:52
 * @modify date 2020-08-05 14:17:52
 * @desc 订单
 */
<template>
  <a class="xt-my-order-item" target="_blank" :href="dataSource.articleUrl">
    <a-list-item>
      <a-list-item-meta>
        <h1 slot="title" v-text="dataSource.orderStatusText">名称</h1>
        <div slot="description">
          <div>
            <time v-dateFormat="dataSource.orderTime" format="YYYY-MM-DD HH:mm:ss" />
            <a-divider type="vertical"></a-divider>
            <span>
              订单编号：
              <span v-text="dataSource.orderSn"></span>
            </span>
          </div>
          <a-badge
            class="xt-badge xt-badge-left"
            v-for="item in dataSource.courseIdList"
            :key="item.courseId"
          >
            <div class="xt-badge-text" slot="count">
              <div v-text="dataSource.courseType">直播</div>
            </div>
            <img
              class="xt-my-order-item-img"
              width="480"
              height="270"
              alt="logo"
              v-lazy="item.coursePictureThumbUri"
            />
          </a-badge>
        </div>
      </a-list-item-meta>
      <div class="xt-my-order-item-content">
        <h1>
          <span>实付学费：</span>
          <span v-money="dataSource.refundAmount"></span>
        </h1>
        <Invoice :dataSource="dataSource" />
      </div>
    </a-list-item>
  </a>
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
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scoped>
@height: 270px;
.xt-my-order-item {
  display: block;
  height: @height;
  //   overflow: hidden;
  &-img {
    width: 200px;
    height: 115px;
  }
  &-content {
    height: @height;
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
