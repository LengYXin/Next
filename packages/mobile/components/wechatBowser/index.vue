/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:16:32
 * @modify date 2020-08-05 14:16:32
 * @desc 检查登录状态
 */
<template>
  <div>
    <!-- 浏览器 -->
    <slot v-if="WechatBowser" name="yes"></slot>
    <!-- 不是 微信浏览器 -->
    <slot v-else></slot>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import lodash from "lodash";
@Component({
  components: {},
})
export default class extends Vue {
  get WechatBowser() {
    return this.$store.$global.WechatBowser;
  }
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
