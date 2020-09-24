/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:16:12
 * @modify date 2020-08-05 14:16:12
 * @desc 视频
 */
<template>
  <a-row class="lyx-msg-editor">
    <a-col class="lyx-msg-editor-avatar" :span="4" @click="onText">
      <a-badge class="xt-badge xt-badge-left">
        <span class="lyx-editor-span" slot="count" v-if="question">
          <svg class="lyx-icon lyx-icon-jushou" aria-hidden="true">
            <use xlink:href="#video-jushou" />
          </svg>
        </span>
        <a-avatar :size="40" :src="UserStore.UserInfo.headThumbnailUri" />
      </a-badge>
    </a-col>
    <a-col :span="19">
      <lyx-editor
        placeholder="和同学们聊聊吧…"
        :rules="{ required: true }"
        class="lyx-editor-single"
        @submit="onSubmit"
      >
        <template #toolbar>
          <span class="lyx-editor-span" @click="onQuestion">
            <svg class="lyx-icon lyx-icon-jushou" aria-hidden="true">
              <use xlink:href="#video-jushou" />
            </svg>
          </span>
        </template>
      </lyx-editor>
    </a-col>
  </a-row>
</template>
<script lang="ts">
import lodash from "lodash";
import { Component, Prop, Vue, Provide, Emit } from "vue-property-decorator";
import { Observer } from "mobx-vue";
import { map, delay, throttleTime } from "rxjs/operators";
import { interval } from "rxjs";
@Observer
@Component({
  components: {},
})
export default class extends Vue {
  get UserStore() {
    return this.$store.$storeUser;
  }
  get socketMessage() {
    return this.$store.$socketMessage;
  }
  get id() {
    return this.$route.query.id as string;
  }
  question = false;
  // 提问
  onQuestion(question = !this.question) {
    this.question = question;
  }
  async onSubmit(event) {
    try {
      this.socketMessage.onSendRichTxt({
        nickName: this.UserStore.UserInfo.nickName,
        header: this.UserStore.UserInfo.headThumbnailUri,
        content: {
          question: this.question,
          content: event.html,
        },
      });
      event.onReset();
      this.onQuestion(false);
    } catch (error) {
      console.log("LENG: PageView -> onSubmit -> error", error);
      // this.$message.error(error);
    }
  }
  onText() {
    this.$message.success("测试");
    console.time("interval");
    const int = interval(1000)
      .pipe(
        // delay(100),
        map((x) => {
          if (x > 100) {
            int.unsubscribe();
            console.timeEnd("interval");
          }
          return {
            id: x,
            author: lodash.sample(["林一", "张三", "李四四"]),
            time: Date.now(),
            avatar: lodash.sample([
              "https://oss-free.xuantong.cn/picturePath/b8938fb359b16ce19be6419160b428f5.blob",
              "https://oss-free.xuantong.cn/picturePath/a1815d5ecbf18fad30e48998f00b4a0e.blob",
            ]),
            content: lodash.sample([
              `各位好，这字帖好漂亮，好像珍藏一份。
  老师今天好漂亮。各位好，这字帖好漂亮，好像珍藏一份。
  老师今天好漂亮。各位好，这字帖好漂亮，好像珍藏一份。
  老师今天好漂亮。`,
              `[失望][泪][允悲][晕][害羞][右哼哼][抓狂][打脸]`,
              "[失望][泪][允悲][晕][害羞][右哼哼][抓狂][打脸][失望][泪][允悲][晕][害羞][右哼哼][抓狂][打脸][失望][泪][允悲][晕][害羞][右哼哼][抓狂][打脸][失望][泪][允悲][晕][害羞][右哼哼][抓狂][打脸]",
            ]),
            jushou: lodash.sample([true, false]),
          };
        })
        // delay(100)
        // throttleTime(1000)
      )
      .subscribe((obs) => {
        // console.log("LENG: extends -> onText -> obs", obs);
        this.onSubmit({
          html: obs.content,
          onReset: () => {},
        });
      });
  }
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" >
.lyx-msg-editor {
  padding-top: 20px;
  &-avatar {
    text-align: center;
  }
  &-badge {
  }
}
</style>
