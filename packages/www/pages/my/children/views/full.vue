<!--
 * @Author: Erlin
 * @CreateTime: 2020-09-04 15:57:12
 * @LastEditTime: 2020-09-06 16:19:28
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
                v-lazy="single.coursePictureUri"
              />
              <a-card-meta :title="single.courseName">
                <template slot="description">
                  <span v-text="single.studyTips"></span>
                </template>
              </a-card-meta>
            </a-card>
          </nuxt-link>
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
}
</style>