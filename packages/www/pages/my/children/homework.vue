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

    <!-- <List :loading="Pagination.loading" :dataSource="Pagination.dataSource" /> -->
    <!-- 存在 更改地址栏 页签的时候 设置 key 用于触发初始化 change   -->
    <!-- <xt-pagination :key="activeKey" :Pagination="Pagination" :toQuery="true" /> -->
    <!-- @change="onCurrentChange" -->

    <a-list
      class="xt-content"
      item-layout="vertical"
      :data-source="Pagination.dataSource"
    >
      <!-- <nuxt-link slot="renderItem" slot-scope="item" :to="`/course/${item.courseId}`"> -->
      <a-list-item slot="renderItem" slot-scope="item, index">
        <!-- <a-list-item-meta :description="'来自《' + item.courseName + '》'">
          <a slot="title" href="https://www.antdv.com/">{{
            item.classhourName + item.homeworkTitle
          }}</a>
        </a-list-item-meta> -->
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
          <a-col :span="4">
            <a-button type="primary" v-if="item.suned !== 0">
              晒作业
            </a-button>
            <a-button type="primary" v-else disabled>已晒过</a-button>
          </a-col>
        </a-row>
        <div v-html="item.content"></div>
        <div>图片占位</div>
        <div class="xt-font-size-sm">共1张</div>
        <a-row type="flex" justify="space-around" align="middle">
          <a-col :span="14">
            {{ item.createTime }}
          </a-col>
          <a-col :span="10" class="xt-text-align-right">
            <span>cici助教已评阅作业</span
            ><a-button type="link" @click="showTeachingModal(index)"
              >去看看 ></a-button
            >
          </a-col>
        </a-row>
      </a-list-item>
      <!-- </nuxt-link> -->
    </a-list>

    <xt-infinite-loading
      :identifier="Pagination.onlyKey"
      @loading="onLoading"
    />

    <a-modal
      v-model="visible"
      title="助教老师说"
      :footer="null"
      :width="730"
      class="xt-homework-modal"
    >
      <div>
        <h3>{{ currentItem.classhourName + currentItem.homeworkTitle }}</h3>
        <a-row type="flex" justify="space-around" align="middle">
          <a-col :span="20">
            来自
            <nuxt-link :to="`/course/${currentItem.courseId}`"
              >《{{ currentItem.courseName }}》
            </nuxt-link></a-col
          >
          <a-col :span="4" class="xt-text-align-right">
            <a-button type="primary" v-if="currentItem.suned !== 0">
              晒作业
            </a-button>
            <a-buttton type="primary" v-else :disabled="disabled"
              >已晒过</a-buttton
            >
          </a-col>
        </a-row>
        <div v-html="currentItem.content"></div>
        <div>图片占位</div>
        <div class="xt-font-size-sm">共1张</div>
        <div>{{ currentItem.createTime }}</div>
      </div>

      <div>
        <a-row type="flex" justify="start" align="middle" :gutter="[12, 0]">
          <a-col flex="40px">
            <a-avatar size="large" icon="user" />
          </a-col>
          <a-col flex="auto">
            <div>张磊助教</div>
            <div>05-28 19:11</div>
          </a-col>
        </a-row>
        <div class="xt-content-reply">回复内容</div>
      </div>

      <div>
        <a-row type="flex" justify="end" align="middle" :gutter="[12, 0]">
          <a-col flex="auto" class="xt-text-align-right">
            <div>张磊助教</div>
            <div>05-28 19:11</div>
          </a-col>
          <a-col flex="40px">
            <a-avatar size="large" icon="user" />
          </a-col>
        </a-row>
        <div class="xt-text-align-right">
          <div class="xt-content-reply">回复内容</div>
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import { Modal } from "ant-design-vue";
import { Observer } from "mobx-vue";
import lodash from "lodash";
import { Context } from "@nuxt/types";

@Observer
@Component({
  // async fetch(ctx: Context) {
  //   // await ctx.store.$my.onGetMyCourseList();
  // },
  scrollToTop: true,
  components: {},
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
  defaultActiveKey = "1";
  activeKey = "1";
  visible = true;

  tabsChange(activeKey) {
    this.Pagination.onReset();
    this.activeKey = activeKey;
    this.onLoading();
  }
  onLoading(event?) {
    this.Pagination.onLoading({ typeKey: this.activeKey }, {}, event);
  }
  showTeachingModal(index) {
    this.visible = true;
    this.currentItem = this.Pagination.dataSource[index];
  }
  handleOk(e) {
    console.log(e);
    this.visible = false;
  }
  mounted() {
    console.log("PageView -> mounted -> this.Pagination", this.Pagination);
  }
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scope>
.xt-homework {
  &-modal {
    .ant-modal-content {
      background-color: #fdfcfa;
    }
  }
}
.xt-content-reply {
  margin: 0 20px;
  display: inline-block;
  padding: 20px;
  background-color: #ffffff;
}
</style>
