/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:02:27
 * @modify date 2020-08-05 14:02:27
 * @desc 去上课
 */
<template>
  <div>
    <a-divider class="xt-text-yellow">最新回复</a-divider>
    <!-- 评论列表 -->
    <xt-comment v-for="item in dataSource" :key="item.id" :comment="getComment(item)">
      <template slot="actions">
        <xt-action
          @click="onReply(item)"
          :statistics="item.commentCount"
          icon="message"
          title="回复"
        />
        <xt-action
          @click="onLikes(item)"
          :statistics="item.likeCount"
          icon="heart"
          title="喜欢"
          :action="item.likeRecord"
        />
      </template>
      <template slot="overlay">
        <a-menu>
          <a-menu-item v-if="$eqUser(item.userId)">
            <a-popconfirm title="确定删除作业?" ok-text="确定" cancel-text="取消" @confirm="onConfirm(item)">
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
        :placeholder="`回复 ${item.userNickname}`"
        buttonText="评论"
      />
    </xt-comment>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import { Modal } from "ant-design-vue";
import { Observer } from "mobx-vue";
import lodash from "lodash";
@Component({
  components: {},
})
export default class extends Vue {
  @Prop({}) momentId;
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
      this.$emit("submit", event, data);
      event.onReset();
      this.onReply({});
    } catch (error) {
      console.log("LENG: PageView -> onSubmit -> error", error);
    }
  }
  async onLikes(item) {
    try {
      await this.PageStore.onLikesComment(item);
    } catch (error) {
      this.$message.warning({ content: error, key: "likes" });
    }
  }
  onConfirm(item) {
    try {
      this.PageStore.onDeleteComment({
        momentCommentId: item.id,
        momentId: this.momentId,
      });
    } catch (error) {}
  }
  created() {}
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
