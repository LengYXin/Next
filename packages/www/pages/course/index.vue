
<template>
  <a-list class="xt-content" item-layout="horizontal" :data-source="PageStore.dataSource">
    <nuxt-link slot="renderItem" slot-scope="item" :to="`/course/${item.courseId}`">
      <a-list-item>
        <a-list-item-meta>
          <h1 slot="title">{{ item.courseName }}</h1>
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
        <a-button slot="actions" type="primary" v-t="'give'">Primary</a-button>
        <a-button slot="actions" type="primary" v-t="'signup'">Primary</a-button>
      </a-list-item>
    </nuxt-link>
  </a-list>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import { Observer } from "mobx-vue";
import { Context } from "@nuxt/types";
@Observer
@Component({
  fetch(ctx: Context) {
    ctx.store.$storeCourse.onGetDataSource({
      pageIndex: 1,
      columnId: 1,
      sortType: 1,
      sortName: "Asc",
      courseStyle: "1",
    });
  },
  components: {},
})
export default class PageView extends Vue {
  get PageStore() {
    return this.$store.$storeCourse;
  }
  created() {}
  mounted() {
    // console.log(this.PageStore);
  }
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scoped>
</style>
<i18n>
{
  "en": {
    "give": "Give to others",
    "signup": "Sign up now"
  },
  "zh": {
    "give": "赠课给他人",
    "signup": "立即报名"
  }
}
</i18n>