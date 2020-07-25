<template>
  <a-list class="xt-content" item-layout="horizontal" :data-source="PageStore.dataSource">
    <nuxt-link slot="renderItem" slot-scope="item" :to="`/course/${item.courseId}`">
      <a-list-item>
        <a-list-item-meta :description="item.statusName">
          <a slot="title" href="https://www.antdv.com/">{{ item.courseName }}</a>
          <img slot="avatar" width="272" alt="logo" v-lazy="item.coursePictureUri" />
        </a-list-item-meta>
        <a-button slot="actions" type="primary">Primary</a-button>
        <a-button slot="actions" type="primary">Primary</a-button>
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
    console.log(this.PageStore)
  }
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scoped>
</style>
