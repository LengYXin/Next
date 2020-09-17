<template>
  <div class="xt-fab">
    <a-tooltip placement="left">
      <template slot="title">
        <span>
          点击此按钮，可以查看您所报名的 《从书法之美到生活之美
          ——全阶课程》或《从书法之美到生活之美——自在行草》课程。
        </span>
      </template>
      <a class="xt-fab-item xt-bg-yellow" href="https://former.xuantong.cn/" target="_block">
        <div>返</div>
        <div>回</div>
        <div>老</div>
        <div>教</div>
        <div>室</div>
      </a>
    </a-tooltip>

    <a-popover placement="left">
      <template slot="content">
        <img :src="$images.wx" width="80" height="80" />
      </template>
      <div class="xt-fab-item">
        <div class="ant-back-top-content">
          <div class="ant-back-top-icon"></div>
        </div>
      </div>
    </a-popover>
    <a-tooltip placement="left">
      <template slot="title">
        <span>暄桐客服</span>
      </template>
      <div class="xt-fab-item">
        <div class="ant-back-top-content">
          <div class="ant-back-top-icon"></div>
        </div>
      </div>
    </a-tooltip>
    <a-back-top />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import lodash from "lodash";
import { Observer } from "mobx-vue";
@Observer
@Component({
  components: {},
})
export default class extends Vue {
  onSubmit() {}
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less">
.xt-fab {
  position: fixed;
  right: 50px;
  bottom: 100px;
  z-index: 10;
  width: 40px;
  &-item {
    display: block;
    text-align: center;
    padding: 10px 0;
  }
  .ant-back-top {
    right: 50px;
  }
}
</style>

