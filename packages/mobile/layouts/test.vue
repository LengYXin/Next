<template>
    <Nuxt />
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
@Component({
  components: {  },
})
export default class extends Vue {
  mounted() {
    // console.log(this);
  }
  updated() {}
  destroyed() {}
}
</script>