<!--
 * @Author: Erlin
 * @CreateTime: 2020-08-06 20:52:17
 * @LastEditors: Erlin
 * @LastEditTime: 2020-09-07 19:44:02
 * @Description: 我晒出的作业
-->

<template>
  <div class="xt-content">
    <xt-comment
      v-for="item in Pagination.dataSource"
      :key="item.id"
      :comment="getComment(item)"
    >
      <template slot="actions">
        <div class="xt-font-size-base xt-font-family-FZLTHJW">
          <xt-action
            icon="message"
            title="评论"
            @click="onOpenComment(item)"
            :statistics="item.commentCount"
          />
          <xt-action
            icon="heart"
            title="喜欢"
            @click="onLikes(item)"
            :statistics="item.likeCount"
            :action="item.likeRecord"
          />
        </div>
      </template>
      <template slot="overlay">
        <a-menu>
          <a-menu-item>
            <a-popconfirm
              title="确定删除作业?"
              ok-text="确定"
              cancel-text="取消"
              @confirm="onConfirm(item)"
            >
              <a href="javascript:;">删除</a>
            </a-popconfirm>
          </a-menu-item>
        </a-menu>
      </template>
    </xt-comment>
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

@Observer
@Component({
  async fetch(ctx: Context) {
    await ctx.store.$my.MySunWork.onLoading();
  },
  scrollToTop: true,
  components: {},
})
export default class PageView extends Vue {
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
  onLoading(event?) {
    this.Pagination.onLoading({}, {}, event);
  }

  onLikes() {}
  onOpenComment() {}
  onConfirm() {}
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style>
</style>
