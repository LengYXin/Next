
<template>
  <a-button
    :disabled="disabled"
    class="xt-signup"
    @click.prevent.stop="onSignup"
    slot="actions"
    :type="type"
  >
    <span v-t="text"></span>
    <a-modal :visible="visible" @cancel="onCancel" :footer="null" width="1000px">
      <div>
        <Agreement />
      </div>
    </a-modal>
  </a-button>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import lodash from "lodash";
import { Observer } from "mobx-vue";
import Agreement from "./agreement.vue";
@Observer
@Component({
  components: { Agreement },
})
export default class PageView extends Vue {
  /** 课程数据 */
  @Prop({ default: () => ({}) }) dataSource;
  /** true 为 赠课  */
  @Prop({ default: false }) give;
  // @Prop({ required: true }) id;
  @Prop({}) title;
  /** 购买 不是 购买跳转 详情 */
  @Prop({ default: false }) buy;
  visible = false;
  /** 按钮显示文案 */
  get text() {
    if (this.title) {
      return this.title;
    }
    if (this.give) {
      return "give";
    }
    return "signup";
  }
  get PageStore() {
    return this.$store.$storeCourse;
  }
  /** 按钮类型 */
  get type() {
    return this.give ? "yellow" : "primary";
  }
  get disabled() {
    return  !lodash.hasIn(this.dataSource, "courseId");
  }
  onSignup() {
    console.log("LENG: PageView -> onSignup -> this", this);
    if (this.buy) {
      this.visible = true;
    } else {
      this.$router.push({
        name: "course-id",
        params: { id: this.dataSource.courseId },
      });
    }
  }
  onOk() {
    this.visible = false;
  }
  onCancel() {
    this.visible = false;
  }
  created() {}
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scoped>
.xt-signup {
  color: @white;
  width: 140px;
  height: 40px;
  font-size: @font-size-lg;
  margin-left: 20px;
  &[disabled] {
    background: @xt-grey-6 !important;
    color: @white !important;
  }
  &.ant-btn-yellow {
    color: @xt-yellow-6;
    border-style: solid;
    background: transparent;
  }
}
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