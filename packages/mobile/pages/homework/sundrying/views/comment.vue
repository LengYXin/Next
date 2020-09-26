<template>
  <div class="xt-videoid-comment">
    <h1 class="xt-title-h5 xt-margin-bottom-lg">
      全部评论(
      <span v-text="dataSource.length"></span>
      )
    </h1>
    <!-- <xt-refresh-list :Pagination="Pagination" :body="body"> -->
    <!-- <template #renderItem="item"> -->
    <xt-comment
      v-for="item in dataSource"
      :key="item.id"
      :comment="getComment(item)"
    >
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
    <!-- </template> -->
    <!-- </xt-refresh-list> -->
    <xt-editor
      class="xt-editor-upload-hide xt-editor-single"
      @submit="onSubmit"
      :rules="{ required: true, max: 2000 }"
      :placeholder="placeholder"
      buttonText="发布"
    ></xt-editor>
  </div>
</template>
<script lang="ts">
import { ControllerVideo } from "@xt/client";
import { Component, Prop, Vue, Watch, Provide } from "vue-property-decorator";
import { Context } from "@nuxt/types";
import { Observer } from "mobx-vue";
import lodash from "lodash";
@Observer
@Component({
  components: {},
})
export default class PageView extends Vue {
  // @Prop({}) momentId;
  @Prop({}) dataSource;
  get PageStore() {
    return this.$store.$storeHomework.Details;
  }
  getComment(item) {
    return {
      toUserName: item.toUserNickname,
      content: item.content,
      avatar: item.userHeader,
      author: item.userNickname,
      time: item.createTime,
      bishan: item.bishanNum,
      imgs: item.momentPictures,
    };
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
      // this.Pagination.onLikes(data);
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
      this.$InspectUser();
      this.$emit("submit", event, this.reply);
      event.onReset();
      this.onReply({});
    } catch (error) {
      console.log("LENG: PageView -> onSubmit -> error", error);
    }
  }
  created() {
    // this.Pagination.onReset();
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
