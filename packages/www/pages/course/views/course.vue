/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-06 17:14:10
 * @modify date 2020-08-06 17:14:10
 * @desc 课程
 */

<template>
  <a-list-item>
    <nuxt-link :to="`/course/${dataSource.courseId}`">
      <a-list-item-meta>
        <h1 slot="title" v-text="dataSource.courseName">名称</h1>
        <div slot="description">
          <div v-text="dataSource.statusName"></div>
          <div>开课中</div>
        </div>
        <a-badge :class="badgeClass" slot="avatar">
          <div class="xt-badge-text" slot="count">
            <div>直播</div>
            <div>课程</div>
          </div>
          <img width="480" height="270" alt="logo" v-lazy="dataSource.coursePictureUri" />
        </a-badge>
      </a-list-item-meta>
    </nuxt-link>
    <Signup slot="actions" :give="true" :id="dataSource.courseId" />
    <Signup slot="actions" :id="dataSource.courseId" />
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
</style>