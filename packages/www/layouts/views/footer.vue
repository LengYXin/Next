<template>
  <a-descriptions title="User Info">
    <a-descriptions-item label="UserName">Zhou Maomao</a-descriptions-item>
    <a-descriptions-item label="Telephone">1810000000</a-descriptions-item>
    <a-descriptions-item label="Live">Hangzhou, Zhejiang</a-descriptions-item>
    <a-descriptions-item label="Remark">empty</a-descriptions-item>
    <a-descriptions-item
      label="Address"
    >No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China</a-descriptions-item>
  </a-descriptions>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
@Component({
  components: {},
})
export default class extends Vue {
  onSubmit() {}
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scoped>
</style>

