/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:16:32
 * @modify date 2020-08-05 14:16:32
 * @desc 页签切换
 */
<template>
  <!-- <a-affix v-if="affix" :offset-top="offsetTop">
    <a-tabs
      :activeKey="String(activeKey)"
      @change="tabsChange"
      :class="themeClass"
    >
      <a-tab-pane v-for="tab in tabPane" :key="String(tab.key)">
        <span slot="tab">
          <span v-text="tab.title"></span>
        </span>
      </a-tab-pane>
    </a-tabs>
  </a-affix>-->
  <!-- 非固定模式 -->
  <a-tabs
    :activeKey="String(activeKey)"
    @change="tabsChange"
    :class="themeClass"
  >
    <a-tab-pane v-for="tab in tabPane" :key="String(tab.key)">
      <span slot="tab">
        <slot name="tab" v-bind="tab">
          <span v-t="tab.title"></span>
        </slot>
      </span>
    </a-tab-pane>
  </a-tabs>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import lodash from "lodash";
@Component({
  components: {},
})
export default class extends Vue {
  // 注册当前页面 name 为 key
  key = this.$route.name;
  // 固定模式
  @Prop({ default: false }) affix;
  // 固定距离
  @Prop({ default: 72 }) offsetTop;
  // 对其方式
  @Prop({ default: "center" }) align;
  // 默认选择
  @Prop({ default: 0 }) defaultActiveKey;
  // tabPane
  @Prop({ default: [], required: true }) tabPane;
  // 主题
  @Prop({ default: "" }) theme;
  // 联动路由
  @Prop({ default: true }) linkageRoute;
  // 选择
  activeKey: any = "0"; //lodash.get(this.$route.query, "active", this.defaultActiveKey);
  // 当前页面显示
  get isConnected() {
    // return this.$el.isConnected && this.key === this.$route.name;
    return this.key === this.$route.name;
  }
  get themeClass() {
    return `xt-tabs-${this.theme} xt-tabs-${this.align}`;
  }
  // 更改
  tabsChange(activeKey) {
    if (this.linkageRoute) {
      const query = lodash.merge({}, this.$route.query, {
        active: activeKey,
      });
      // 存在分页页码
      if (query.current) {
        query.current = "1";
      }
      this.$router.push({
        query,
      });
    } else {
      this.activeKey = activeKey;
      this.emitTabsChange();
    }
  }
  // 组件中 使用不了 生命周期 beforeRouteUpdate
  @Watch("$route.query.active")
  queryUpdate(to, from, next) {
    if (this.linkageRoute && this.isConnected) {
      const { active } = this.$route.query;
      if (!lodash.eq(String(active), String(this.activeKey))) {
        if (lodash.isNil(active)) {
          this.activeKey = this.defaultActiveKey;
        } else {
          this.activeKey = active;
        }
        this.emitTabsChange();
      }
    }
  }
  @Emit("tabsChange")
  emitTabsChange() {
    return this.activeKey;
  }
  created() {
    if (this.linkageRoute) {
      this.activeKey = lodash.get(
        this.$route.query,
        "active",
        this.defaultActiveKey
      );
    } else {
      this.activeKey = this.defaultActiveKey;
    }
  }
  mounted() {
    // console.log("LENG: mounted -> this", this);
  }
  updated() {}
  destroyed() {}
}
</script>
<style lang="less">
@xt-tab-cls: ~"xt-tabs";
@circle-padding: 20px;
.ant-tabs {
  &.@{xt-tab-cls} {
    &-center,
    .ant-tabs {
      text-align: center;
    }

    &-left,
    .ant-tabs {
      text-align: left;
    }

    &-right,
    .ant-tabs {
      text-align: right;
    }

    // 无边框
    &-not {
      color: @xt-grey-6;
      .ant-tabs-nav-container {
        font-size: @font-size-md;
      }
      .ant-tabs-bar {
        border: none;
      }

      .ant-tabs-ink-bar {
        opacity: 0;
      }

      .ant-tabs-nav .ant-tabs-tab {
        margin: 0;
        padding-right: 0;
      }
    }

    // 黑色
    &-black {
      .ant-tabs-nav-container {
        font-size: @font-size-lg;
      }
      .ant-tabs-tab {
        &:hover {
          color: @black;
        }

        &:active {
          color: @black;
        }

        &-active {
          color: @black;
          font-weight: 500;
        }
      }

      .ant-tabs-ink-bar {
        background-color: @black;
      }
    }

    // 黄色
    &-yellow {
      .ant-tabs-nav-container {
        font-size: @font-size-md;
      }
      .ant-tabs-bar {
        border: none;
      }
      .ant-tabs-tab {
        &:hover {
          color: @xt-yellow-6;
        }

        &:active {
          color: @xt-yellow-6;
        }

        &-active {
          color: @xt-yellow-6;
          font-weight: 500;
        }
      }

      .ant-tabs-ink-bar {
        background-color: @xt-yellow-6;
      }
    }

    // 圆的
    &-circle {
      padding-bottom: @circle-padding;
      overflow: hidden;

      .ant-tabs-bar {
        margin: 0px;
        padding-bottom: @circle-padding / 2;
      }

      .ant-tabs-nav-wrap,
      .ant-tabs-nav-container,
      .ant-tabs-nav-scroll {
        // overflow-y: visible;
        overflow: initial;
      }
      .ant-tabs-top-content,
      .ant-tabs-bottom-content {
        padding-top: 10px;
        text-align: left;
      }
      .ant-tabs-ink-bar {
        background-color: transparent;

        &::after {
          content: " ";
          display: block;
          border-radius: 100%;
          height: @circle-padding;
          width: @circle-padding !important;
          border: 4px solid #fff;
          box-shadow: 0 7px 7px 2px rgba(14, 5, 10, 0.05);
          margin: auto;
          background-color: @xt-yellow-6;
          // transform: translateY(@circle-padding/2);
        }
      }
    }
  }
}
</style>