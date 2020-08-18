
<template>
  <a-button
    :disabled="disabled"
    class="xt-signup"
    @click.prevent.stop="onSignup"
    slot="actions"
    :type="type"
  >
    <span v-t="text"></span>
    <a-modal :visible="visible" @ok="onOk" @cancel="onCancel">
      <div></div>
    </a-modal>
  </a-button>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import lodash from "lodash";
import { Observer } from "mobx-vue";
import { Context } from "@nuxt/types";
@Observer
@Component({
  components: {},
})
export default class PageView extends Vue {
  @Prop({ default: () => ({}) })
  dataSource;
  /** 赠课 */
  @Prop({ default: false }) give;
  // @Prop({ required: true }) id;
  @Prop({}) title;
  visible = false;
  get text() {
    if (this.title) {
      return this.title;
    }
    if (this.give) {
      return "give";
    }
    return "signup";
  }
  get Pagination() {
    return this.$store.$storeCourse.Pagination;
  }
  get PageStore() {
    return this.$store.$storeCourse;
  }
  get type() {
    return this.give ? "yellow" : "primary";
  }
  get disabled() {
    return !lodash.hasIn(this.dataSource, "courseId");
  }
  onSignup() {
    this.visible = true;
    console.log("LENG: PageView -> onSignup -> this", this);
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