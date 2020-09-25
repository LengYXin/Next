/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:02:27
 * @modify date 2020-08-05 14:02:27
 * @desc 去上课
 */
<template>
  <a-modal
    :title="title"
    wrapClassName="xt-homework-show"
    :visible="visible"
    destroyOnClose
    @cancel="onCancel"
    :footer="null"
    width="700px"
  >
    <!-- 主题 -->
    <div v-if="PageStore.dataSource.id">
      <xt-comment :comment="getComment(PageStore.dataSource)">
        <div class="xt-font-size-base xt-font-family-FZLTHJW">
          <a-row type="flex" justify="space-between" algin="middle">
            <a-col class="xt-text-grey">
              <span v-text="PageStore.dataSource.viewCount"></span> 位同学看过
            </a-col>
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
        </div>
        <template slot="overlay">
          <a-menu>
            <a-menu-item v-if="$eqUser(PageStore.dataSource.userId)">
              <a-popconfirm
                title="确定删除作业?"
                ok-text="确定"
                cancel-text="取消"
                @confirm="onConfirm"
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
      <!-- 回复主题 -->
      <xt-editor
        @submit="onSubmit"
        class="xt-editor-single xt-editor-homework"
        :rules="{ required: true, max: 2000 }"
        buttonText="回复"
      ></xt-editor>
      <!-- 评论列表 -->
      <comment
        :dataSource="PageStore.dataSource.momentComments"
        :momentId="momentId"
        @submit="onSubmit"
      />
    </div>
  </a-modal>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import { Modal } from "ant-design-vue";
import { Observer } from "mobx-vue";
import lodash from "lodash";
import comment from "./comment.vue";
@Observer
@Component({
  components: { comment },
})
export default class extends Vue {
  @Prop({}) momentId;
  @Prop({ default: "查看评论" }) title;
  // 显示
  get visible() {
    return !!this.momentId;
  }
  get PageStore() {
    return this.$store.$storeHomework.Details;
  }
  // 加载数据
  async onLoading(momentId) {
    if (momentId) {
      await this.PageStore.onLoading({ momentId });
    }
  }
  //   关闭
  @Emit("cancel")
  onCancel() {
    this.PageStore.onReset();
  }
  //   id 变化
  @Watch("momentId")
  updateClasshour(newVal, oldVal) {
    this.onLoading(newVal);
  }
  getComment(item, work = false) {
    return {
      content: item.content,
      avatar: item.userHeader,
      author: item.userNickname,
      time: item.createTime,
      // bishan: work ? "" : item.bishanNum,
      imgs: item.momentPictures,
    };
  }
  async onSubmit(event, data) {
    try {
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

  // onLikes(item) {
  //   this.$emit("like", item, false);
  // }

  async onLikes(item) {
    try {
      await this.PageStore.onLikes(item);
      await this.$emit("like", item);
    } catch (error) {
      this.$message.warning({ content: this.$tc(error), key: "likes" });
    }
  }
  /**
   * 确认删除
   */
  @Emit("delete")
  onConfirm() {
    return this.momentId;
  }
  created() {}
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" >
.xt-homework-show {
  .ant-modal-header {
    border: none;
  }
  .ant-modal-body {
    max-height: 85vh;
    min-height: 300px;
    overflow: auto;
    animation: antFadeIn 0.4s;
    > div {
      animation: antFadeIn 0.6s;
      transition: all 0.5s;
    }
  }
  .xt-editor-homework {
    padding-left: 44px;
    margin-top: 5px;
  }
}
</style>
