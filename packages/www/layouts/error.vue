<template>
  <a-result :status="String(error.statusCode)" :title="error.statusCode" :sub-title="error.message">
    <template #extra>
      <nuxt-link to="/" replace>
        <a-button type="primary">Back Home</a-button>
      </nuxt-link>
    </template>
  </a-result>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";

@Component({
  components: {},
})
export default class extends Vue {
  @Prop() error;
  mounted() {
    // console.log(this);
  }
  updated() {}
  destroyed() {}
}
</script>
<style lang="less">
</style>
<style lang="less" scoped>
</style>
