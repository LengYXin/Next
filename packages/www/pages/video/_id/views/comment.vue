<template>
  <div :data-id="reply.id">
    <xt-editor
      class="xt-editor-upload-hide"
      @submit="onSubmit"
      :rules="{required:true,max:2000}"
      buttonText="发布评论"
    ></xt-editor>
    <xt-comment v-for="item in Pagination.dataSource" :key="item.id" :comment="getComment(item)">
      <template slot="actions">
        <xt-action @click="onLikes(item)" :statistics="item.likeCount" :action="item.likeRecord" />
        <xt-action @click="onReply(item)" title="回复" />
      </template>
      <xt-editor
        @submit="onSubmit($event,item)"
        v-if="eqReply(item)"
        class="xt-editor-single"
        placeholder="回复xxx"
        buttonText="回复"
      />
    </xt-comment>
    <xt-pagination :Pagination="Pagination" @change="onCurrentChange" />
  </div>
</template>
<script lang="ts">
import { ControllerVideo } from "@xt/client";
import { Component, Inject, Vue, Watch, Provide } from "vue-property-decorator";
import { Context } from "@nuxt/types";
import { Observer } from "mobx-vue";
import lodash from "lodash";
@Observer
@Component({
  components: {},
})
export default class PageView extends Vue {
  @Inject("VideoStore")
  PageStore: ControllerVideo;
  get Pagination() {
    return this.PageStore.PaginationComment;
  }
  get id() {
    return this.$route.params.id;
  }
  // 回复
  reply: any = {};
  getComment(item) {
    return {
      content: item.content,
      avatar: item.userHeader,
      author: item.userNickname,
      time: item.createTime,
      toUserName: item.toUserNickname,
    };
  }
  /**
   * 是否回复
   */
  eqReply(data) {
    return lodash.eq(this.reply.id, data.id);
  }
  /**
   *  初始化 和 页码 更改调用
   */
  onCurrentChange(current) {
    this.Pagination.onCurrentChange(current, {
      videoShareId: this.$route.params.id,
    });
  }
  /**
   * 点赞
   */
  onLikes(data) {
    try {
      this.$InspectUser();
      this.Pagination.onLikes(data);
    } catch (error) {
      this.$message.warning({ content: error, key: "onLikes" });
    }
  }
  /**
   * 回复
   */
  onReply(data) {
    if (this.eqReply(data)) {
      return (this.reply = {});
    }
    this.reply = data;
  }
  async onSubmit(event, data) {
    try {
      this.$InspectUser();
      await this.Pagination.onInstall({
        videoShareId: this.id,
        content: event.html,
        contentLength: event.length,
        userType: 1,
        toCommentId: data?.id || 0,
        toUserId: data?.userId,
        toUserNickname: data?.userNickname,
      });
      event.onReset();
      this.reply = {};
      this.onCurrentChange(1);
    } catch (error) {
      console.log("LENG: PageView -> onSubmit -> error", error);
      // this.$message.error(error);
    }
  }
  created() {
    this.Pagination.onReset();
  }
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" >
</style>
