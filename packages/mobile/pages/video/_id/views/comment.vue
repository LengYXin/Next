<template>
  <div class="xt-videoid-comment">
    <h1 class="xt-title-h5 xt-margin-bottom-lg">
      全部评论(
      <span v-text="Pagination.total"></span>
      )
    </h1>
    <xt-refresh-list :Pagination="Pagination" :body="body">
      <template #renderItem="item">
        <xt-comment :comment="getComment(item)">
          <van-row class="xt-videoid-comment-btn" type="flex">
            <van-col span="10">
              <van-cell icon="chat-o" @click.prevent.stop="onReply(item)" />
            </van-col>
            <van-col span="14">
              <van-cell
                :icon="isLink(item)"
                :value="item.likeCount"
                @click.prevent.stop="onLikes(item)"
              />
            </van-col>
          </van-row>
        </xt-comment>
      </template>
    </xt-refresh-list>
    <xt-editor
      class="xt-editor-upload-hide xt-editor-single"
      @submit="onSubmit"
      :rules="{required:true,max:2000}"
      :placeholder="placeholder"
      buttonText="发布"
    ></xt-editor>
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
  get body() {
    return { videoShareId: this.id };
  }
  get id() {
    return this.$route.params.id;
  }
  get placeholder() {
    return this.eqReply(this.reply)
      ? `回复 ${this.reply.userNickname}`
      : "说说你的想法吧";
  }
  isLink(item) {
    return item.likeRecord ? "like" : "like-o";
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
    return data.id && lodash.eq(this.reply.id, data.id);
  }
  /**
   * 点赞
   */
  onLikes(data) {
    try {
      try {
        this.$InspectUser();
      } catch (error) {
        return;
      }
      this.Pagination.onLikes(data);
    } catch (error) {
      this.$toast(this.$tc(error));
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
      data = this.reply;
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
      this.Pagination.onReset({ infinite: true });
      this.Pagination.onLoading(this.body);
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
.xt-videoid-comment {
  &-btn {
    min-width: 90px;
    .van-icon {
      color: @xt-yellow-6;
    }
    .van-cell {
      padding: 0;
      background: transparent;
      white-space: nowrap;
    }
  }
}
</style>
