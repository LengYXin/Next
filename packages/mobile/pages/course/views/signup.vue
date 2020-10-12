
<template>
  <div class="xt-signup">
    <van-button
      :type="type"
      :disabled="disabled"
      block
      @click.prevent.stop="onSignup"
    >
      <slot>
        <span v-t="text"></span>
      </slot>
    </van-button>
    <van-popup
      v-model="visible"
      :get-container="getContainer"
      closeable
      position="bottom"
      :style="{ height: '60%' }"
    >
      <Agreement />
    </van-popup>
  </div>
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
  @Prop({ default: true }) buy;
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
    return this.give ? "default" : "primary";
  }
  get disabled() {
    return lodash.get(this.dataSource, this.give ? "canGift" : "canBuy", false);
  }
  getContainer() {
    return document.body;
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
  height: 100%;
  width: 100%;
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