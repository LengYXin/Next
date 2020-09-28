/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:17:47
 * @modify date 2020-08-05 14:17:47
 * @desc 作业
 */
<template>
  <div class="xt-content">
    <xt-refresh-list :Pagination="Pagination" :body="body">
      <template #renderItem="item">
        <xt-comment :comment="getComment(item)" :actions="actions">
          <template #title="comment">
            <span class="xt-comment-author" v-text="comment.author"></span>
            <time
              class="xt-comment-time"
              v-dateFormat="comment.time"
              format="MM-DD HH:mm"
            />
          </template>
          <template #time="comment">
            <span class="xt-text-grey">
              <span v-text="comment.viewCount"></span><span>位同学看过</span>
            </span>
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
                :to="{ name: 'homework-sundrying', query: { id: item.id } }"
              />
            </van-col>
            <van-col span="14">
              <van-cell
                class="xt-text-yellow xt-padding-tb-none"
                :icon="isLink(item)"
                :value="item.likeCount"
                @click.prevent.stop="onLikes(item)"
              />
            </van-col>
          </van-row>
        </xt-comment>
      </template>
    </xt-refresh-list>
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
import lodash from "lodash";
@Observer
@Component({
  components: {},
})
export default class PageView extends Vue {
  head() {
    return this.$AppCreateShareData({ title: "我的晒出的作业" });
  }
  get PageStore() {
    return this.$store.$my;
  }
  get Pagination() {
    return this.PageStore.MySunWork;
  }
  get body() {
    return {};
  }
  action = {};
  get actionShow() {
    return lodash.hasIn(this.action, "id");
  }
  get actions() {
    return [{ name: "删除", key: "delete" }];
  }
  getComment(item) {
    return {
      id: item.id,
      content: item.content,
      avatar: item.userHeader,
      author: item.userNickname,
      time: item.createTime,
      bishan: item.bishanNum,
      imgs: item.momentPicturelist || [],
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
      case "delete":
        this.onDelete(this.action);
        break;
    }
  }
  onAddbrowsenum(item) {
    // this.Pagination.onAddbrowsenum(item.id);
  }
  /**
   * 删除
   */
  async onDelete(item) {
    try {
      await this.Pagination.onDelWork(item.id);
      this.onAction({});
    } catch (error) {}
  }
  async onLikes(item) {
    try {
      await this.Pagination.onLikes(item);
    } catch (error) {
      this.$toast(this.$tc(error));
    }
  }
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" >
</style>
