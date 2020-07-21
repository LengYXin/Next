<template>
  <div>课程详情</div>
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
  data = [
    {
      title: "Ant Design Title 1"
    },
    {
      title: "Ant Design Title 2"
    },
    {
      title: "Ant Design Title 3"
    },
    {
      title: "Ant Design Title 4"
    }
  ];
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
