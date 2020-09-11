/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:16:32
 * @modify date 2020-08-05 14:16:32
 * @desc 鼠标悬浮效果
 */
<template>
  <div class="xt-hover">
    <div class="xt-hover-content">
      <!-- 默认展示 -->
      <slot></slot>
      <!-- 悬浮展示 -->
      <div
        class="xt-hover-suspension"
        :class="'xt-hover-suspension-transform-' + animation"
      >
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
  @Prop({ default: "slide" }) animation;
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
    top: 0;
    // top: 100%;
    background-color: @modal-mask-bg;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: @white;
    transition: all 0.2s;
  }

  &-suspension-transform {
    &-slide {
      top: 100%;
    }
    &-fade {
      // display: none;
      opacity: 0;
    }
  }

  &:hover {
    // .xt-hover-suspension {
    //   top: 0;
    // }
    .xt-hover-suspension-transform {
      &-slide {
        top: 0;
      }
      &-fade {
        // display: flex;
        opacity: 1;
      }
    }
  }
  button {
    color: @white;
  }
}
</style>
