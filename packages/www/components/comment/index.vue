/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:16:32
 * @modify date 2020-08-05 14:16:32
 * @desc 评论
 */
<template>
  <div class="xt-comment">
    <a-comment>
      <!-- 头像 -->
      <a-avatar slot="avatar" :src="comment.avatar" :alt="comment.author" />
      <!-- 作者 笔山 右侧菜单 -->
      <div class="xt-comment-author" slot="author">
        <span v-text="comment.author"></span>
        <span v-show="comment.bishan">
          笔山
          <span v-text="comment.bishan"></span>
        </span>
        <div class="xt-comment-dropdown" v-if="$slots.overlay">
          <a-dropdown>
            <a-icon type="ellipsis" />
            <template slot="overlay">
              <slot name="overlay"></slot>
            </template>
          </a-dropdown>
        </div>
      </div>
      <!-- 时间 -->
      <a-tooltip slot="datetime">
        <span
          slot="title"
          v-dateFormat="datetime"
          format="YYYY-MM-DD HH:mm"
        ></span>
        <span>
          发布于
          <time v-dateFormat="datetime" format="YYYY-MM-DD HH:mm" fromNow />
        </span>
      </a-tooltip>
      <!-- 内容 -->
      <div class="xt-comment-content" slot="content">
        <slot name="content">
          <div v-ellipsis v-html="formatFace(content)"></div>
          <xt-nine
            :size="imgSize"
            :dataSource="comment.imgs"
            thumb="waterThumbUrl"
            original="waterUrl"
          />
        </slot>
      </div>
      <!-- 操作按钮 -->
      <template slot="actions">
        <slot name="actions"></slot>
      </template>
      <!-- 默认插槽 -->
      <slot />
    </a-comment>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import lodash from "lodash";
@Component({
  components: {},
})
export default class extends Vue {
  @Prop({ default: 120 }) imgSize; // 图片大小
  @Prop({ default: {} }) comment: {
    // 内容
    content: string;
    // 头像
    avatar: string;
    // 作者
    author: string;
    // 时间
    time: string;
    // 笔山
    bishan: number;
    // 回复
    toUserName: string;
    // 图片
    imgs: any[];
  };
  get datetime() {
    return this.comment.time;
  }
  get content() {
    let content = this.comment.content;
    if (this.comment.toUserName) {
      // const toUserNickname =Vue.compile(`回复 <span class="xt-text-yellow">${item.toUserNickname}</span> : `) ;
      const toUserName = `回复 <span class="xt-text-yellow">${this.comment.toUserName}</span> : `;
      if (lodash.startsWith(content, "<p>")) {
        content = lodash.replace(content, "<p>", `<p>${toUserName}`);
      } else {
        content = toUserName + content;
      }
    }
    return content;
  }
  mounted() {
    // console.log(this);
  }
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scoped>
.xt-comment {
  &-content {
    overflow: hidden;
    text-overflow: ellipsis;
    position: relative;
    text-align: justify;
    word-break: break-all;
    line-height: 26px;
  }
  &-author {
    position: relative;
  }
  &-dropdown {
    position: absolute;
    top: 0;
    right: 0;
    text-align: right;
  }
}
</style>
<style lang="less" >
.xt-comment {
  &-content {
    p {
      margin: auto;
      line-height: 26px;
      // max-height: 26px;
    }
  }
  .ant-comment-content-author {
    flex-direction: column;
  }
  .ant-comment-actions {
    text-align: right;
  }
}

.xt-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
  text-align: justify;
  word-break: break-all;
  display: block;
  transition: all 0.5s;
}

.xt-ellipsis .xt-ellipsis-btn {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  background: @layout-body-background;
  cursor: pointer;
  color: @xt-green-6;
}
</style>
