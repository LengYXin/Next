/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:01:42
 * @modify date 2020-08-05 14:01:42
 * @desc 晒作业
 */
<template>
  <xt-inspect>
    <div class="xt-content">
      <xt-refresh-list :Pagination="Pagination" :body="body">
        <template #renderItem="item">
          <xt-comment :comment="getComment(item)">
            <van-row class="xt-videoid-comment-btn" type="flex">
              <van-col span="10">
                <van-cell icon="chat-o" @click.prevent.stop="onReply(item)" />
              </van-col>
              <van-col span="14">
                <van-cell
                  :icon="isLink(item)"
                  :value="item.likeCount"
                  @click.prevent.stop="onLikes(item)"
                />
              </van-col>
            </van-row>
          </xt-comment>
        </template>
      </xt-refresh-list>
    </div>
    <!-- 没有登录显示内容 -->
    <van-empty
      slot="not"
      :image="$images.logo"
      description="报名后，可以浏览晒作业栏哦~~"
    />
  </xt-inspect>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import { Observer } from "mobx-vue";
@Observer
@Component({
  components: {},
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
  get body() {
    return { singleCourseId: this.id };
  }
  isLink(item) {
    return item.likeRecord ? "like" : "like-o";
  }
  /**
   * 回复
   */
  onReply(data) {
    if (data) {
      try {
        this.$InspectUser();
        this.onAddbrowsenum(data);
      } catch (error) {}
    } else {
    }
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
      this.$toast(this.$tc(error));
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
