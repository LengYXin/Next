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
    <div v-if="Details.dataSource.id">
      <xt-comment :comment="getComment(Details.dataSource, true)">
        <div class="xt-font-size-base xt-font-family-FZLTHJW">
          <a-row type="flex" justify="space-between" algin="middle">
            <a-col
              class="xt-text-grey"
              v-text="Details.dataSource.viewCount + '位同学看过'"
            ></a-col>
            <a-space size="middle">
              <xt-action
                icon="message"
                title="评论"
                :statistics="Details.dataSource.commentCount"
                @click="onReply({})"
              />
              <xt-action
                icon="heart"
                title="喜欢"
                @click="onLikes(Details.dataSource)"
                :statistics="Details.dataSource.likeCount"
                :action="Details.dataSource.likeRecord"
              />
            </a-space>
          </a-row>
        </div>
        <template slot="overlay">
          <a-menu>
            <a-menu-item v-if="$eqUser(Details.dataSource.userId)">
              <a-popconfirm
                title="确定删除作业?"
                ok-text="确定"
                cancel-text="取消"
                @confirm="onConfirm(Details.dataSource)"
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
        v-show="!reply.id"
        @submit="onSubmit"
        class="xt-editor-single"
        :rules="{ required: true, max: 2000 }"
        buttonText="回复"
      ></xt-editor>
      <!-- 评论列表 -->
      <xt-comment
        v-for="item in Details.dataSource.momentComments"
        :key="item.id"
        :comment="getComment(item)"
      >
        <template slot="actions">
          <xt-action
            @click="onLikes(item)"
            :statistics="item.likeCount"
            :action="item.likeRecord"
          />
          <xt-action
            :statistics="item.commentCount"
            title="回复"
            @click="onReply(item)"
          />
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
        <xt-editor
          @submit="onSubmit($event, item)"
          v-if="eqReply(item)"
          class="xt-editor-single"
          placeholder="回复xxx"
          buttonText="评论"
        />
      </xt-comment>
    </div>
  </a-modal>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import { Modal } from "ant-design-vue";
import { Observer } from "mobx-vue";
import lodash from "lodash";
@Observer
@Component({
  components: {},
})
export default class extends Vue {
  @Prop({}) momentId;
  @Prop({ default: "查看评论" }) title;
  // 显示
  get visible() {
    return !!this.momentId;
  }
  // 详情
  get Details() {
    return this.PageStore.Details;
  }
  get PageStore() {
    return this.$store.$storeHomework;
  }
  // 加载数据
  async onLoading(momentId) {
    if (momentId) {
      await this.Details.onLoading({ momentId });
    }
  }
  //   关闭
  @Emit("cancel")
  onCancel() {
    this.Details.onReset();
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
      bishan: work ? "" : item.bishanNum,
      imgs: item.momentPictures,
    };
  }
  /**
   * 回复
   */
  reply: any = {};
  /**
   * 回复 当前状态
   */
  eqReply(data) {
    return lodash.eq(this.reply.id, data.id);
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
      //   await this.Pagination.onInstall({
      //     videoShareId: this.id,
      //     content: event.html,
      //     contentLength: event.length,
      //     userType: 1,
      //     toCommentId: data?.id || 0,
      //     toUserId: data?.userId,
      //     toUserNickname: data?.userNickname,
      //   });
      event.onReset();
      this.reply = null;
    } catch (error) {
      console.log("LENG: PageView -> onSubmit -> error", error);
    }
  }

  // onLikes(item) {
  //   this.$emit("like", item, false);
  // }

  async onLikes(item) {
    try {
      await this.Details.onLikes(item);
      await this.$emit("like", item);
    } catch (error) {
      this.$message.warning({ content: error, key: "likes" });
    }
  }
  created() {}
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" >
.xt-homework-show {
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
}
</style>
