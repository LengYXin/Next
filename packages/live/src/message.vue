/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:16:12
 * @modify date 2020-08-05 14:16:12
 * @desc 视频
 */
<template>
  <a-layout class="lyx-message">
    <a-layout-header class="lyx-message-header">
      <layHeader />
    </a-layout-header>
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
  get PageStore() {
    return this.$rootStore.$storeHomework;
  }
  get Pagination() {
    return this.PageStore.SunDrying;
  }
  get id() {
    return 28; //this.$route.params.id;
  }

  async onSubmit(event) {
    try {
      await this.Pagination.onInstall({
        singleCourseId: this.id,
        content: event.html,
        contentLength: event.length,
        userType: 1,
      });
      event.onReset();
      this.Pagination.onReset();
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
.lyx-message {
  height: 100vh;
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
