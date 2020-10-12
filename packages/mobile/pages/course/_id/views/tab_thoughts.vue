/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:01:19
 * @modify date 2020-08-05 14:01:19
 * @desc 感想
 */
<template>
  <xt-inspect>
    <div class="xt-content xt-course-thoughts">
      <template v-if="Pagination.userIsComment"> </template>
      <template v-else> </template>
      <xt-refresh-list :Pagination="Pagination" :body="body">
        <template #renderItem="item">
          <xt-comment :comment="getComment(item)"> </xt-comment>
        </template>
      </xt-refresh-list>
    </div>
    <!-- 没有登录显示内容 -->
    <van-empty
      slot="not"
      :image="$images.logo"
      description="报名后，可以浏览感想栏哦~~"
    />
  </xt-inspect>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import { Observer } from "mobx-vue";
import { Modal } from "ant-design-vue";
import moment from "moment";
@Observer
@Component({
  components: {},
})
export default class PageView extends Vue {
  get Pagination() {
    return this.$store.$storeCourse.Details.Thoughts;
  }
  get id() {
    return this.$route.params.id;
  }
  get body() {
    return {
      courseId: this.id,
      courseType: 1,
    };
  }
  getComment(item) {
    return {
      content: item.content,
      avatar: item.userHeadUri,
      author: item.userNickName,
      time: item.createTime,
    };
  }
  async onSubmit(event) {
    try {
      await this.Pagination.onInstall({
        courseId: this.id,
        comment: event.html,
        commentNum: event.length,
        courseType: 1,
        scoreLevel: 1,
      });
      event.onReset();
      this.Pagination.onReset();
    } catch (error) {
      console.log("LENG: PageView -> onSubmit -> error", error);
      // this.$message.error(error);
    }
  }
  created() {
    this.Pagination.onReset();
  }
  mounted() {}
  updated() {}
  destroyed() {
    this.Pagination.onReset();
  }
}
</script>
<style lang="less" >
.xt-course-thoughts {
  .xt-ellipsis .xt-ellipsis-btn {
    background: #f8f3ee !important;
  }
}
</style>
