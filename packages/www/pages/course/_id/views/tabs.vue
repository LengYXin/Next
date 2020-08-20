<template>
  <div>
    <!-- <a-tabs :activeKey="activeKey" @change="tabsChange" class="xt-tabs-center">
      <a-tab-pane v-for="tab in tabPane" :key="tab.key">
        <span slot="tab">
          <span v-t="tab.value"></span>
        </span>
      </a-tab-pane>
    </a-tabs>-->
    <xt-tabs
      class="xt-cid-tabs"
      theme="circle"
      :tabPane="tabPane"
      :defaultActiveKey="defaultActiveKey"
      @tabsChange="tabsChange"
    />
    <keep-alive>
      <component :is="activeValue"></component>
    </keep-alive>
  </div>
</template>
<script lang="ts">
import {
  Component,
  Prop,
  Vue,
  Provide,
  Inject,
  Watch,
} from "vue-property-decorator";
import lodash from "lodash";
import { EnumLocaleLinks } from "@xt/client";
import introduction from "./introduction.vue";
import goToTheClass from "./class.vue";
import composition from "./composition.vue";
import sunDrying from "./sunDrying.vue";
import thoughts from "./thoughts.vue";
@Component({
  components: {
    [EnumLocaleLinks.links_courseIntroduction]: introduction,
    [EnumLocaleLinks.links_courseComposition]: composition,
    [EnumLocaleLinks.links_goToTheClass]: goToTheClass,
    [EnumLocaleLinks.links_sunDrying]: sunDrying,
    [EnumLocaleLinks.links_thoughts]: thoughts,
  },
})
export default class PageView extends Vue {
  defaultActiveKey = "ci";
  activeKey = lodash.get(this.$route.query, "active", this.defaultActiveKey);
  get activeValue() {
    return lodash.get(
      lodash.find(this.tabPane, ["key", this.activeKey]),
      "title",
      this.$EnumLocaleLinks.links_courseIntroduction
    );
  }
  get tabPane() {
    return [
      { key: "ci", title: this.$EnumLocaleLinks.links_courseIntroduction },
      { key: "cc", title: this.$EnumLocaleLinks.links_courseComposition },
      { key: "to", title: this.$EnumLocaleLinks.links_goToTheClass },
      { key: "sd", title: this.$EnumLocaleLinks.links_sunDrying },
      { key: "th", title: this.$EnumLocaleLinks.links_thoughts },
    ];
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
.xt-cid-tabs {
  padding: 40px 0;
}
</style>
