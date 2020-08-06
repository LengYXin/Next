<template>
  <div class="xt-content">
    <a-row type="flex">
      <a-col :span="4" >
        <div class="xt-text-align-center">
          <a-avatar :size="64" icon="user" />
        </div>
        <a-affix :offset-top="72">
          <a-tabs tabPosition="left" :activeKey="activeKey" @change="tabsChange">
            <a-tab-pane v-for="tab in tabPane" :key="tab.path">
              <span slot="tab">
                <span v-t="tab.key"></span>
              </span>
            </a-tab-pane>
          </a-tabs>
        </a-affix>
      </a-col>
      <a-col :span="20">
        <!-- <nuxt-child keep-alive /> -->
        <nuxt-child  />
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import { Modal } from "ant-design-vue";
@Component({
  asyncData(ctx) {
    return { defaultActiveKey: ctx.route.name };
  },
  components: {},
})
export default class PageView extends Vue {
  defaultActiveKey = "my";
  get activeKey() {
    return this.$route.name;
  }
  tabPane = [
    { key: "course", path: "my" },
    { key: "homework", path: "my-homework" },
    { key: "showHomework", path: "my-showHomework" },
    { key: "order", path: "my-order" },
    { key: "letter", path: "my-letter" },
    { key: "information", path: "my-information" },
    { key: "security", path: "my-security" },
  ];
  tabsChange(activeKey) {
    this.$router.push({
      name: activeKey,
    });
  }
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less">
</style>
<i18n>
{
  "en": {
    "course": "course",
    "homework": "Homework",
    "showHomework": "Show Homework",
    "order": "My Order",
    "letter": "Letter",
    "information": "Information",
    "security": "Security Set Up"
  },
  "zh": {
    "course": "去上课",
    "homework": "我的作业",
    "showHomework": "我晒出的作业",
    "order": "我的订单",
    "letter": "站内信",
    "information": "个人信息",
    "security": "安全设置"
  }
}
</i18n>