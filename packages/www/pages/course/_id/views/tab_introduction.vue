/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:02:02
 * @modify date 2020-08-05 14:02:02
 * @desc 介绍
 */
<template>
  <div>
    <img v-for="img in imgs" :key="img" v-lazy="img" />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import { Modal } from "ant-design-vue";
import { Observer } from "mobx-vue";
import lodash from "lodash";
@Component({
  components: {},
})
export default class PageView extends Vue {
  get PageStore() {
    return this.$store.$storeCourse.Details;
  }
  imgs = [];
  async created() {
    const res = await this.PageStore.onGetCourseIntroduce({
      courseId: this.$route.params.id,
      courseType: 1,
    });
    this.imgs = res;
  }
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scoped>
img {
  width: 100%;
}
</style>
