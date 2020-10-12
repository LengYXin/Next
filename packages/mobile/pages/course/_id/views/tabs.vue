<template>
  <div>
    <van-sticky :offset-top="0" z-index="101">
      <div class="xt-content">
        <xt-tabs
          theme="circle"
          :tabPane="tabPane"
          :defaultActiveKey="defaultActiveKey"
          @tabsChange="tabsChange"
        />
      </div>
    </van-sticky>
    <keep-alive>
      <component :is="activeValue"></component>
    </keep-alive>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import lodash from "lodash";
import { Observer } from "mobx-vue";
import { EnumLocaleLinks } from "@xt/client";
import tab_introduction from "./tab_introduction.vue";
import tab_class from "./tab_class.vue";
import tab_composition from "./tab_composition.vue";
import tab_sunDrying from "./tab_sunDrying.vue";
import tab_thoughts from "./tab_thoughts.vue";
// @Observer
@Component({
  components: {
    [EnumLocaleLinks.links_courseIntroduction]: tab_introduction,
    [EnumLocaleLinks.links_courseComposition]: tab_composition,
    [EnumLocaleLinks.links_goToTheClass]: tab_class,
    [EnumLocaleLinks.links_sunDrying]: tab_sunDrying,
    [EnumLocaleLinks.links_thoughts]: tab_thoughts,
  },
})
export default class PageView extends Vue {
  defaultActiveKey = "to";
  activeKey = lodash.get(this.$route.query, "active", this.defaultActiveKey);
  get activeValue() {
    return lodash.get(
      lodash.find(this.tabPane, ["key", this.activeKey]),
      "title",
      this.$EnumLocaleLinks.links_courseIntroduction
    );
  }
  /**
   * 单阶课程 true / 全阶 false
   */
  get single() {
    return true;
  }
  get tabPane() {
    let tabs = [
      { key: "ci", title: this.$EnumLocaleLinks.links_courseIntroduction },
    ];
    if (this.single) {
      tabs = lodash.concat(tabs, [
        { key: "to", title: this.$EnumLocaleLinks.links_goToTheClass }, //去上课地图页
        { key: "sd", title: this.$EnumLocaleLinks.links_sunDrying }, //晒作业
        { key: "th", title: this.$EnumLocaleLinks.links_thoughts }, //感想
      ]);
    } else {
      tabs = lodash.concat(tabs, [
        { key: "cc", title: this.$EnumLocaleLinks.links_courseComposition }, //课程组成
      ]);
    }
    return tabs;
  }
  tabsChange(activeKey) {
    this.activeKey = activeKey;
  }
  mounted() {
    // console.log(this.$route);
  }

  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scoped>
</style>
