/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:14:30
 * @modify date 2020-08-05 14:14:30
 * @desc 晒作业
 */
<template>
  <div class="xt-content">
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
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style>
</style>
