<!--
 * @Author: Erlin
 * @CreateTime: 2020-09-04 15:57:12
 * @LastEditTime: 2020-09-06 19:00:17
 * @LastEditors: Erlin
 * @Description: 去上课列表
-->

<template>
  <div class="xt-class-single">
    <a-list
      :loading="loading"
      :data-source="dataSource"
      :grid="{ gutter: 16, column: 3 }"
    >
      <!-- <nuxt-link slot="renderItem" slot-scope="item" :to="`/course/${item.courseId}`"> -->
      <!-- <a-row class="xt-class-full-renderItem" slot="renderItem" slot-scope="item"> -->
      <!-- <a-row class="xt-class-single-warp" :gutter="16"> -->
      <a-col :span="7" slot="renderItem" slot-scope="item">
        <nuxt-link :to="`/course/${item.courseId}`">
          <a-card class="xt-class-single-card" hoverable :bordered="false">
            <a-badge
              class="xt-badge xt-badge-left xt-class-single-badge"
              slot="cover"
            >
              <div class="xt-badge-text" slot="count">
                <div>直播</div>
                <div>课程</div>
              </div>
              <img
                alt="coursePicture"
                class="xt-class-single-img"
                v-lazy="item.coursePictureUri"
              />
            </a-badge>

            <a-card-meta :title="item.courseName">
              <template slot="description">
                <span v-text="item.studyTips"></span>
              </template>
            </a-card-meta>
          </a-card>
        </nuxt-link>
      </a-col>
      <!-- </a-row> -->
      <!-- <xt-shadow /> -->
      <!-- </a-row> -->

      <!-- <a-list-item
      class="xt-class-single-renderItem"
      slot="renderItem"
      slot-scope="item"
    >
      <a-card class="xt-class-single-card" hoverable :bordered="false">
        <a-badge
          class="xt-class-single-badge xt-badge xt-badge-left"
          slot="cover"
        >
          <div class="xt-badge-text" slot="count">
            <div>直播</div>
            <div>课程</div>
          </div>
          <img
            alt="coursePicture"
            class="xt-class-single-img"
            v-lazy="item.coursePictureUri"
          />
        </a-badge>

        <a-card-meta :title="item.courseName">
          <template slot="description">
            <span v-text="item.studyTips"></span>
          </template>
        </a-card-meta>
      </a-card>
    </a-list-item> -->
      <!-- </nuxt-link> -->
    </a-list>
    <xt-shadow />
  </div>
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
.xt-class-single {
  padding-left: 54px;
  padding-bottom: 30px;

  &-card.ant-card {
    margin-bottom: 20px;
    box-shadow: 0px 5px 16px 0px rgba(176, 176, 176, 0.07);
  }
  &-img {
    width: 100%;
    height: 130px;
  }
  &-badge.xt-badge.ant-badge {
    .xt-badge-text {
      width: 46px;
      height: 46px;
      font-size: 12px;
      line-height: 1.2;
      letter-spacing: 1px;
    }
  }
}
</style>