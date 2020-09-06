/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:02:27
 * @modify date 2020-08-05 14:02:27
 * @desc 去上课
 */
<template>
  <a-modal
    wrapClassName="xt-course-class-modal"
    :visible="visible"
    destroyOnClose
    @cancel="onCancel"
    :footer="null"
    width="700px"
  >
    <a-row>
      <a-col :span="12">
        <div v-text="Details.dataSource.classhourName"></div>
      </a-col>
      <a-col :span="12">
        <xt-tabs
          theme="circle"
          :linkageRoute="false"
          :tabPane="tabPane"
          :defaultActiveKey="defaultActiveKey"
        />
      </a-col>
    </a-row>
  </a-modal>
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
  get visible() {
    return !!this.classhour?.classhourId;
  }
  tabPane = [
    { key: 1, title: "资料区" },
    { key: 2, title: "交作业" },
  ];
  defaultActiveKey = 2;
  get Details() {
    return this.PageStore.Details;
  }
  get PageStore() {
    return this.$store.$storeCourse.Details.Map;
  }
  async onLoading(classhourId) {
    if (classhourId) {
      await this.Details.onLoading({ classhourId });
    }
  }
  @Emit("cancel")
  onCancel() {
    this.Details.onReset();
  }
  @Watch("classhour.classhourId")
  updateClasshour(newVal, oldVal) {
    this.onLoading(newVal);
  }
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
