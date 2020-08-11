/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:16:32
 * @modify date 2020-08-05 14:16:32
 * @desc [description]
 */
<template>
  <div class="xt-hover">
    <div class="xt-hover-content">
      <!-- 默认展示 -->
      <slot></slot>
      <!-- 悬浮展示 -->
      <div class="xt-hover-suspension">
        <slot name="hover"></slot>
      </div>
    </div>
    <slot name="footer"></slot>
  </div>
</template>
<script lang="ts">
import {
  Component,
  Prop,
  Vue,
  Watch,
  Inject,
  Emit,
} from "vue-property-decorator";
import lodash from "lodash";
@Component({
  components: {},
})
export default class extends Vue {
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scoped>
.xt-hover {
  &-content {
    position: relative;
    overflow: hidden;
  }
  &-suspension {
    position: absolute;
    z-index: 2;
    width: 100%;
    height: 100%;
    top: 100%;
    background-color: @modal-mask-bg;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: @white;
    transition: all 0.2s;
  }

  &:hover {
    .xt-hover-suspension {
      top: 0;
    }
  }
  button {
    color: @white;
  }
}
</style>
