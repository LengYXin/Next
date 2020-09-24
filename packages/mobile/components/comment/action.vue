/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:16:32
 * @modify date 2020-08-05 14:16:32
 * @desc 操作按钮
 */
<template>
  <span @click="onLike" :class="'xt-text-' + iconColor">
    <!-- <a-tooltip title="Like"> -->
    <slot name="icon" v-bind:action="action">
      <a-icon :type="icon" :theme="action ? 'filled' : 'outlined'" />
    </slot>
    <span :class="'xt-text-' + textColor" v-text="text"></span>
    <!-- </a-tooltip> -->
  </span>
</template>
<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import lodash from "lodash";
@Component({
  components: {},
})
export default class extends Vue {
  // 活动状态
  @Prop({ default: false }) action;
  // 统计数量
  @Prop({ default: 0 }) statistics;
  // 默认标题
  @Prop({ default: "点赞" }) title;
  // 图标
  @Prop({ default: "like" }) icon;
  // 图标颜色
  @Prop({ default: "yellow" }) iconColor;
  // 文字颜色
  @Prop({ default: "grey" }) textColor;

  get text() {
    return this.statistics || this.title;
  }
  @Emit("click")
  onLike(event) {
    return event;
  }
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scoped>
</style>
