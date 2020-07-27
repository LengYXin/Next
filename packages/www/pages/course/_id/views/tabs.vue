<template>
  <div>
    <a-tabs :activeKey="activeKey" @change="tabsChange" class="xt-tabs-center">
      <a-tab-pane v-for="tab in tabPane" :key="tab.key">
        <span slot="tab">
          <span v-t="tab.value"></span>
        </span>
      </a-tab-pane>
    </a-tabs>
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
import { EnumLocaleLinks } from "@xt/client/languages";
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
  activeKey = lodash.get(this.$route.query, "active", "ci");
  get activeValue() {
    return lodash.get(
      lodash.find(this.tabPane, ["key", this.activeKey]),
      "value",
      this.$EnumLocaleLinks.links_courseIntroduction
    );
  }
  get tabPane() {
    return [
      { key: "ci", value: this.$EnumLocaleLinks.links_courseIntroduction },
      { key: "cc", value: this.$EnumLocaleLinks.links_courseComposition },
      { key: "to", value: this.$EnumLocaleLinks.links_goToTheClass },
      { key: "sd", value: this.$EnumLocaleLinks.links_sunDrying },
      { key: "th", value: this.$EnumLocaleLinks.links_thoughts },
    ];
  }
  tabsChange(activeKey) {
    // this.activeKey = activeKey;
    this.$router.push({
      query: lodash.merge({}, this.$route.query, {
        active: activeKey,
      }),
    });
  }
  // 组件中 使用不了 生命周期 beforeRouteUpdate
  @Watch("$route.query")
  queryUpdate(to, from, next) {
    const { active } = this.$route.query;
    if (active && !lodash.eq(active, this.activeKey)) {
      this.activeKey = active as any;
    }
    // next();
  }
  mounted() {
    // console.log(this.$route);
  }

  updated() {}
  destroyed() {}
}
</script>
