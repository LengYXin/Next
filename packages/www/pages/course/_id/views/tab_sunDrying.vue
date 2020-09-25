/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:01:42
 * @modify date 2020-08-05 14:01:42
 * @desc 晒作业
 */
<template>
  <xt-inspect inspect>
    <div class="xt-content-small xt-course-sunDrying">
      <xt-editor
        @submit="onSubmit"
        :rules="{ required: true, max: 2000 }"
        buttonText="晒作业"
      ></xt-editor>
      <xt-comment
        v-for="item in Pagination.dataSource"
        :key="item.id"
        :comment="getComment(item)"
        @viewerShow="onAddbrowsenum(item)"
      >
        <div class="xt-font-size-base xt-font-family-FZLTHJW">
          <a-row type="flex" justify="space-between" algin="middle">
            <a-col class="xt-text-grey">
              <div v-show="item.viewCount">
                <span v-text="item.viewCount"></span> 位同学看过
              </div>
            </a-col>
            <a-space size="middle">
              <xt-action
                icon="message"
                title="评论"
                :statistics="item.commentCount"
                @click="onReply(item)"
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

        <!-- <template slot="actions">
          <xt-action @click="onLikes(item)" :statistics="item.likeCount" :action="item.likeRecord" />
          <xt-action :statistics="item.commentCount" title="回复" @click="onReply(item)" />
        </template>-->
        <template slot="overlay">
          <a-menu>
            <a-menu-item v-if="$eqUser(item.userId)">
              <a-popconfirm
                title="确定删除作业?"
                ok-text="确定"
                cancel-text="取消"
                @confirm="onDelete(item)"
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
        <!-- <xt-editor /> -->
      </xt-comment>
      <xt-infinite-loading
        :identifier="Pagination.onlyKey"
        @loading="onLoading"
      />
      <!-- 晒作业详情 -->
      <HomeworkShow
        :momentId="reply.id"
        @cancel="onReply()"
        @like="onLikes(reply)"
        @delete="onDelete(reply)"
      />
    </div>
    <!-- 没有登录显示内容 -->
    <a-empty
      slot="not"
      :image="$images.logo"
      description="报名后，可以浏览晒作业栏哦~~"
    />
  </xt-inspect>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import { Modal } from "ant-design-vue";
import moment from "moment";
import { Observer } from "mobx-vue";
import HomeworkShow from "~/components/business/homework/show.vue";
@Observer
@Component({
  components: { HomeworkShow },
})
export default class PageView extends Vue {
  get PageStore() {
    return this.$store.$storeHomework;
  }
  get Pagination() {
    return this.PageStore.SunDrying;
  }
  get id() {
    return this.$route.params.id;
  }
  // 回复
  reply = {};
  /**
   * 回复
   */
  onReply(data) {
    if (data) {
      try {
        this.$InspectUser();
        this.onAddbrowsenum(data);
        this.reply = data;
      } catch (error) {}
    } else {
      this.reply = {};
    }
  }
  onLoading(event?) {
    this.Pagination.onLoading({ singleCourseId: this.id }, {}, event);
  }
  getComment(item) {
    return {
      content: item.content,
      avatar: item.userHeader,
      author: item.userNickname,
      time: item.createTime,
      bishan: item.bishanNum,
      imgs: item.momentPicturelist,
    };
  }
  async onSubmit(event) {
    try {
      await this.Pagination.onInstall({
        singleCourseId: this.id,
        content: event.html,
        contentLength: event.length,
        picturesUrlList: event.fileResult,
        userType: 1,
      });
      event.onReset();
      this.Pagination.onReset();
      this.$message.success(this.$tc(this.$EnumMessage.sundrying_success));
    } catch (error) {
      console.log("LENG: PageView -> onSubmit -> error", error);
      // this.$message.error(error);
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
      await this.Pagination.onDeleteMoment(item.id);
      this.onReply({});
    } catch (error) {}
  }
  async onLikes(item) {
    try {
      await this.Pagination.onLikes(item);
    } catch (error) {
      this.$message.warning({ content: this.$tc(error), key: "likes" });
    }
  }
  created() {
    this.Pagination.onReset();
  }
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" >
.xt-course-sunDrying {
  .xt-ellipsis .xt-ellipsis-btn {
    background: #f8f3ee !important;
  }
}
</style>
