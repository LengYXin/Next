<template>
  <div>课程详情</div>
</template>
<script lang="ts">
import Logo from "~/components/Logo.vue";
import dplayer from "~/components/dplayer/index.vue";
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import { Modal } from "ant-design-vue";
@Component({
  components: { Logo, dplayer }
})
export default class PageView extends Vue {
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
