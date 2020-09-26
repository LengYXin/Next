/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:16:32
 * @modify date 2020-08-05 14:16:32
 * @desc 评论
 */
<template>
  <van-card class="xt-comment">
    <template #thumb>
      <van-image round :src="comment.avatar" />
    </template>
    <template #title>
      <slot name="title" v-bind="comment">
        <span class="xt-comment-author" v-text="comment.author"></span>
      </slot>
      <!-- 右上角 按钮 -->
      <div class="xt-comment-actions">
        <slot name="actions" v-bind="comment"> </slot>
        <!-- <div @click="onActionShow(true)">
          <van-icon name="ellipsis" />
        </div> -->
        <!-- <van-action-sheet
          v-model="actionShow"
          :actions="actions"
          @select="onSelect"
          cancel-text="取消"
          close-on-click-action
          @cancel="onActionShow(false)"
        /> -->
      </div>
    </template>
    <template #desc>
      <div
        class="xt-comment-content"
        v-ellipsis
        v-html="formatFace(content)"
      ></div>
      <xt-nine
        :size="imgSize"
        :dataSource="comment.imgs"
        :viewerOptions="viewerOptions"
        thumb="waterThumbUrl"
        original="waterUrl"
      />
    </template>
    <template #price>
      <slot name="time" v-bind="comment">
        <time
          class="xt-comment-time"
          v-dateFormat="comment.time"
          format="MM-DD HH:mm"
        />
      </slot>
    </template>
    <template #num>
      <slot />
    </template>
    <template #footer>
      <slot name="footer" v-bind="comment">
        <van-divider />
      </slot>
    </template>
  </van-card>
</template>
<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import lodash from "lodash";
@Component({
  components: {},
})
export default class extends Vue {
  @Prop({ default: 80 }) imgSize; // 图片大小
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
  viewerOptions = {
    show: () => {
      this.$emit("viewerShow", this.comment);
    },
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
<style lang="less" >
.xt-comment {
  background: transparent;
  padding: 0;
  &-actions {
    position: absolute;
    top: 0;
    right: 0;
  }
  &-author {
    font-size: 16px;
    color: @xt-grey-6;
  }
  &-content {
    margin: 5px 0;
    text-align: justify;
    word-break: break-all;
    font-size: 16px;
    line-height: 20px;
    color: #555;
  }
  &-time {
    font-size: 12px;
    color: @xt-grey-6;
  }
  .van-card__thumb {
    width: 45px;
    height: 45px;
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
  line-height: 20px;
  p {
    margin: auto;
    line-height: 20px;
    // max-height: 26px;
  }
}

.xt-ellipsis .xt-ellipsis-btn {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  background: white;
  cursor: pointer;
  color: @xt-green-6;
}
</style>
