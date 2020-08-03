<template>
  <div class="xt-content">
    <a-affix :offset-top="72">
      <a-tabs class="xt-tabs-center">
        <a-tab-pane v-for="tab in tabPane" :key="tab">
          <span slot="tab">
            <span v-text="tab"></span>
          </span>
        </a-tab-pane>
      </a-tabs>
    </a-affix>

    <a-list class="xt-content" item-layout="horizontal" :data-source="[{},{},{},{},{},{},{},{}]">
      <!-- <nuxt-link slot="renderItem" slot-scope="item" :to="`/course/${item.courseId}`"> -->
      <a-list-item slot="renderItem" slot-scope="item">
        <a-list-item-meta :description="item.statusName">
          <a slot="title" href="https://www.antdv.com/">{{ item.courseName }}</a>
          <img slot="avatar" width="272" alt="logo" v-lazy="item.coursePictureUri" />
        </a-list-item-meta>
        <!-- <a-button slot="actions" type="primary">Primary</a-button> -->
      </a-list-item>
      <!-- </nuxt-link> -->
    </a-list>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import { Modal } from "ant-design-vue";
@Component({
  scrollToTop: true,
  components: {},
})
export default class PageView extends Vue {
  tabPane = ["已评阅", "已提交"];
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style>
</style>
