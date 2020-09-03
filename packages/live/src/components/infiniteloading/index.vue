/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:16:27
 * @modify date 2020-08-05 14:16:27
 * @desc 滚动加载 https://peachscript.github.io/vue-infinite-loading/zh/
 */
<template>
  <infinite-loading :direction="direction" :identifier="identifier" :distance="300" @infinite="onInfinite">
    <div class="infinite-loading-text" slot="spinner">正在加载...</div>
    <div class="infinite-loading-text" slot="no-more">暂时都在这里了~</div>
    <div class="infinite-loading-text" slot="no-results">暂时都在这里了~</div>
  </infinite-loading>
</template>

<script>
import InfiniteLoading from "vue-infinite-loading";
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { Debounce, BindAll } from "lodash-decorators";
import lodash from "lodash";
@Component({
  components: {
    InfiniteLoading,
  },
})
export default class infinite extends Vue {
  @Prop({ default: Date.now() }) identifier;
  @Prop({ default: 'bottom' }) direction;
  // @Debounce(50)
  // onLoading(event) {
  //   console.log("LENG: infinite -> onLoading -> this", this);
  //   this.$emit("loading", event);
  // }
  onInfinite(event) {
    this.onLoading(event);
  }
  @Debounce(100)
  @Emit("loading")
  onLoading(event) {
    this.$emit("loading", event);
  }
  // onLoading = lodash.debounce((event) => {
  //   this.$emit("loading", event);
  // }, 100);
  created() {}
  mounted() {}
}
</script>
<style lang="less" scoped>
.infinite-loading-text {
  // font-size: @font-size-md;
  padding: 10px 0;
  // color: @xt-yellow-6;
}
</style>
