<!--
 * @Author: Erlin
 * @CreateTime: 2020-08-20 15:22:58
 * @LastEditors: Erlin
 * @LastEditTime: 2020-09-09 19:48:18
 * @Description: 我的
-->
<template>
  <div class="xt-content xt-page-my">
    <!-- <a-row class="xt-page-my-header" type="flex" align="middle">
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
      <a-col
        :span="20"
        class="xt-font-size-md xt-text-yellow xt-page-my-header-title"
      >
        <a-row type="flex" justify="start" align="middle" :gutter="10">
          <a-col class="xt-font-family-FZLTHJW" v-t="activeItem.key"></a-col>
          <a-icon :type="activeItem.icon" />
        </a-row>
      </a-col>
    </a-row> -->

    <a-row type="flex">
      <a-col :span="4">
        <a-affix :offset-top="72">
          <a-row
            class="xt-margin-bottom-lg xt-margin-top-lg"
            type="flex"
            justify="center"
            align="middle"
            :gutter="10"
          >
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
      <a-col class="xt-page-my-content" :span="20">
        <a-row
          type="flex"
          justify="start"
          align="middle"
          :gutter="10"
          class="xt-font-size-md xt-text-yellow xt-page-my-header-title"
        >
          <a-col class="xt-font-family-FZLTHJW" v-t="activeItem.key"></a-col>
          <a-icon :type="activeItem.icon" />
        </a-row>

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
    { key: "course", path: "my", icon: "laptop" },
    { key: "homework", path: "my-homework", icon: "edit" },
    { key: "showHomework", path: "my-showHomework", icon: "edit" },
    { key: "order", path: "my-order", icon: "container" },
    { key: "letter", path: "my-letter", icon: "mail" },
    { key: "information", path: "my-information", icon: "user" },
    { key: "security", path: "my-security", icon: "lock" },
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
  // &-header {
  //   margin: 72px 0 32px;
  // }
  &-header-title {
    height: 45px;
    padding-left: 20px;
    margin: 20px 0;
  }
  &-content {
    padding-left: 40px;
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