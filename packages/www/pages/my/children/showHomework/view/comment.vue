<!--
 * @Author: Erlin
 * @CreateTime: 2020-09-08 15:29:51
 * @LastEditors: Erlin
 * @LastEditTime: 2020-09-08 15:50:29
 * @Description: 
-->
<template>
  <div class="xt-show-homework-comment">
    <xt-action
      icon="message"
      title="评论"
      @click="onVisible(true)"
      :statistics="dataSource.commentCount"
    />
    <a-modal
      v-model="visible"
      title="查看评论"
      :centered="true"
      :width="730"
      class="xt-show-homework--modal"
    >
      <a-spin :spinning="PageStore.loading">
        <xt-comment :comment="getComment(PageStore.dataSource)">
          <template slot="actions">
            <div class="xt-font-size-base xt-font-family-FZLTHJW">
              <a-row type="flex" justify="space-between" algin="middle">
                <a-col>1位同学看过</a-col>
                <a-space size="middle">
                  <xt-action
                    icon="message"
                    title="评论"
                    :statistics="PageStore.dataSource.commentCount"
                  />
                  <xt-action
                    icon="heart"
                    title="喜欢"
                    @click="onLikes(PageStore.dataSource)"
                    :statistics="PageStore.dataSource.likeCount"
                    :action="PageStore.dataSource.likeRecord"
                  />
                </a-space>
              </a-row>
              <a-row>
                <xt-editor
                  @submit="onSubmit"
                  class="xt-editor-single"
                  buttonText="回复"
                />
              </a-row>
            </div>
          </template>
          <template slot="overlay">
            <a-menu>
              <a-menu-item>
                <a-popconfirm
                  title="确定删除作业?"
                  ok-text="确定"
                  cancel-text="取消"
                  @confirm="onConfirm(PageStore.dataSource)"
                >
                  <a href="javascript:;">删除</a>
                </a-popconfirm>
              </a-menu-item>
            </a-menu>
          </template>
        </xt-comment>
      </a-spin>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Ref } from "vue-property-decorator";
import { Context } from "@nuxt/types";
import { Observer } from "mobx-vue";
import lodash from "lodash";

@Observer
@Component({
  components: {},
})
export default class PageView extends Vue {
  @Prop({ default: {} }) dataSource;
  get MyWork() {
    return this.$store.$my.MySunWork;
  }
  get PageStore() {
    return this.MyWork.Details;
  }
  visible = false;
  formInline: any = {};
  onVisible(visible) {
    this.visible = visible;
    this.onReset();
    if (visible) {
      this.onLoading();
    }
  }
  onReset() {
    this.PageStore.onReset();
  }
  getComment(item) {
    return {
      content: item.content,
      avatar: item.userHeader,
      author: item.userNickname,
      time: item.createTime,
      bishan: item.bishanNum,
      imgs: item.momentPictures || [],
    };
  }

  onLoading() {
    this.PageStore.onLoading({ momentId: this.dataSource.id });
  }
  onLikes() {}
  onConfirm() {}
  onSubmit() {}

  mounted() {}
}
</script>
<style lang="less" scoped>
.xt-show-homework-comment {
}
</style>