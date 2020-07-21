<template>
  <dplayer :options="options" />
</template>

<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
@Component({
  components: {
    dplayer: () => import("./dplayerAsync.vue")
  }
})
export default class extends Vue {
  // http://dplayer.js.org/guide.html#options
  @Prop() options;
  mounted() {
    // console.log(this);
  }
  updated() {}
  destroyed() {}
}
</script>

<style>
</style>