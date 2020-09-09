<!--
 * @Author: Erlin
 * @CreateTime: 2020-09-04 15:57:12
 * @LastEditTime: 2020-09-09 14:35:05
 * @LastEditors: Erlin
 * @Description: 去上课列表
-->

<template>
  <a-list
    :loading="loading"
    class="xt-class-full"
    item-layout="vertical"
    :data-source="dataSource"
  >
    <!-- <nuxt-link slot="renderItem" slot-scope="item" :to="`/course/${item.courseId}`"> -->
    <div class="xt-class-full-renderItem" slot="renderItem" slot-scope="item">
      <nuxt-link :to="`/course/${item.courseId}`">
        <a-badge class="xt-badge xt-badge-left xt-class-full-badge">
          <div class="xt-badge-text" slot="count">
            <div>直播</div>
            <div>课程</div>
          </div>
          <div
            class="xt-font-size-lg xt-font-bold xt-font-family-FZXIYSK xt-text-black"
            v-text="item.courseName"
          ></div>
        </a-badge>
      </nuxt-link>

      <a-row class="xt-class-full-warp" :gutter="16">
        <a-col
          :span="7"
          v-for="single in item.userCourseSingleResponseVos"
          :key="single.courseId"
        >
          <nuxt-link :to="`/course/${single.courseId}`">
            <a-card class="xt-class-full-card" hoverable :bordered="false">
              <img
                slot="cover"
                alt="coursePicture"
                class="xt-class-full-img"
                :class="single.purchased ? '' : 'xt-class-full-img-inactive'"
                v-lazy="single.coursePictureUri"
              />
              <a-card-meta>
                <div
                  slot="title"
                  class="xt-font-size-md xt-text-align-center"
                  v-text="single.courseName"
                ></div>
                <div
                  slot="description"
                  class="xt-font-size-sm xt-text-align-center"
                  v-text="single.studyTips"
                ></div>
              </a-card-meta>
            </a-card>
          </nuxt-link>
        </a-col>
      </a-row>
      <!-- 转报全阶 -->
      <a-row
        class="xt-class-full-foot xt-text-align-center"
        :gutter="[0, 16]"
        v-if="item.isTurnFullCourse"
      >
        <a-col :span="24">
          <a-button size="large" type="primary" class="ant-btn-yellow">
            转报全阶
          </a-button>
        </a-col>
        <a-col
          :span="24"
          class="xt-font-family-FZLTHJW xt-text-yellow"
          v-text="`转为全阶后可优惠${item.transCourseFullSavePrice}元`"
        >
        </a-col>
      </a-row>

      <xt-shadow />
    </div>
    <!-- </nuxt-link> -->
  </a-list>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import lodash from "lodash";

@Component({
  components: {},
})
export default class PageView extends Vue {
  @Prop({ default: false }) loading;
  @Prop({ default: [] }) dataSource;
  @Prop({ default: "key" }) rowKey;
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less">
.xt-class-full {
  &-renderItem {
    padding-bottom: 30px;
  }
  &-warp {
    margin-top: 12px;
    padding-left: 54px;
  }
  &-card.ant-card {
    margin-bottom: 20px;
    box-shadow: 0px 5px 16px 0px rgba(176, 176, 176, 0.07);
  }
  &-img {
    width: 100%;
    height: 130px;
    // height: 180px;
  }
  &-img-inactive {
    filter: grayscale(100%);
    filter: gray;
  }
  &-badge.xt-badge.ant-badge {
    height: 46px;
    line-height: 46px;
    padding-left: 54px;
    .xt-badge-text {
      width: 46px;
      height: 46px;
      font-size: 12px;
      line-height: 1.2;
      letter-spacing: 1px;
      transform: none !important;
    }
  }
  &-foot {
    padding: 12px 0;
  }
}
</style>