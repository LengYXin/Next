/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:16:12
 * @modify date 2020-08-05 14:16:12
 * @desc 视频
 */
<template>
  <a-row class="lyx-msg-editor">
    <a-col class="lyx-msg-editor-avatar" :span="4">
      <a-avatar
        :size="40"
        src="https://oss-free.xuantong.cn/thumbPath/daf64bd8e1647294c1ba436ffbed03cc.blob"
      />
    </a-col>
    <a-col :span="19">
      <lyx-editor
        placeholder="和同学们聊聊吧…"
        :rules="{required:true}"
        class="lyx-editor-single"
        @submit="onSubmit"
      />
    </a-col>
  </a-row>
</template>
<script lang="ts">
import lodash from "lodash";
import { Component, Prop, Vue, Provide, Emit } from "vue-property-decorator";
import { Observer } from "mobx-vue";
@Observer
@Component({
  components: {},
})
export default class extends Vue {
  get socketMessage() {
    return this.$rootStore.$socketMessage;
  }
  get id() {
    return "123"; //this.$route.params.id;
  }

  async onSubmit(event) {
    try {
      event.onReset();
      this.socketMessage.onSendRichTxt({
        senderId: "6a757a92-693b-419b-9063-aac86b2b0121",
        nickName: "LENG",
        header:
          "https://oss-free.xuantong.cn/thumbPath/daf64bd8e1647294c1ba436ffbed03cc.blob",
        chan: this.id,
        content: {
          content: event.html,
        },
      });
    } catch (error) {
      console.log("LENG: PageView -> onSubmit -> error", error);
      // this.$message.error(error);
    }
  }
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scoped>
.lyx-msg-editor {
  padding-top: 20px;
  &-avatar {
    text-align: center;
  }
}
</style>
