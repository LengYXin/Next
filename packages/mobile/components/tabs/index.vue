/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:16:32
 * @modify date 2020-08-05 14:16:32
 * @desc 页签切换
 */
<template>
  <van-tabs @change="tabsChange" v-model="activeKey">
    <van-tab
      v-for="item in tabPane"
      :key="item.key"
      :name="String(item.key)"
      :title="item.title"
    ></van-tab>
  </van-tabs>
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
  // 默认选择
  @Prop({ default: 0 }) defaultActiveKey;
  // tabPane
  @Prop({ default: [], required: true }) tabPane;
  // 联动路由
  @Prop({ default: true }) linkageRoute;
  // 选择
  activeKey: any = "0"; //lodash.get(this.$route.query, "active", this.defaultActiveKey);
  // 当前页面显示
  get isConnected() {
    // return this.$el.isConnected && this.key === this.$route.name;
    return this.key === this.$route.name;
  }
  // get themeClass() {
  //   return `xt-tabs-${this.theme} xt-tabs-${this.align}`;
  // }
  // 更改
  async tabsChange(activeKey) {
    if (this.linkageRoute) {
      const query = lodash.merge({}, this.$route.query, {
        active: activeKey,
      });
      // 存在分页页码
      if (query.current) {
        query.current = "1";
      }
      await this.$router.replace({
        query,
      });
      this.emitTabsChange();
    } else {
      // this.activeKey = activeKey;
      this.emitTabsChange();
    }
  }
  // 组件中 使用不了 生命周期 beforeRouteUpdate
  // @Watch("$route.query.active")
  // queryUpdate(to, from, next) {
  //   if (this.linkageRoute && this.isConnected) {
  //     const { active } = this.$route.query;
  //     if (!lodash.eq(String(active), String(this.activeKey))) {
  //       if (lodash.isNil(active)) {
  //         this.activeKey = this.defaultActiveKey;
  //       } else {
  //         this.activeKey = active;
  //       }
  //       this.emitTabsChange();
  //     }
  //   }
  // }
  @Emit("tabsChange")
  emitTabsChange() {
    return this.activeKey;
  }
  created() {
    if (this.linkageRoute) {
      this.activeKey = String(
        lodash.get(this.$route.query, "active", this.defaultActiveKey)
      );
    } else {
      this.activeKey = String(this.defaultActiveKey);
    }
  }
  mounted() {
    console.log("LENG: mounted -> this", this);
  }
  updated() {}
  destroyed() {}
}
</script>
<style lang="less">
</style>