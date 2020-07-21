<template>
  <div class="container">
    <div>
      <a-spin>
        <a-icon slot="indicator" type="loading" style="font-size: 50px" spin />
        <logo />
        <h1 class="title">暄桐教室</h1>
      </a-spin>
      <dplayer />
    </div>
  </div>
</template>
<script lang="ts">
import Logo from "~/components/Logo.vue";
import dplayer from "~/components/dplayer/index.vue";
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import { Modal } from "ant-design-vue";
import PageStore from "./store";
@Component({
  components: { Logo, dplayer }
})
export default class PageView extends Vue {
  PageStore = new PageStore();
  mounted() {
    console.log(this);
    this.PageStore.onText();
  }
  onTest() {
    Modal.confirm({ title: "测试" });
    this.$message.success("test");
  }
  updated() {}
  destroyed() {}
}
</script>
<style>

</style>
