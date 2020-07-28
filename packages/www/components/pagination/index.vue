<template>
  <a-pagination
    class="xt-pagination-center"
    :current="Pagination.current"
    :total="Pagination.total"
    :pageSize="Pagination.pageSize"
    @change="onCurrentChange"
  />
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch, Inject } from "vue-property-decorator";
import { Pagination, PaginationOptions } from "@xt/client/entities";
import { Observer } from "mobx-vue";
import lodash from "lodash";
@Observer
@Component({
  components: {},
})
export default class extends Vue {
  //   @Inject("Pagination")
  @Prop({ required: true }) Pagination: Pagination<any>;
  // 重置 配置
  @Prop({ default: undefined }) options: PaginationOptions;
  // 改变路由参数
  @Prop({ default: false }) toQuery;
  // 初始化 数据参数
  @Prop({ default: undefined }) fetchBody;
  created() {
    this.onLoading();
  }
  mounted() {
    // console.log(this);
  }
  /**
   * 数据加载
   */
  onLoading() {
    if (lodash.isObject(this.fetchBody)) {
      const { current } = this.$route.query;
      let options: PaginationOptions = lodash.merge({}, this.options);
      if (this.toQuery && !lodash.isNil(current)) {
        options.defaultCurrent = lodash.toInteger(current);
      }
      this.Pagination.onReset(options).onLoading(this.fetchBody);
    }
  }
  /**
   * 页码更新
   */
  onCurrentChange(current) {
    if (this.toQuery) {
      this.$router.push({
        query: lodash.merge({}, this.$route.query, {
          current: current,
        }),
      });
    } else {
      this.Pagination.onCurrentChange(current);
    }
  }
  /**
   * 地址栏参数变更
   */
  @Watch("$route.query.current")
  queryUpdate(to, from, next) {
    if (this.toQuery) {
      const { current } = this.$route.query;
      if (current && !lodash.eq(current, this.Pagination.current)) {
        this.onLoading();
      }
    }
  }
  updated() {}
  destroyed() {}
}
</script>
