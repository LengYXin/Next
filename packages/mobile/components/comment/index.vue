/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:16:32
 * @modify date 2020-08-05 14:16:32
 * @desc 评论
 */
<template>
  <div class="xt-comment">
    <van-card>
      <template #thumb>
        <van-image round :src="comment.avatar" />
      </template>
      <template #title>
        <span v-text="comment.author"></span>
      </template>
      <template #desc>
        <div v-ellipsis v-html="formatFace(content)"></div>
      </template>
      <template #footer>
        <van-button size="mini">按钮</van-button>
        <van-button size="mini">按钮</van-button>
      </template>
    </van-card>
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
  
}
.xt-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
  text-align: justify;
  word-break: break-all;
  display: block;
  transition: all 0.5s;
  p {
    margin: auto;
    line-height: 26px;
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
