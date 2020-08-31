/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:16:32
 * @modify date 2020-08-05 14:16:32
 * @desc 分页
 */
<template>
  <transition name="opacity">
    <dir class="xt-pagination">
      <a-pagination
        v-show="isShow(Pagination.total, Pagination.pageSize)"
        :current="Pagination.current"
        :total="Pagination.total"
        :pageSize="Pagination.pageSize"
        @change="onCurrentChange"
        :item-render="itemRender"
      />
    </dir>
  </transition>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch, Inject } from "vue-property-decorator";
import { Pagination, PaginationOptions } from "@xt/client";
import { Observer } from "mobx-vue";
import { computed } from "mobx";
import lodash from "lodash";
import { config } from "@vue/test-utils";
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
  // 路由名称
  key = this.$route.name;
  // 当前页面显示
  get isConnected() {
    // return this.$el.isConnected && this.key === this.$route.name;
    return this.key === this.$route.name;
  }
  itemRender(current, type, originalElement) {
    // console.log("extends -> itemRender -> originalElement", originalElement);
    // console.log("extends -> itemRender -> type", type);
    if (type === "jump-next" || type === "jump-prev") {
      originalElement.children = undefined;
      originalElement.text = "•••";
      originalElement.data.class = originalElement.data.class + " xt-jump-link";
      return originalElement;
    }
    if (type === "prev") {
      originalElement.children = undefined;
      originalElement.text = "上一页";
      originalElement.data.class =
        "xt-pagination-link " + originalElement.data.class;
      return originalElement;
    } else if (type === "next") {
      originalElement.children = undefined;
      originalElement.text = "下一页";
      originalElement.data.class =
        "xt-pagination-link " + originalElement.data.class;
      return originalElement;
    }
    return originalElement;
  }

  isShow(total, pageSize) {
    return total > pageSize;
  }
  created() {
    this.onLoading();
  }
  mounted() {
    // console.log(this.$route);
  }
  onGetOptions() {
    const { current } = this.$route.query;
    let options: PaginationOptions = lodash.merge(
      {},
      this.Pagination.options,
      this.options
    );
    // 存在路由参数
    if (this.toQuery && !lodash.isNil(current)) {
      options.defaultCurrent = lodash.toInteger(current);
    }
    return options;
  }
  /**
   * 数据加载
   */
  onLoading() {
    // 请求 参数 存在 直接加载数据
    const options: PaginationOptions = this.onGetOptions();
    if (lodash.isObject(this.fetchBody)) {
      this.Pagination.onReset(options).onLoading(this.fetchBody);
    }
    this.emitChange(options.defaultCurrent, options);
  }
  /**
   * 页码更新
   */
  onCurrentChange(current) {
    if (this.Pagination.loading) {
      return;
    }
    // 需要更改地址栏
    if (this.toQuery) {
      this.$router.push({
        query: lodash.merge({}, this.$route.query, {
          current: current,
        }),
      });
    } else {
      this.emitChange(current, this.onGetOptions());
    }
  }
  emitChange(current, options) {
    this.$emit("change", current, options);
  }
  /**
   * 地址栏参数变更
   */
  @Watch("$route.query.current")
  queryUpdate(to, from, next) {
    if (this.isConnected) {
      if (this.toQuery) {
        const { current } = this.$route.query;
        if (!lodash.eq(String(current), String(this.Pagination.current))) {
          this.onLoading();
        }
      }
    }
  }
  updated() {}
  destroyed() {
    // this.$router.replace({
    //   query: lodash.merge({}, this.$route.query, {
    //     current: 1,
    //   }),
    // });
  }
}
</script>
<style lang="less">
.xt-pagination {
  .ant-pagination {
    text-align: center;
    &-prev,
    &-next {
      a {
        padding: 0 12px;
        color: @xt-golden-6;
        border-color: @xt-golden-6;
      }
      &:hover a {
        border-color: @xt-golden-6;
      }

      &:focus .ant-pagination-item-link,
      &:hover .ant-pagination-item-link {
        color: @xt-golden-6;
        border-color: @xt-golden-6;
      }
    }
    &-item-link {
      border: 1px solid @xt-golden-6;
      display: inline-block;
      min-width: 32px;
      height: 32px;
      border-radius: 4px;
    }

    &-item {
      color: @xt-golden-6;
      border-color: @xt-golden-6;
      a {
        color: @xt-golden-6;
      }
      &:focus,
      &:hover {
        border-color: @xt-golden-6;
        a {
          color: @xt-golden-6;
        }
      }
      &-active {
        color: @xt-white-6;
        background: @xt-golden-6;
        a {
          color: @xt-white-6;
        }

        &:focus,
        &:hover {
          color: @xt-white-6;
        }

        &:focus a,
        &:hover a {
          color: @xt-white-6;
        }
      }
    }
  }
}
</style>