/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:16:12
 * @modify date 2020-08-05 14:16:12
 * @desc 视频
 */
<template>
  <a-layout class="lyx-message" v-auto-height="{ styleKey: 'minHeight', subtract: 140 }">
    <!-- <a-layout-header class="lyx-message-header">
      <layHeader />
    </a-layout-header> -->
    <a-layout-content class="lyx-message-content">
      <scroller />
    </a-layout-content>
    <a-layout-footer class="lyx-message-footer">
      <editor />
    </a-layout-footer>
  </a-layout>
</template>
<script lang="ts">
import lodash from "lodash";
import { Component, Prop, Vue, Provide, Emit } from "vue-property-decorator";
import { Observer } from "mobx-vue";
import scroller from "./message-scroller.vue";
import editor from "./message-editor.vue";
import layHeader from "./message-header.vue";
@Observer
@Component({
  components: { scroller, editor, layHeader },
})
export default class extends Vue {
  get id() {
    return this.$route.query.id as string;
  }
  get MessageQueue() {
    return this.socketMessage.MessageQueue;
  }
  get socketMessage() {
    return this.$store.$socketMessage;
  }
  async onLink() {
    await this.socketMessage.onLink(this.id);
  }
  created() {
    this.onLink();
  }
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scoped>
.lyx-message {
  height: 100%;
  background: #fff;
  &-header {
    background: #fff;
    height: auto;
    padding: 0;
  }
  &-content {
  }
  &-footer {
    background: #fff;
    padding: 0;
    height: 120px;
  }
}
</style>
