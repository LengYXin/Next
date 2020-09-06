<!--
 * @Author: Erlin
 * @CreateTime: 2020-08-20 15:22:58
 * @LastEditors: Erlin
 * @LastEditTime: 2020-09-06 18:01:43
 * @Description: 我的
-->
<template>
  <div class="xt-content xt-page-my" :gutter="20">
    <a-row class="xt-page-my-header" type="flex" align="middle">
      <a-col :span="4" class="xt-text-align-center">
        <a-row type="flex" justify="center" align="middle" :gutter="10">
          <a-col>
            <a-avatar
              :src="PageStore.UserInfo.headThumbnailUri"
              :alt="PageStore.UserInfo.nickName"
              :size="45"
            />
          </a-col>
          <a-col
            class="xt-font-family-FZLTHJW"
            v-text="PageStore.UserInfo.nickName"
          ></a-col>
        </a-row>
      </a-col>
      <a-col :span="20" class="xt-font-size-md xt-text-yellow">
        <a-row type="flex" justify="start" align="middle" :gutter="2">
          <a-col class="xt-font-family-FZLTHJW" v-t="activeItem.key"></a-col>
          <a-col><a-icon :type="activeItem.icon" /></a-col>
        </a-row>
        <!-- <div class="xt-font-family-FZLTHJW" v-t="activeItem.key"></div>
        <a-icon :type="activeItem.icon" /> -->
      </a-col>
    </a-row>
    <a-row type="flex">
      <a-col :span="4">
        <a-affix :offset-top="72">
          <a-tabs
            tabPosition="left"
            :activeKey="activeKey"
            @change="tabsChange"
          >
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
        <nuxt-child />
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import { Observer } from "mobx-vue";
import { Modal } from "ant-design-vue";
import lodash from "lodash";

@Observer
@Component({
  asyncData(ctx) {
    return { defaultActiveKey: ctx.route.name };
  },
  components: {},
})
export default class PageView extends Vue {
  get PageStore() {
    return this.$store.$storeUser;
  }
  defaultActiveKey = "my";
  get activeKey() {
    return this.$route.name;
  }
  get activeItem() {
    return lodash.filter(
      this.tabPane,
      (item) => item.path === this.activeKey
    )[0];
  }
  tabPane = [
    { key: "course", path: "my", icon: "search" },
    { key: "homework", path: "my-homework", icon: "search" },
    { key: "showHomework", path: "my-showHomework", icon: "search" },
    { key: "order", path: "my-order", icon: "search" },
    { key: "letter", path: "my-letter", icon: "search" },
    { key: "information", path: "my-information", icon: "search" },
    { key: "security", path: "my-security", icon: "search" },
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
<style lang="less" scoped>
.xt-page-my {
  padding-top: @padding-lg;
  &-header {
    margin: 72px 0 32px;
  }
}
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