/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:16:32
 * @modify date 2020-08-05 14:16:32
 * @desc 阴影
 */
<template>
  <div class="xt-shadow" :style="shadowStyle">
    <div class="xt-shadow-before"></div>
    <div class="xt-shadow-after" :style="afterStyle"></div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import lodash from "lodash";
import qrcode from "qrcode";
@Component({
  components: {},
})
export default class extends Vue {
  @Prop({ default: 30 }) height;
  @Prop({ default: "" }) background;
  get shadowStyle() {
    return { height: `${this.height}px` };
  }
  get afterStyle() {
    return { background: this.background };
  }
  created() {}
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scoped>
.xt-shadow {
  height: 30px;
  position: relative;
  // box-shadow: @xt-header-box-shadow;
  &-before {
    content: " ";
    width: 70%;
    left: 15%;
    display: block;
    position: absolute;
    bottom: 0;
    // background: rgba(255, 0, 0, 0.116);
    height: 10px;
    border-radius: 100%;
    box-shadow: 0 -5px 20px 0px #ccc;
  }
  &-after {
    content: " ";
    height: 100%;
    width: 100%;
    display: block;
    position: absolute;
    background: @layout-body-background;
  }
}
</style>
