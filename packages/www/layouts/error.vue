<template>
  <a-result :status="status" :title="error.message">
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
  get status() {
    if (this.error.statusCode === 200) {
      return "500";
    }
    return String(this.error.statusCode);
  }
  mounted() {
    console.log(this);
  }
  updated() {}
  destroyed() {}
}
</script>
