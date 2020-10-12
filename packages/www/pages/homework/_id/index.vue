<!--
 * @Author: Erlin
 * @CreateTime: 2020-09-28 18:35:28
 * @LastEditors: Erlin
 * @LastEditTime: 2020-10-12 18:56:09
 * @Description: 交作业
-->
<template>
  <div class="xt-content xt-homework-id">
    <a-row type="flex" class="xt-homework-id-warp xt-font-family-FZLTHJW">
      <a-col class="xt-homework-id-intro" :span="13">
        <h3 v-html="PageStore.detail.homeworkTitle"></h3>
        <div
          class="xt-font-size-md xt-homework-id-content"
          v-html="PageStore.detail.homeworkContent"
        ></div>
      </a-col>
      <a-col class="xt-homework-id-submit-warp" :span="11">
        <div class="xt-flex xt-justify-between">
          <div class="xt-font-size-lg">交作业</div>
          <a href="javascript:history.back(-1)">
            <div class="xt-text-yellow">
              <a-icon type="double-right" :rotate="180" />
              返回去上课
            </div>
          </a>
        </div>
        <div class="xt-margin-top-lg xt-margin-bottom-sm">
          说说你的作业感想吧（2000字以内）
        </div>
        <xt-editor
          class="xt-homework-id-editor"
          @submit="onSubmit"
          buttonText="提交"
          :placeholder="placeholder"
        >
          <a-checkbox class="ant-checkbox-yellow">
            <span class="xt-font-size-sm">同时分享至“晒作业”</span>
          </a-checkbox>
        </xt-editor>

        <!-- <a-empty :image="$images.logo" description="等待你的作业哦" /> -->

        <a-spin :spinning="Pagination.loading">
          <div class="xt-margin-top-lg">
            <div class="xt-text-grey">你已提交过:</div>
            <List
              :dataSource="Pagination.dataSource"
              :rowKey="Pagination.key"
              @sun="sun"
              @del="del"
              @reply="onReply"
            />
            <xt-infinite-loading
              :identifier="Pagination.onlyKey"
              @loading="onLoading"
            />
          </div>
          <!-- <a-empty  :image="$images.logo" description="等待你的作业哦" /> -->
        </a-spin>
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Context } from "@nuxt/types";
import { Observer } from "mobx-vue";
import lodash from "lodash";
import List from "./views/list.vue";

@Observer
@Component({
  // 每次进入页面都会调用
  async fetch(ctx: Context) {
    let id = lodash.get(ctx.params, "id", 0);
    await ctx.store.$storeHomework.onGetHomeworkDetail(id);
  },
  components: { List },
})
export default class PageView extends Vue {
  placeholder = "单张图片较大时，上传时间会比较长，建议控制在5M以内哦~";
  get PageStore() {
    return this.$store.$storeHomework;
  }
  get Pagination() {
    return this.PageStore.Homework;
  }
  get homeworkId() {
    return this.$route.params.id;
  }
  async onLoading(event?) {
    this.Pagination.onLoading(
      { homeworkAssignId: this.homeworkId },
      null,
      event
    );
  }
  created() {}
  updated() {}
  destroyed() {
    this.Pagination.onReset();
  }
  /**
   * 提交作业
   */
  async onSubmit(event, data) {
    await this.Pagination.onHomeworkAdd({
      classhourId: "352",
      content: event.html,
      contentNum: event.length,
      courseId: "29",
      courseType: 1,
      homeworkAssignId: this.homeworkId,
      homeworkTypeId: 1,
      isSun: false,
      picList: event.fileResult,
    });
    event.onReset();
    this.Pagination.onReset();
  }
  /**
   * 回复
   */
  async onReply(data) {
    try {
      await this.Pagination.onReply({
        homeworkId: data.homeworkFinishId,
        courseId: data.courseId,
        replyContent: data.event.html,
        replyContentNum: data.event.length,
      });
      this.Pagination.onReset();
    } catch (error) {
      this.$message.warning({ content: this.$tc(error), key: error });
    }
  }
  /**
   * 晒作业
   */
  async sun(item) {
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
  async del(item) {
    try {
      await this.Pagination.onDelWork(item.homeworkFinishId);
      this.$message.success(this.$tc(this.$EnumMessage.delete_success));
    } catch (error) {
      this.$message.warning({ content: this.$tc(error), key: error });
    }
  }
}
</script>
<style lang="less">
@pageclass: .xt-homework-id;
@height: 800px;
@background: #f8f3ee;
.ant-layout-content.xt-page-homework-id {
  background: @background !important;
}

@{pageclass} {
  &-warp {
    margin-top: 2px;
    min-height: @height;
    width: 100%;
    .ant-card-body {
      padding: 0;
    }
  }
  &-editor {
    .ql-editor {
      font-size: 14px;
      font-family: FZLTHJW--GB1-0;
    }
    .xt-editor-btn {
      height: 30px;
      line-height: 30px;
    }
  }
  &-content {
    img {
      margin: 10px auto;
      display: block;
      max-width: 100%;
      height: auto;
      border-radius: 4px;
    }
    hr {
      margin-top: 20px;
      margin-bottom: 20px;
      border: 0;
      border-top: 1px solid #f5f5f5;
    }
  }
}
</style>
<style lang="less" scoped>
@pageclass: .xt-homework-id;
@height: 800px;
@{pageclass} {
  &-intro {
    min-height: @height;
    padding: 54px 34px 64px;
    background-color: #ffffff;
  }
  &-submit-warp {
    background-color: #fdfcfa;
    min-height: @height;
    padding: 54px 30px 10px;
  }
}
</style>