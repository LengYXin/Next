<template>
  <div class="xt-content">
    <a-tabs default-active-key="1">
      <a-tab-pane key="1">
        <span slot="tab">
          <span>邮箱</span>
        </span>
      </a-tab-pane>
      <a-tab-pane key="2">
        <span slot="tab">
          <span>手机号</span>
        </span>
      </a-tab-pane>
    </a-tabs>
    <a-list class="xt-content" item-layout="horizontal" :data-source="[{},{},{},{}]">
      <nuxt-link slot="renderItem" slot-scope="item" :to="`/course/${item.courseId}`">
        <a-list-item>
          <a-list-item-meta :description="item.statusName">
            <a slot="title" href="https://www.antdv.com/">{{ item.courseName }}</a>
            <img slot="avatar" width="272" alt="logo" v-lazy="item.coursePictureUri" />
          </a-list-item-meta>
          <!-- <a-button slot="actions" type="primary">Primary</a-button> -->
        </a-list-item>
      </nuxt-link>
    </a-list>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import { Modal } from "ant-design-vue";
@Component({
  components: {},
})
export default class PageView extends Vue {
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style>
</style>
