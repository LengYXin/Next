<!--
 * @Author: Erlin
 * @CreateTime: 2020-09-03 10:33:03
 * @LastEditors: Erlin
 * @LastEditTime: 2020-10-09 15:15:05
 * @Description: 我的作业
-->

<template>
  <div class="xt-homework">
    <xt-tabs
      :affix="true"
      align="right"
      theme="yellow"
      :tabPane="tabPane"
      :defaultActiveKey="defaultActiveKey"
      @tabsChange="tabsChange"
    >
      <span slot="tab" slot-scope="tab">
        <span v-t="tab.title"></span>
      </span>
    </xt-tabs>
    <List
      :loading="Pagination.loading"
      :dataSource="Pagination.dataSource"
      :rowKey="Pagination.key"
      @sun="onSunWork"
      @del="onDelWork"
    />

    <xt-infinite-loading
      :identifier="Pagination.onlyKey"
      @loading="onLoading"
    />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import { Modal } from "ant-design-vue";
import { Observer } from "mobx-vue";
import lodash from "lodash";
import { Context } from "@nuxt/types";
import List from "./views/list.vue";

@Observer
@Component({
  scrollToTop: true,
  components: { List },
})
export default class PageView extends Vue {
  get PageStore() {
    return this.$store.$my;
  }
  get Pagination() {
    return this.PageStore.MyWork;
  }
  currentItem = {};
  tabPane = [
    { key: 1, title: "已评阅" },
    { key: 0, title: "已提交" },
  ];
  defaultActiveKey = 1;
  activeKey = lodash.get(this.$route.query, "active", this.defaultActiveKey);
  visible = true;

  tabsChange(activeKey) {
    this.Pagination.onReset();
    this.activeKey = activeKey;
  }
  onLoading(event?) {
    this.Pagination.onLoading({ typeKey: this.activeKey }, {}, event);
  }
  /**
   * 晒作业
   */
  async onSunWork(item) {
    try {
      await this.Pagination.onSunWork(item);
      this.$message.success(this.$tc(this.$EnumMessage.sundrying_success));
    } catch (error) {
      this.$message.warning({ content: this.$tc(error), key: error });
    }
  }

  /**
   * 删除作业
   */
  async onDelWork(item) {
    try {
      await this.Pagination.onDelWork(item.homeworkFinishId);
      this.$message.success(this.$tc(this.$EnumMessage.delete_success));
    } catch (error) {
      this.$message.warning({ content: this.$tc(error), key: error });
    }
  }
  mounted() {}
  updated() {}
  destroyed() {
    this.Pagination.onReset();
  }
}
</script>
<style lang="less" scope>
</style>
