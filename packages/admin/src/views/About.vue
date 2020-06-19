<template>
  <div class="about">
    <h1>This is an about page</h1>
    <a-button type="primary" block @click="onText">测试</a-button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Provide } from "vue-property-decorator";
import { Modal } from "ant-design-vue";

@Component({
  components: {}
})
export default class PageView extends Vue {
  onText() {
    Modal.confirm({ title: "测试" });
  }
  mounted() {
    console.log('aaaaaaaaaa')
  }
  destroyed() {}
}
</script>

<style>
</style>