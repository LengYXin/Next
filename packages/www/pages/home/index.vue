<template>
  <div class="container">
    <div>
      <a-spin>
        <a-icon slot="indicator" type="loading" style="font-size: 50px" spin />
        <logo />
        <h1 class="title">暄桐教室</h1>
      </a-spin>
      <h2 class="subtitle">My rad Nuxt.js project</h2>
      <div class="links">
        <a href="https://nuxtjs.org/" target="_blank" class="button--green">Documentation</a>
        <a href="https://github.com/nuxt/nuxt.js" target="_blank" class="button--grey">GitHub</a>
        <a-button type="primary" @click="onTest">Primary</a-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Logo from "~/components/Logo.vue";
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import { Modal } from "ant-design-vue";
@Component({
  components: { Logo }
})
export default class PageView extends Vue {
  // PageStore = new PageStore();
  mounted() {
    console.log(this);
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
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
