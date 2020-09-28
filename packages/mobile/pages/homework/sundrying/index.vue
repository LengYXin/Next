/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:17:47
 * @modify date 2020-08-05 14:17:47
 * @desc 晒作业详情
 */
<template>
  <div class="xt-content">
    <xt-comment :comment="getComment(PageStore.dataSource)">
      <template #title="comment">
        <span class="xt-comment-author" v-text="comment.author"></span>
        <time
          class="xt-comment-time"
          v-dateFormat="comment.time"
          format="MM-DD HH:mm"
        />
      </template>
      <template #time="comment">
        <div class="xt-text-grey">
          <span v-text="comment.viewCount"></span><span>位同学看过</span>
        </div>
      </template>
      <template #actions="comment">
        <div @click="onAction(comment)">
          <van-icon name="ellipsis" />
        </div>
      </template>
      <van-row type="flex">
        <van-col span="10">
          <van-cell
            class="xt-text-yellow xt-padding-tb-none"
            icon="chat-o"
            :to="{
              name: 'homework-sundrying',
              query: { id: PageStore.dataSource.id },
            }"
          />
        </van-col>
        <van-col span="14">
          <van-cell
            class="xt-text-yellow xt-padding-tb-none"
            :icon="isLink(PageStore.dataSource)"
            :value="PageStore.dataSource.likeCount"
            @click.prevent.stop="onLikes(PageStore.dataSource)"
          />
        </van-col>
      </van-row>
    </xt-comment>
    <Vcomment
      :dataSource="PageStore.dataSource.momentComments"
      @submit="onSubmit"
    />
    <van-action-sheet
      :round="false"
      :value="actionShow"
      :actions="actions"
      @select="onSelect"
      cancel-text="取消"
      close-on-click-action
      @click-overlay="onAction({})"
      @cancel="onAction({})"
    />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Observer } from "mobx-vue";
import Vcomment from "./views/comment.vue";
import lodash from "lodash";
@Observer
@Component({
  validate({ query }) {
    return /^\d+$/.test(query.id as string);
  },
  // 每次进入页面都会调用
  async fetch(ctx) {
    await ctx.store.$storeHomework.Details.onLoading({
      momentId: ctx.query.id,
    });
  },
  components: { Vcomment },
})
export default class PageView extends Vue {
  head() {
    return this.$AppCreateShareData({ title: "作业详情" });
  }
  get momentId() {
    return this.$route.query.id as string;
  }
  get PageStore() {
    return this.$store.$storeHomework.Details;
  }
  get Pagination() {
    return this.$store.$storeHomework.SunDrying;
  }
  action: any = {};
  get actionShow() {
    return lodash.hasIn(this.action, "id");
  }
  get actions() {
    if (this.$eqUser(this.action.userId)) {
      return [{ name: "删除", key: "delete" }];
    }
    return [{ name: "私信", key: "letter" }];
  }
  getComment(item) {
    return {
      id: item.id,
      userId: item.userId,
      content: item.content,
      avatar: item.userHeader,
      author: item.userNickname,
      time: item.createTime,
      bishan: item.bishanNum,
      imgs: item.momentPictures || [],
      viewCount: item.viewCount,
    };
  }
  isLink(item) {
    return item.likeRecord ? "like" : "like-o";
  }
  onAction(action) {
    this.action = action;
  }
  onSelect(event) {
    switch (lodash.get(event, "key")) {
      case "letter":
        // this.onDelete(this.action);
        break;
      case "delete":
        this.onDelete(this.action);
        break;
    }
  }
  // 加载数据
  async onLoading(momentId) {
    if (momentId) {
      await this.PageStore.onLoading({ momentId });
    }
  }
  onAddbrowsenum(item) {
    this.Pagination.onAddbrowsenum(item.id);
  }
  /**
   * 删除
   */
  async onDelete(item) {
    try {
      // await this.Pagination.onDeleteMoment(item.id);
      // this.onReply({});
    } catch (error) {}
  }
  async onLikes(item) {
    try {
      // await this.Pagination.onLikes(item);
    } catch (error) {
      this.$tc(error);
    }
  }
  async onSubmit(event, data) {
    try {
    console.log("LENG: extends -> onSubmit -> event", event,data)

      this.$InspectUser();
      await this.PageStore.onInstall({
        momentId: this.momentId,
        content: event.html,
        contentLength: event.length,
        userType: 1,
        toCommentId: lodash.get(data, "id", 0),
        toUserId: lodash.get(data, "userId", 0),
        toUserNickname: data?.userNickname,
      });
      event.onReset();
      this.onLoading(this.momentId);
    } catch (error) {
      console.log("LENG: PageView -> onSubmit -> error", error);
    }
  }
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" >
</style>
