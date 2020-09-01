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
      <a-avatar size="large" icon="user" />
    </a-col>
    <a-col :span="20">
      <lyx-editor class="lyx-editor-single" @submit="onSubmit" />
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
.lyx-msg-editor {
  padding-top: 20px;
  &-avatar {
    text-align: center;
  }
}
</style>
