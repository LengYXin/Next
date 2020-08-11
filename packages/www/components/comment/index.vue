/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:16:32
 * @modify date 2020-08-05 14:16:32
 * @desc [description]
 */
<template>
  <div class="xt-comment">
    <a-comment>
      <!-- 头像 -->
      <a-avatar
        slot="avatar"
        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        alt="Han Solo"
      />
      <!-- 作者 笔山 右侧菜单 -->
      <div class="xt-comment-author" slot="author">
        <a>Han Solo</a>
        <span>笔山</span>
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
      <a-tooltip slot="datetime" :title="'aaaaaaa'">
        <span>bbbbbb</span>
      </a-tooltip>
      <!-- 内容 -->
      <div class="xt-comment-content" slot="content">
        <slot name="content">
          <div v-html="formatFace(content)"></div>
        </slot>
      </div>
      <!-- 操作按钮 -->
      <template slot="actions">
        <slot name="actions"></slot>
      </template>
    </a-comment>
    <slot />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import lodash from "lodash";
@Component({
  components: {},
})
export default class extends Vue {
  @Prop({ default: "" }) content;
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
  .ant-comment-content-author {
    flex-direction: column;
  }
  .ant-comment-actions {
    text-align: right;
  }
}
</style>
