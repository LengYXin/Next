<template>
  <xt-action title="0" icon="team" :statistics="item.viewCount" />
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch, Provide } from "vue-property-decorator";
import { Context } from "@nuxt/types";
import { Observer } from "mobx-vue";
import lodash from "lodash";
@Component({
  components: {},
})
export default class PageView extends Vue {
  @Prop({ default: {} }) item;
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
