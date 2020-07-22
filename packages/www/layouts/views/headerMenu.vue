<template>
  <a-menu
    mode="horizontal"
    :default-selected-keys="[$route.fullPath]"
    :style="{ lineHeight: '64px' }"
  >
    <a-menu-item v-for="item in menus" :key="item.key">
      <nuxt-link :to="item.key">
        <span v-t="item.name"></span>
      </nuxt-link>
    </a-menu-item>
  </a-menu>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
@Component({
  components: {}
})
export default class extends Vue {
  menus = [
    {
      key: "/",
      name: "links_home"
    },
    {
      key: "/course",
      name: "links_course"
    },
    {
      key: "/video",
      name: "links_video"
    },
    {
      key: "/stationery",
      name: "links_stationery"
    },
    {
      key: "/about",
      name: "links_about"
    },
    {
      key: "/my",
      name: "links_my"
    }
  ];
  mounted() {
  }
  updated() {}
  destroyed() {}
}
</script>

