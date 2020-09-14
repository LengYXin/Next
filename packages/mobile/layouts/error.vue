<template>
  <van-empty image="error" :description="error.message" />
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
