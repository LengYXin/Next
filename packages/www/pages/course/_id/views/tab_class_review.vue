/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:02:27
 * @modify date 2020-08-05 14:02:27
 * @desc 去上课
 */
<template>
  <div>
    <div @click.prevent.stop="onVisible(true)">
      <slot />
    </div>
    <a-modal
      wrapClassName="xt-course-class-modal"
      :visible="visible"
      destroyOnClose
      @cancel="onVisible(false)"
      :footer="null"
      width="700px"
    >学习回顾</a-modal>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import { Modal } from "ant-design-vue";
import { Observer } from "mobx-vue";
import lodash from "lodash";

@Observer
@Component({
  components: {},
})
export default class PageView extends Vue {
  @Prop({ default: () => ({}) }) classhour;
  visible = false;
  defaultActiveKey = 2;
  get Details() {
    return this.PageStore.Details;
  }
  get PageStore() {
    return this.$store.$storeCourse.Details.Map;
  }
  onVisible(visible) {
    this.visible = visible;
  }
  @Watch("visible")
  updateClasshour(newVal, oldVal) {}
  created() {}
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" >
.xt-course-class-modal {
}
</style>
