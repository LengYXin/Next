<template>
  <div class="xt-content xt-breadcrumb" v-show="PageStore.breadcrumbShow">
    <a-breadcrumb separator=">">
      <a-breadcrumb-item>
        <nuxt-link to="/" replace>
          <span v-t="'links_home'"></span>
        </nuxt-link>
      </a-breadcrumb-item>
      <a-breadcrumb-item v-for="item in PageStore.breadcrumb" :key="item.linksKey">
        <nuxt-link v-if="item.links" :to="{name:item.linksKey}" replace>
          <span v-t="item.linksName"></span>
        </nuxt-link>
        <span v-else v-t="item.linksName"></span>
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import lodash from "lodash";
import { Observer } from "mobx-vue";
@Observer
@Component({
  components: {},
})
export default class extends Vue {
  get PageStore() {
    return this.$store.$menu;
  }
  onSubmit() {}
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scoped>
.xt-breadcrumb {
  padding-top: @padding-lg;
}
</style>

