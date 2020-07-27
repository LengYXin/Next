<template>
  <a-menu mode="horizontal" :selected-keys="[$route.fullPath]" class="xt-header-menu">
    <a-menu-item class="ant-menu-item" v-for="item in menus" :key="item.key">
      <nuxt-link :to="{name:item.key}">
        <span v-t="item.name"></span>
      </nuxt-link>
    </a-menu-item>
  </a-menu>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import menus from "../menus";
@Component({
  components: {},
})
export default class extends Vue {
  menus = menus;
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
  .ant-menu-item,
  .ant-menu-item:hover {
    border-color: transparent;
  }
}
</style>

