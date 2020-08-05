/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:01:42
 * @modify date 2020-08-05 14:01:42
 * @desc 晒作业
 */
<template>
  <a-list class="xt-content" item-layout="horizontal" :data-source="data">
    <a-list-item slot="renderItem" slot-scope="item">
      <a-comment :author="item.author" :avatar="item.avatar">
        <template slot="actions">
          <span key="comment-basic-like">
            <a-tooltip title="Like">
              <a-icon
                type="like"
                :theme="action === 'liked' ? 'filled' : 'outlined'"
                @click="like"
              />
            </a-tooltip>
            <span style="padding-left: '8px';cursor: 'auto'">{{ likes }}</span>
          </span>
          <span key="comment-basic-dislike">
            <a-tooltip title="Dislike">
              <a-icon
                type="dislike"
                :theme="action === 'disliked' ? 'filled' : 'outlined'"
                @click="dislike"
              />
            </a-tooltip>
            <span style="padding-left: '8px';cursor: 'auto'">{{ dislikes }}</span>
          </span>
          <span key="comment-basic-reply-to">Reply to</span>
        </template>
        <p slot="content">{{ item.content }}</p>
        <a-tooltip slot="datetime" :title="item.datetime.format('YYYY-MM-DD HH:mm:ss')">
          <span>{{ item.datetime.fromNow() }}</span>
        </a-tooltip>
      </a-comment>
    </a-list-item>
  </a-list>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import { Modal } from "ant-design-vue";
import moment from "moment";

@Component({
  components: {},
})
export default class PageView extends Vue {
  data = [
    {
      actions: ["Reply to"],
      author: "Han Solo",
      avatar:
        "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      content:
        "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
      datetime: moment().subtract(1, "days"),
    },
    {
      actions: ["Reply to"],
      author: "Han Solo",
      avatar:
        "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      content:
        "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
      datetime: moment().subtract(2, "days"),
    },
    {
      actions: ["Reply to"],
      author: "Han Solo",
      avatar:
        "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      content:
        "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
      datetime: moment().subtract(3, "days"),
    },
  ];
  likes = 0;
  dislikes = 0;
  action = null;
  like() {
    this.likes = 1;
    this.dislikes = 0;
    this.action = "liked";
  }
  dislike() {
    this.likes = 0;
    this.dislikes = 1;
    this.action = "disliked";
  }
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style>
</style>
