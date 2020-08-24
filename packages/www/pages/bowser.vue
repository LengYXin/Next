
<template>
  <div class="xt-content">
      浏览器不支持
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import { Observer } from "mobx-vue";
import lodash from "lodash";
import { Context } from "@nuxt/types";
@Observer
@Component({
  components: {},
})
export default class PageView extends Vue {
  created() {}
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scoped>

</style>