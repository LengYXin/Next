<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h1 v-text="currentTime"></h1>
    <a-button type="primary" block @click="onToggleTime" v-text="startInterval?'关闭':'开启'"></a-button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import { Modal } from "ant-design-vue";

@Component({
  components: {}
})
export default class PageView extends Vue {
  // @Inject("RootStore")
  RootStore = this.getRootStore();
  get currentTime() {
    return this.RootStore.TestStore.currentTime;
  }
  get startInterval() {
    return this.RootStore.TestStore.startInterval;
  }
  onToggleTime() {
    this.RootStore.TestStore.onToggleTime();
  }
  mounted() {
    console.log(this);
  }
  updated() {
    console.log("updated");
  }
  destroyed() {}
}
</script>

<style>
</style>