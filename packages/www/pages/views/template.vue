<template>
  <div class="xt-template" :style="{ background: options.background }">
    <div class="xt-text-align-center">
      <slot name="title">
        <h1
          class="xt-title-h1-large xt-font-family-FZLTHJW"
          v-text="title"
          :style="{ color: options.titleColor }"
        >
          标题
        </h1>
      </slot>
      <slot name="subTitle">
        <h3
          v-text="subTitle"
          class="xt-template-sub-title xt-font-size-lg xt-font-family-FZLTHJW"
          :style="{ color: options.subTitleColor }"
        >
          副标题
        </h3>
      </slot>
    </div>
    <div class="xt-template-content" :class="{ 'xt-content': isContent }">
      <slot></slot>
    </div>
    <div class="xt-template-footer">
      <slot name="footer">
        <nuxt-link
          :to="linkTo"
          class="xt-font-size-lg"
          :style="{ color: options.footerColor }"
        >
          <span v-text="footerText"></span>
        </nuxt-link>
      </slot>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Context } from "@nuxt/types";
import { Observer } from "mobx-vue";
import lodash from "lodash";
@Component({
  components: {},
})
export default class PageView extends Vue {
  @Prop({ default: "" }) background;
  @Prop() title;
  @Prop({ default: "#b69271" }) titleColor;
  @Prop() subTitle;
  @Prop({ default: "rgba(100,91,85,.6)" }) subTitleColor;
  @Prop({ default: "rgba(135,124,117,.6)" }) footerColor;
  @Prop({ default: "查看所有课程" }) footerText;
  @Prop({ default: () => ({ name: "course" }) }) linkTo;
  @Prop({ default: true }) isContent;
  get options() {
    return {
      background: this.background,
      titleColor: this.titleColor,
      subTitleColor: this.subTitleColor,
      footerColor: this.footerColor,
    };
  }
  // @Prop({
  //   default: {
  //     titleColor: "#b69271",
  //     subTitleColor: "rgba(100,91,85,.6)",
  //     footerColor: "rgba(100,91,85,.6)",
  //   },
  // })
  // options;
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" >
.xt-template {
  padding: 60px 0;
  box-shadow: 0 1px 20px rgba(14, 5, 10, 0.05);
  animation: antFadeIn 1s;
  &:nth-child(even) {
    background: @white;
  }
  &-sub-title {
    margin: 18px 0;
  }
  .xt-template-footer {
    text-align: center;
    padding-top: 60px;
  }
  .ant-card {
    background: transparent;
  }
  .ant-card-body {
    padding: 0;
  }
}
</style>