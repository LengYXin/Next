/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:01:19
 * @modify date 2020-08-05 14:01:19
 * @desc 感想
 */
<template>
  <div v-if="UserStore.loggedIn" class="xt-content-small">
    <xt-editor @submit="onSubmit" buttonText="发感想"></xt-editor>
    <xt-comment v-for="item in Pagination.dataSource" :key="item.id" :comment="getComment(item)">
      <template slot="actions">
        <xt-action @click="onLikes(item)" :statistics="item.likeCount" :action="item.likeRecord" />
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
    <xt-infinite-loading :identifier="Pagination.onlyKey" @loading="onLoading" />
  </div>
  <a-empty v-else :image="$images.logo" description="报名后，可以浏览感想栏哦~~" />
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import { Modal } from "ant-design-vue";
import moment from "moment";
@Component({
  components: {},
})
export default class PageView extends Vue {
  get UserStore() {
    return this.$store.$storeUser;
  }
  get PageStore() {
    return this.$store.$storeCourse;
  }
  get Pagination() {
    return this.$store.$storeCourse.Pagination;
  }
  onLoading(event) {
    // this.Pagination.onLoading({}, {}, event);
  }
  getComment(item) {
    return {
      content: item.content,
      avatar: item.userHeader,
      author: item.userNickname,
      time: item.createTime,
    };
  }
  onSubmit(event) {
    console.log("LENG: PageView -> onSubmit -> event", event);
  }
  created() {
    try {
      this.$InspectUser();
    } catch (error) {}
  }
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style>
</style>
