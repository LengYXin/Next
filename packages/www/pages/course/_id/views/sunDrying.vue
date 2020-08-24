/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:01:42
 * @modify date 2020-08-05 14:01:42
 * @desc 晒作业
 */
<template>
  <div class="xt-content-small">
    <xt-editor @submit="onSubmit" :rules="{required:true,max:2000}" buttonText="晒作业"></xt-editor>
    <xt-comment v-for="item in Pagination.dataSource" :key="item.id" :comment="getComment(item)">
      <template slot="actions">
        <xt-action @click="onLikes(item)" :statistics="item.likeCount" :action="item.likeRecord" />
        <xt-action :statistics="item.commentCount" title="回复" />
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
      <!-- <xt-editor /> -->
    </xt-comment>
    <xt-infinite-loading :key="Pagination.onlyKey" @loading="onLoading" />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import { Modal } from "ant-design-vue";
import moment from "moment";
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
    };
  }
  async onSubmit(event) {
    try {
      await this.Pagination.onInstall({
        singleCourseId: this.id,
        content: event.text,
        contentLength: event.length,
        userType: 1,
      });
      event.onReset();
      this.Pagination.onReset();
    } catch (error) {
      console.log("LENG: PageView -> onSubmit -> error", error);
      // this.$message.error(error);
    }
  }
  onConfirm(item) {}
  async onLikes(item) {
    try {
      await this.Pagination.onLikes(item);
    } catch (error) {
      this.$message.warning({ content: error, key: "likes" });
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
<style>
</style>
