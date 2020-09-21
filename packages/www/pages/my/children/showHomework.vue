<!--
 * @Author: Erlin
 * @CreateTime: 2020-08-06 20:52:17
 * @LastEditors: Erlin
 * @LastEditTime: 2020-09-10 18:38:06
 * @Description: 我晒出的作业
-->

<template>
  <div class="xt-content">
    <xt-comment v-for="item in Pagination.dataSource" :key="item.id" :comment="getComment(item)">
      <div class="xt-font-size-base xt-font-family-FZLTHJW">
        <a-row type="flex" justify="space-between" algin="middle">
          <a-col class="xt-text-yellow">
            来自《
            <span v-text="item.courseName"></span>》
          </a-col>
          <a-space size="middle">
            <xt-action
              icon="message"
              title="评论"
              @click="onReply(item)"
              :statistics="item.commentCount"
            />
            <xt-action
              icon="heart"
              title="喜欢"
              @click="onLikes(item)"
              :statistics="item.likeCount"
              :action="item.likeRecord"
            />
          </a-space>
        </a-row>
      </div>
      <a-divider />
      <template slot="overlay">
        <a-menu>
          <a-menu-item>
            <a-popconfirm title="确定删除作业?" ok-text="确定" cancel-text="取消" @confirm="onDelete(item)">
              <a href="javascript:;">删除</a>
            </a-popconfirm>
          </a-menu-item>
        </a-menu>
      </template>
    </xt-comment>
    <xt-infinite-loading :identifier="Pagination.onlyKey" @loading="onLoading" />
    <!-- 作业详情 -->
    <HomeworkShow
      :momentId="reply.id"
      @cancel="onReply()"
      @like="onLikes(reply)"
      @delete="onDelete(reply)"
    />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import { Modal } from "ant-design-vue";
import { Observer } from "mobx-vue";
import lodash from "lodash";
import { Context } from "@nuxt/types";
import HomeworkShow from "~/components/business/homework/show.vue";

@Observer
@Component({
  // async fetch(ctx: Context) {
  //   await ctx.store.$my.MySunWork.onLoading();
  // },
  scrollToTop: true,
  components: { HomeworkShow },
})
export default class PageView extends Vue {
  // 回复
  reply = {};

  get PageStore() {
    return this.$store.$my;
  }
  get Pagination() {
    return this.PageStore.MySunWork;
  }
  getComment(item) {
    return {
      content: item.content,
      avatar: item.userHeader,
      author: item.userNickname,
      time: item.createTime,
      bishan: item.bishanNum,
      imgs: item.momentPicturelist || [],
    };
  }

  /**
   * 回复
   */
  onReply(data) {
    if (data) {
      try {
        this.$InspectUser();
        this.reply = data;
      } catch (error) {}
    } else {
      this.reply = {};
    }
  }
  onLoading(event?) {
    this.Pagination.onLoading({}, {}, event);
  }
  /**
   * 作业点赞
   */

  async onLikes(item) {
    try {
      await this.Pagination.onLikes(item);
    } catch (error) {
      this.$message.warning({ content: error, key: "likes" });
    }
  }

  /**
   * 删除晒出的作业
   */
  async onDelete(item) {
    try {
      await this.Pagination.onDelWork(item.id);
      this.onReply({});
      this.$message.success({ content: "删除成功", key: "onDelete" });
    } catch (error) {}
  }

  mounted() {}
  updated() {}
  destroyed() {
    this.Pagination.onReset();
  }
}
</script>
<style>
</style>
