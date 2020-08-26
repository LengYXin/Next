
<template>
  <a-button
    :type="type"
    :disabled="disabled"
    class="xt-signup"
    @click.prevent.stop="onSignup"
    slot="actions"
  >
    <slot>
      <span v-t="text"></span>
    </slot>
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
  get PageStore() {
    return this.$store.$storeCourse;
  }
  /** 课程数据 */
  @Prop({ default: () => ({}) }) dataSource;
  /** true 为 赠课  */
  @Prop({ default: false }) give;
  // @Prop({ required: true }) id;
  @Prop({}) title;
  /** 购买 | 非购买跳转 详情 */
  @Prop({ default: false }) buy;
  /** 图标 */
  @Prop({ default: false }) icon;
  /** modal visible */
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
  /** 按钮类型 */
  get type() {
    if (this.icon) {
      return "link";
    }
    return this.give ? "yellow" : "primary";
  }
  get disabled() {
    return lodash.get(this.dataSource, this.give ? "canGift" : "canBuy", false);
  }
  onSignup() {
    try {
      if (this.buy) {
        this.$InspectUser();
        this.visible = true;
      } else {
        if (this.dataSource.courseId) {
          this.$router.push({
            name: "course-id",
            params: { id: this.dataSource.courseId },
          });
        }
      }
    } catch (error) {}
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
  // color: @white;
  width: 140px;
  height: 40px;
  font-size: @font-size-lg;
  margin-left: 20px;
  &.ant-btn-link {
    height: auto;
    width: auto;
    margin-left: auto;
  }
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