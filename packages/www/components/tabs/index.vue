/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:16:32
 * @modify date 2020-08-05 14:16:32
 * @desc [description]
 */
<template>
  <a-affix v-if="affix" :offset-top="offsetTop">
    <a-tabs :activeKey="String(activeKey)" @change="tabsChange" :class="'xt-tabs-'+align">
      <a-tab-pane v-for="tab in tabPane" :key="String(tab.key)">
        <span slot="tab">
          <span v-text="tab.title"></span>
        </span>
      </a-tab-pane>
    </a-tabs>
  </a-affix>
  <!-- 非固定模式 -->
  <a-tabs v-else :activeKey="activeKey" @change="tabsChange" :class="'xt-tabs-'+align">
    <a-tab-pane v-for="tab in tabPane" :key="String(tab.key)">
      <span slot="tab">
        <span v-text="tab.title"></span>
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
  // 选择
  activeKey = lodash.get(this.$route.query, "active", this.defaultActiveKey);
  // 当前页面显示
  get isConnected() {
    return this.$el.isConnected && this.key === this.$route.name;
  }
  // 更改
  tabsChange(activeKey) {
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
  }
  // 组件中 使用不了 生命周期 beforeRouteUpdate
  @Watch("$route.query.active")
  queryUpdate(to, from, next) {
    if (this.isConnected) {
      const { active } = this.$route.query;
      if (!lodash.eq(active, this.activeKey)) {
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
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
