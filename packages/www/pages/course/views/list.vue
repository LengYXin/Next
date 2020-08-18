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
      <Course :dataSource="item" />
      <SingleSwiper :dataSource="item.courseSingleResponseVos" />
    </div>
  </a-list>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import lodash from "lodash";
import { Observer } from "mobx-vue";
import { Context } from "@nuxt/types";
import Course from "./course.vue";
import SingleSwiper from "./singleSwiper.vue";
@Component({
  components: { Course, SingleSwiper },
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