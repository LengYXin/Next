<!--
 * @Author: Erlin
 * @CreateTime: 2020-09-04 15:57:12
 * @LastEditTime: 2020-09-04 18:33:16
 * @LastEditors: Erlin
 * @Description: 去上课列表
-->

<template>
  <a-list
    :loading="loading"
    class="xt-class-list"
    item-layout="vertical"
    :data-source="dataSource"
  >
    <!-- <nuxt-link slot="renderItem" slot-scope="item" :to="`/course/${item.courseId}`"> -->
    <div class="xt-class-renderItem" slot="renderItem" slot-scope="item">
      <a-row :gutter="16">
        <a-col
          :span="7"
          v-for="single in item.userCourseSingleResponseVos"
          :key="single.courseId"
        >
          <a-card class="xt-class-card" hoverable :bordered="false">
            <a-badge class="xt-badge xt-badge-left" slot="cover">
              <div class="xt-badge-text" slot="count">
                <div>直播</div>
                <div>课程</div>
              </div>
              <img
                alt="coursePicture"
                class="xt-class-single-img"
                v-lazy="single.coursePictureUri"
              />
            </a-badge>

            <a-card-meta :title="single.courseName">
              <template slot="description">
                <span v-text="single.studyTips"></span>
              </template>
            </a-card-meta>
          </a-card>
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
.xt-class {
  &-renderItem {
    padding-bottom: 30px;
  }
  &-card.ant-card {
    margin-bottom: 20px;
    box-shadow: 0px 5px 16px 0px rgba(176, 176, 176, 0.07);
    .xt-badge-text {
      width: 46px;
      height: 46px;
      font-size: 12px;
      line-height: 1.2;
      letter-spacing: 1px;
    }
  }
  &-single-img {
    width: 100%;
    height: 130px;
    // height: 180px;
  }
}
</style>