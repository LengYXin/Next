<template>
  <infinite-loading :distance="300" @infinite="onLoading">
    <div class="infinite-loading-text" slot="spinner">正在加载...</div>
    <div class="infinite-loading-text" slot="no-more">暂时都在这里了...</div>
    <div class="infinite-loading-text" slot="no-results">暂时都在这里了...</div>
  </infinite-loading>
</template>

<script>
import InfiniteLoading from "vue-infinite-loading";
import { Component, Prop, Vue, Provide } from "vue-property-decorator";
import { Debounce, BindAll } from "lodash-decorators";
@Component({
  components: {
    InfiniteLoading,
  },
})
// @BindAll()
export default class infinite extends Vue {
//   @Debounce(50)
  onLoading(event) {
    this.$emit("loading", event);
  }
  created() {}
  mounted() {}
}
</script>
