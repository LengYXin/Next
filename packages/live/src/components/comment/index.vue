/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:16:32
 * @modify date 2020-08-05 14:16:32
 * @desc 评论
 */
<template>
  <div class="lyx-comment">
    <a-comment>
      <a-badge slot="avatar">
        <div v-if="comment.jushou" slot="count" class="lyx-comment-badge">
          <svg class="lyx-icon" aria-hidden="true">
            <use xlink:href="#video-jushou" />
          </svg>
        </div>
        <!-- 头像 -->
        <a-avatar :size="40" :src="comment.avatar" :alt="comment.author" />
      </a-badge>

      <!-- 作者 笔山 右侧菜单 -->
      <div class="lyx-comment-author" slot="author">
        <span v-text="comment.author"></span>

        <!-- <span v-show="comment.bishan">
          笔山
          <span v-text="comment.bishan"></span>
        </span>-->
        <div class="lyx-comment-dropdown" v-if="$slots.overlay">
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
        <span slot="title" v-dateFormat="datetime" format="YYYY-MM-DD HH:mm"></span>
        <span>
          <time v-dateFormat="datetime" format="YYYY-MM-DD HH:mm" fromNow />
        </span>
      </a-tooltip>
      <!-- 内容 -->
      <a-row type="flex" justify="space-between" align="bottom" slot="content">
        <a-col flex="320px" class="lyx-comment-content">
          <slot name="content">
            <!-- <div v-ellipsis v-html="formatFace(content)"></div> -->
            <div v-html="formatFace(content)"></div>
          </slot>
        </a-col>
        <a-col flex="80px" class="lyx-comment-guzhang">
          <svg class="lyx-icon" aria-hidden="true">
            <use xlink:href="#video-guzhang" />
          </svg>
          <span>66k</span>
        </a-col>
      </a-row>
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
  @Prop({ default: {} }) comment: {
    // 内容
    content: string;
    // 头像
    avatar: string;
    // 作者
    author: string;
    // 时间
    time: string;
    // 举手
    jushou: boolean;
    // // 回复
    // toUserName: string;
  };
  get datetime() {
    return this.comment.time;
  }
  get content() {
    let content = this.comment.content;
    // if (this.comment.toUserName) {
    //   // const toUserNickname =Vue.compile(`回复 <span class="lyx-text-yellow">${item.toUserNickname}</span> : `) ;
    //   const toUserName = `回复 <span class="lyx-text-yellow">${this.comment.toUserName}</span> : `;
    //   if (lodash.startsWith(content, "<p>")) {
    //     content = lodash.replace(content, "<p>", `<p>${toUserName}`);
    //   } else {
    //     content = toUserName + content;
    //   }
    // }
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
.lyx-comment {
  padding-left: 20px;
  // animation: antFadeIn 0.3s;
  &-content {
    overflow: hidden;
    text-overflow: ellipsis;
    position: relative;
    text-align: justify;
    word-break: break-all;
    line-height: 26px;
    background: #c4a57f4d;
    border-radius: 15px;
    padding: 12px;
    // margin-right: 12px;
  }
  &-author {
    position: relative;
  }
  &-badge {
    left: 0;
    right: initial;
    transform: translate(-50%, -50%) !important;
  }
  &-dropdown {
    position: absolute;
    top: 0;
    right: 0;
    text-align: right;
  }
}
.video-jushou {
  font-size: 22px;
}
</style>
<style lang="less" >
.lyx-comment {
  &-content {
    p {
      margin: auto;
      line-height: 26px;
      // max-height: 26px;
    }
  }
  &-guzhang {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    > span {
      font-size: 12px;
      font-weight: 400;
      color: #999999;
      // line-height: 20px;
    }
  }
  .ant-comment-content-author {
    // flex-direction: column;
  }
  .ant-comment-actions {
    text-align: right;
  }
  .ant-comment-content-author-name {
    padding-left: 12px;
    span {
      font-size: 18px;
      font-weight: 600;
      color: rgba(0, 0, 0, 0.85);
      line-height: 25px;
      text-align: justify;
    }
  }
  .ant-comment-content-author-time {
    position: relative;
    &::before {
      height: 100%;
      content: "·";
      font-size: 12px;
      font-weight: 500;
      color: #999999;
      line-height: 25px;
      padding-right: 10px;
    }
    time {
      font-size: 12px;
      font-weight: 500;
      color: #999999;
      line-height: 25px;
    }
  }
  .ant-comment-avatar img {
    height: 100%;
    width: 100%;
  }
}

.lyx-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
  text-align: justify;
  word-break: break-all;
  display: block;
}

.lyx-ellipsis .lyx-ellipsis-btn {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  background: #fff;
  cursor: pointer;
}
</style>
