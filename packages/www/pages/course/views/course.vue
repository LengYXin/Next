/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-06 17:14:10
 * @modify date 2020-08-06 17:14:10
 * @desc 课程
 */

<template>
  <a-list-item class="xt-course-item">
    <a-list-item-meta>
      <nuxt-link slot="title" :to="`/course/${dataSource.courseId}`">
        <h2 class="xt-title-h2" v-text="dataSource.courseName">名称</h2>
      </nuxt-link>
      <div slot="description">
        <slot name="description">
          <div class="xt-flex-center">
            <strong
              class="xt-course-item-money xt-font-size-xx"
              v-money="dataSource.courseFullPrice"
            ></strong>
            <span class="xt-course-item-text">共{{dataSource.classHourCount}}课</span>
            <span class="xt-course-item-text" v-text="dataSource.statusName"></span>
          </div>
          <div class="xt-course-item-time">
            <time v-dateFormat="dataSource.createTime" format="报名截至YYYY-MM-DD" />
          </div>
        </slot>
        <slot name="signup">
          <div class="xt-course-item-signup">
            <Signup slot="actions" :give="true" :dataSource="dataSource" />
            <Signup slot="actions" :dataSource="dataSource" />
          </div>
        </slot>
      </div>
      <nuxt-link slot="avatar" :to="`/course/${dataSource.courseId}`">
        <a-badge :class="badgeClass">
          <div class="xt-badge-text" slot="count">
            <div>直播</div>
            <div>课程</div>
          </div>
          <img class="xt-course-logo" alt="logo" v-lazy="dataSource.coursePictureUri" />
        </a-badge>
      </nuxt-link>
    </a-list-item-meta>
    <slot></slot>
  </a-list-item>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import lodash from "lodash";
import { Observer } from "mobx-vue";
import { Context } from "@nuxt/types";
import Signup from "./signup.vue";
@Component({
  components: { Signup },
})
export default class PageView extends Vue {
  @Prop({
    default: () => ({}),
  })
  dataSource;
  @Prop({ default: "left" }) badge;
  get badgeClass() {
    return "xt-badge xt-badge-" + this.badge;
  }
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scoped>
@top: 30px;
.xt-course-item {
  margin-top: @top;
  padding: 0;
  // padding-bottom: @top;
  width: 100%;
  display: block;
  // &:hover {
  //   position: relative;
  //   z-index: 1;
  //   box-shadow: @box-shadow-base;
  // }
  border-color: transparent !important;
  &-money {
    color: @primary-color;
    font-weight: 700;
  }
  &-text {
    color: @xt-grey-6;
    margin-left: 15px;
  }
  &-time {
    margin-top: @top - 10px;
    text-align: right;
    color: @xt-yellow-6;
  }
  &-signup {
    margin-top: @top - 10px;
    text-align: right;
  }
  .xt-flex-center {
    flex-direction: initial;
    justify-content: flex-start;
    margin-top: @top - 10px;
  }
}
// 图片
.xt-course-logo {
  width: 487px;
  height: 276px;
}
</style>
<style lang="less" >
.xt-course-item {
  animation: antFadeIn 0.6s;
  .ant-list-item-meta-avatar {
    margin-right: @xt-margin-lg;
  }
}
</style>