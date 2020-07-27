<template>
  <div class="xt-content">
    <a-tabs :activeKey="activeKey" @change="tabsChange" class="xt-tabs-center">
      <a-tab-pane v-for="tab in tabPane" :key="tab">
        <span slot="tab">
          <span v-t="tab"></span>
        </span>
      </a-tab-pane>
    </a-tabs>
    <a-row :gutter="16">
      <a-col v-for="item in 12" :key="item" :span="6">
        <a-card :bordered="false">
          <img v-lazy />
        </a-card>
      </a-col>
    </a-row>
    <a-pagination class="xt-pagination-center" :default-current="6" :total="500" />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject,Watch } from "vue-property-decorator";
import lodash from "lodash";
@Component({
  components: {},
})
export default class PageView extends Vue {
  activeKey = lodash.get(this.$route.query, "active", "all");
  tabPane = [
    "all",
    "studyRoom",
    "book",
    "tea",
    "fragrant",
    "qin",
    "furniture",
    "other",
  ];
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
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<i18n>
{
  "en": {
    "all": "All",
    "studyRoom": "Study Room",
    "book": "Book",
    "tea": "Tea",
    "fragrant": "Fragrant",
    "qin": "Qin",
    "furniture": "Furniture",
    "other": "Other"
  },
  "zh": {
    "all": "全部",
    "studyRoom": "文房",
    "book": "书",
    "tea": "茶",
    "fragrant": "香",
    "qin": "琴",
    "furniture": "家具",
    "other": "其他"
  }
}
</i18n>