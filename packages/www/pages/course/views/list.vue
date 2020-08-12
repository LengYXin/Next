/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-06 17:14:10
 * @modify date 2020-08-06 17:14:10
 * @desc 课程
 */

<template>
  <a-list :loading="loading" item-layout="horizontal" :data-source="dataSource" :rowKey="rowKey">
    <div slot="renderItem" slot-scope="item">
      <nuxt-link :to="`/course/${item.courseId}`">
        <a-list-item>
          <a-list-item-meta>
            <h1 slot="title" v-text="item.courseName">名称</h1>
            <div slot="description">
              <div v-text="item.statusName"></div>
              <div>开课中</div>
            </div>
            <a-badge class="xt-badge-left" slot="avatar">
              <div class="xt-badge-text" slot="count">
                <div>直播</div>
                <div>课程</div>
              </div>
              <img width="480" height="270" alt="logo" v-lazy="item.coursePictureUri" />
            </a-badge>
          </a-list-item-meta>
          <Signup slot="actions" :give="true" :id="item.courseId" />
          <Signup slot="actions" :id="item.courseId" />
        </a-list-item>
      </nuxt-link>
      <SingleSwiper v-if="item.courseSingleResponseVos" :dataSource="item.courseSingleResponseVos" />
    </div>
  </a-list>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import lodash from "lodash";
import { Observer } from "mobx-vue";
import { Context } from "@nuxt/types";
import Signup from "./signup.vue";
import SingleSwiper from "./singleSwiper.vue";
@Component({
  components: { Signup, SingleSwiper },
})
export default class PageView extends Vue {
  @Prop({ default: true }) loading;
  @Prop({ default: [] }) dataSource;
  @Prop({ default: "key" }) rowKey;
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scoped>
</style>