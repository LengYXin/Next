/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:13:26
 * @modify date 2020-08-05 14:13:26
 * @desc 作业
 */
<template>
  <div class="xt-homework">
    <xt-tabs
      :affix="true"
      align="right"
      theme="not"
      :tabPane="tabPane"
      :defaultActiveKey="defaultActiveKey"
      @tabsChange="tabsChange"
    />
    <a-list
      class="xt-content"
      item-layout="vertical"
      :data-source="Pagination.dataSource"
    >
      <a-list-item slot="renderItem" slot-scope="item">
        <h3 v-text="item.classhourName + item.homeworkTitle"></h3>
        <a-row type="flex" justify="space-around" align="middle">
          <a-col :span="20">
            来自
            <nuxt-link
              :to="`/course/${item.courseId}`"
              v-text="'《' + item.courseName + '》'"
            >
            </nuxt-link
          ></a-col>
          <a-col :span="4" class="xt-text-align-right">
            <a-button
              type="primary"
              v-if="item.suned == 0"
              class="ant-btn-yellow ant-button-round"
              @click="sunHomework(item)"
            >
              晒作业
            </a-button>
            <a-button
              type="primary"
              v-else
              class="ant-btn-line-yellow ant-button-round"
              >已晒过</a-button
            >
          </a-col>
        </a-row>
        <div v-html="item.content"></div>
        <xt-nine
          size="120"
          thumb="waterThumbUrl"
          :dataSource="item.picList || []"
        />
        <div
          v-if="item.picList && item.picList.length > 0"
          class="xt-font-size-sm"
          v-text="'共' + (item.picList || []).length + '张'"
        ></div>
        <a-row type="flex" justify="space-around" align="middle">
          <a-col :span="14">
            {{ item.createTime }}
          </a-col>
          <a-col
            :span="10"
            class="xt-text-align-right"
            v-if="item.reviewed == 1"
          >
            <span v-text="item.reviewUserName + '助教已评阅作业'"></span>
            <Reply :id="item.homeworkFinishId" />
          </a-col>
          <a-col :span="10" class="xt-text-align-right" v-else>
            <a-popconfirm
              title="作业确定删除吗？"
              ok-text="确认"
              cancel-text="取消"
              @confirm="delHomework(item)"
            >
              <a-button type="link" icon="delete">删除作业</a-button>
            </a-popconfirm>
          </a-col>
        </a-row>
      </a-list-item>
    </a-list>

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
import Reply from "./views/reply.vue";

@Observer
@Component({
  scrollToTop: true,
  components: { Reply },
})
export default class PageView extends Vue {
  @Provide("MyStore")
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
  activeKey = 1;
  visible = true;

  tabsChange(activeKey) {
    this.Pagination.onReset();
    this.activeKey = activeKey;
    this.onLoading();
  }
  onLoading(event?) {
    this.Pagination.onLoading({ typeKey: this.activeKey }, {}, event);
  }
  async sunHomework(item) {
    try {
      await this.Pagination.onSunWork(item);
      this.$message.success({
        content: "晒作业成功",
        key: "sunHomeworkSuccess",
      });
    } catch (error) {
      this.$message.warning({ content: error, key: "sunHomeworkErr" });
    }
  }
  async delHomework(item) {
    try {
      await this.Pagination.ondelWork(item);
      this.$message.success({ content: "删除成功", key: "delHomework" });
    } catch (error) {
      this.$message.warning({
        content: "删除失败，请重试",
        key: "delHomework",
      });
    }
  }
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scope>
</style>
