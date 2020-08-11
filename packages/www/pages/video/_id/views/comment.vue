<template>
  <div>
    <xt-comment v-for="item in Pagination.dataSource" :key="item.id" :comment="getComment(item)">
      <template slot="actions">
        <xt-action />
        <xt-action title="回复" />
      </template>
      <template slot="overlay">
        <a-menu>
          <a-menu-item>
            <a href="javascript:;">1st menu item</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;">2nd menu item</a>
          </a-menu-item>
          <a-menu-item>
            <a href="javascript:;">3rd menu item</a>
          </a-menu-item>
        </a-menu>
      </template>
      <!-- <xt-editor /> -->
    </xt-comment>
    <xt-pagination :Pagination="Pagination" @change="onCurrentChange" />
  </div>
</template>
<script lang="ts">
import { ControllerVideo } from "@xt/client/entities";
import { Component, Inject, Vue, Watch, Provide } from "vue-property-decorator";
import { Context } from "@nuxt/types";
import { Observer } from "mobx-vue";
import lodash from "lodash";
@Observer
@Component({
  components: {},
})
export default class PageView extends Vue {
  @Inject("VideoStore")
  PageStore: ControllerVideo;
  get Pagination() {
    return this.PageStore.PaginationComment;
  }
  getComment(item) {
    return {
      content: item.content,
      avatar: item.userHeader,
      author: item.userNickname,
      time: item.createTime,
    };
  }
  /**
   *  初始化 和 页码 更改调用
   */
  onCurrentChange(current, options) {
    this.Pagination.onCurrentChange(current, {
      videoShareId: this.$route.params.id,
    });
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
</style>
