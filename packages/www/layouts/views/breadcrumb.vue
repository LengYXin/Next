<template>
  <div class="xt-content xt-breadcrumb" v-show="show&&pageName">
    <a-breadcrumb separator=">">
      <a-breadcrumb-item>
        <nuxt-link to="/">
          <span v-t="'links_home'"></span>
        </nuxt-link>
      </a-breadcrumb-item>
      <a-breadcrumb-item>
        <span v-t="pageName"></span>
      </a-breadcrumb-item>
    </a-breadcrumb>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import menus from "../menus";
import lodash from "lodash";
@Component({
  components: {},
})
export default class extends Vue {
  exclude = ["index", "my"];
  get name() {
    return lodash.head(lodash.split(this.$route.name, "-"));
  }
  get show() {
    return !lodash.includes(this.exclude, this.name);
  }
  get pageName() {
    try {
      return lodash.find(menus, ["key", this.name]).name;
    } catch (error) {
      return undefined;
    }
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

