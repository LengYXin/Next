<template>
  <a-menu mode="horizontal" :selected-keys="selectedkeys" class="xt-header-menu">
    <a-menu-item class="ant-menu-item" v-for="item in PageStore.Menus" :key="item.key">
      <nuxt-link :to="{name:item.key}">
        <span v-t="item.name"></span>
      </nuxt-link>
    </a-menu-item>
    <a-menu-item v-if="UserStore.loggedIn" class="ant-menu-item" key="my">
      <nuxt-link :to="{name:'my'}">
        <span v-t="locale.links_my"></span>
      </nuxt-link>
    </a-menu-item>
  </a-menu>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import { Observer } from "mobx-vue";
@Observer
@Component({
  components: {},
})
export default class extends Vue {
  get PageStore() {
    return this.$store.$menu;
  }
  get UserStore() {
    return this.$store.$storeUser;
  }
  get selectedkeys() {
    return [this.$route.name, ...this.PageStore.getSelectedkeys(this.$route)];
  }
  get locale() {
    return this.$EnumLocaleLinks;
  }
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scoped>
.xt-header-menu {
  line-height: @layout-header-height;
  text-align: center;
  font-size: @font-size-base+4px;
  margin: 0;
  background: transparent;
  .ant-menu-item,
  .ant-menu-item:hover {
    border-color: transparent;
    background: @white;
  }
}
</style>

