<template>
  <a-card :bordered="false" :loading="loading">
    <a-row>
      <a-col v-bind="colProps">
        <h1>标题</h1>
        <h2>副标题</h2>
        <div>
          <h3 v-money="99999" />
          <h3 v-money="99999" />
        </div>
        <h1>全阶课程</h1>
        <Signup :give="true" :id="1" />
        <Signup :id="1" />
      </a-col>
      <a-col v-bind="colProps">
        <a-timeline>
          <a-timeline-item v-for="item in timeline" :key="item.key" :color="item.color">
            <span slot="dot" v-text="item.key"></span>
            <h1>
              <span v-text="item.title"></span>
              <span>立即报名</span>
            </h1>
            <h1>
              <span v-money="item.price"></span>
              <span>
                共
                <span v-text="item.statistics"></span>课
              </span>
            </h1>
          </a-timeline-item>
        </a-timeline>
      </a-col>
    </a-row>
  </a-card>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Context } from "@nuxt/types";
import { Observer } from "mobx-vue";
import lodash from "lodash";
import Course from "~/pages/course/views/course.vue";
import Signup from "~/pages/course/views/signup.vue";
@Component({
  components: { Course, Signup },
})
export default class PageView extends Vue {
  loading = true;
  colProps = { lg: 12 };
  dataSource = {};
  timeline = [
    { key: "1", title: "入门课", price: 999, statistics: 3, color: "green" },
    { key: "2", title: "入门课", price: 999, statistics: 3, color: "gray" },
    { key: "3", title: "入门课", price: 999, statistics: 3, color: "green" },
    { key: "4", title: "入门课", price: 999, statistics: 3, color: "gray" },
    { key: "5", title: "入门课", price: 999, statistics: 3, color: "green" },
  ];
  created() {
    lodash.delay(() => {
      this.loading = false;
    }, 2000);
  }
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scoped>
</style>