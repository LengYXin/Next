/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:16:32
 * @modify date 2020-08-05 14:16:32
 * @desc 图片验证
 */
<template>
  <div class="xt-img-code">
    <div ref="code"></div>
  </div>
</template>
<script lang="ts">
// https://github.com/yeild/jigsaw
import { Component, Vue, Emit } from "vue-property-decorator";
import lodash from "lodash";
import code from "./code";
@Component({
  components: {},
})
export default class extends Vue {
  mounted() {
    try {
      new code({
        el: this.$refs.code,
        onSuccess: () => {},
        onFail: () => {},
        onRefresh: () => {},
      }).init();
    } catch (error) {
        console.error(error)
    }
  }
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" >
.xt-img-code {
  .block {
    position: absolute;
    left: 0;
    top: 0;
    cursor: pointer;
    cursor: grab;
  }

  .block:active {
    cursor: grabbing;
  }

  .sliderContainer {
    position: relative;
    text-align: center;
    width: 310px;
    height: 40px;
    line-height: 40px;
    margin-top: 15px;
    background: #f7f9fa;
    color: #45494c;
    border: 1px solid #e4e7eb;
  }

  .sliderContainer_active .slider {
    height: 38px;
    top: -1px;
    border: 1px solid #1991fa;
  }

  .sliderContainer_active .sliderMask {
    height: 38px;
    border-width: 1px;
  }

  .sliderContainer_success .slider {
    height: 38px;
    top: -1px;
    border: 1px solid #52ccba;
    background-color: #52ccba !important;
  }

  .sliderContainer_success .sliderMask {
    height: 38px;
    border: 1px solid #52ccba;
    background-color: #d2f4ef;
  }

  .sliderContainer_success .sliderIcon {
    background-position: 0 -26px !important;
  }

  .sliderContainer_fail .slider {
    height: 38px;
    top: -1px;
    border: 1px solid #f57a7a;
    background-color: #f57a7a !important;
  }

  .sliderContainer_fail .sliderMask {
    height: 38px;
    border: 1px solid #f57a7a;
    background-color: #fce1e1;
  }

  .sliderContainer_fail .sliderIcon {
    top: 14px;
    background-position: 0 -82px !important;
  }

  .sliderContainer_active .sliderText,
  .sliderContainer_success .sliderText,
  .sliderContainer_fail .sliderText {
    display: none;
  }

  .sliderMask {
    position: absolute;
    left: 0;
    top: 0;
    height: 40px;
    border: 0 solid #1991fa;
    background: #d1e9fe;
  }

  .slider {
    position: absolute;
    top: 0;
    left: 0;
    width: 40px;
    height: 40px;
    background: #fff;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
    transition: background 0.2s linear;
    cursor: pointer;
    cursor: grab;
  }

  .slider:active {
    cursor: grabbing;
  }

  .slider:hover {
    background: #1991fa;
  }

  .sliderIcon {
    position: absolute;
    top: 15px;
    left: 13px;
    width: 14px;
    height: 12px;
    background: url(https://cstaticdun.126.net//2.13.6/images/icon_light.4353d81.png)
      0 -13px;
    background-size: 32px 544px;
  }

  .slider:hover .sliderIcon {
    background-position: 0 0;
  }

  .refreshIcon {
    position: absolute;
    right: 5px;
    top: 5px;
    width: 30px;
    height: 30px;
    cursor: pointer;
    background: url(https://cstaticdun.126.net//2.13.6/images/icon_light.4353d81.png)
      0 -233px;
    background-size: 32px 544px;
  }

  .refreshIcon:hover {
    background-position: 0 -266px;
  }

  .loadingContainer {
    position: absolute;
    left: 0;
    top: 0;
    width: 310px;
    height: 155px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: #45494c;
    z-index: 2;
    background: #edf0f2;
  }

  .loadingIcon {
    width: 32px;
    height: 32px;
    margin-bottom: 10px;
    background: url(https://cstaticdun.126.net//2.13.6/images/icon_light.4353d81.png)
      0 -332px;
    background-size: 32px 544px;
    animation: loading-icon-rotate 0.8s linear infinite;
  }

  @keyframes loading-icon-rotate {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
}
</style>
