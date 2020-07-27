<template>
  <a-list class="xt-content" item-layout="horizontal" :data-source="[{},{},{},{}]">
    <nuxt-link slot="renderItem" slot-scope="item" :to="`/course/${item.courseId}`">
      <a-list-item>
        <a-list-item-meta >
          <a slot="title" href="https://www.antdv.com/">{{ item.courseName }}</a>
          <img slot="avatar" width="272" alt="logo" v-lazy="item.coursePictureUri" />
        </a-list-item-meta>
      </a-list-item>
    </nuxt-link>
  </a-list>
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
