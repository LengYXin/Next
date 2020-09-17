/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:17:41
 * @modify date 2020-08-05 14:17:41
 * @desc [description]
 */
<template>
  <van-pull-refresh :value="Pagination.loading" @refresh="onRefresh">
    <van-list
      :value="Pagination.loading"
      :finished="Pagination.finished"
      finished-text="没有更多了"
      :immediate-check="false"
      @load="onLoading"
    >
      <slot>
        <div v-for="(item,index) in Pagination.dataSource" :key="getRowKey(item,index)">
          <slot name="renderItem" v-bind="item" />
        </div>
      </slot>
    </van-list>
  </van-pull-refresh>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Watch } from "vue-property-decorator";
import { Observer } from "mobx-vue";
import { Pagination } from "@xt/client";
import lodash from "lodash";
@Observer
@Component({
  components: {},
})
export default class Page extends Vue {
  @Prop({}) body: any;
  @Prop({}) rowKey: string;
  @Prop({ required: true }) Pagination: Pagination<any>;
  inspectName = this.$route.name;
  getRowKey(rowDate, index) {
    return lodash.get(rowDate, this.rowKey || this.Pagination.key, index);
  }
  // 刷新
  onRefresh() {
    this.onLoading(true);
  }
  // 加载
  onLoading(reset = false) {
    reset && this.Pagination.onReset({ infinite: true });
    this.Pagination.onLoading(this.body);
  }
  created() {
    this.onLoading(true);
  }
  // 参数变化
  @Watch("body")
  bodyUpdate(to, from, next) {
    if (this.inspectName === this.$route.name) {
      if (!lodash.isEqual(this.body, this.Pagination.oldBody)) {
        this.onLoading(true);
      }
    }
  }
  mounted() {}
  updated() {}
  destroyed() {
    // this.Pagination.onReset({ infinite: true });
  }
}
</script>
<style lang="less">
.van-pull-refresh {
  min-height: 70vh;
}
</style>
