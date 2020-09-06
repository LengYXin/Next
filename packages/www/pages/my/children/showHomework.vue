<!--
 * @Author: Erlin
 * @CreateTime: 2020-08-06 20:52:17
 * @LastEditors: Erlin
 * @LastEditTime: 2020-09-06 18:51:54
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
        <xt-action
          @click="onLikes(item)"
          :statistics="item.likeCount"
          :action="item.likeRecord"
        />
        <xt-action :statistics="item.commentCount" title="回复" />
      </template>
      <template slot="overlay">
        <a-menu>
          <a-menu-item v-if="$eqUser(item.userId)">
            <a-popconfirm
              title="确定删除作业?"
              ok-text="确定"
              cancel-text="取消"
              @confirm="onConfirm(item)"
            >
              <a href="javascript:;">删除</a>
            </a-popconfirm>
          </a-menu-item>
          <a-menu-item v-else>
            <nuxt-link to="/my/letter">
              <span>私信</span>
            </nuxt-link>
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
    };
  }
  onLoading(event?) {
    this.Pagination.onLoading({}, {}, event);
  }

  onLikes() {}
  onConfirm() {}
  mounted() {
    console.log(
      "PageView -> mounted -> this.Pagination.dataSource",
      this.Pagination.dataSource
    );
  }
  updated() {}
  destroyed() {}
}
</script>
<style>
</style>
