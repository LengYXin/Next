<template>
  <a-menu
    mode="horizontal"
    :default-selected-keys="[$route.fullPath]"
    :style="{ lineHeight: '64px' }"
  >
    <a-menu-item v-for="item in menus" :key="item.key">
      <nuxt-link :to="item.key">
        <span v-text="item.name"></span>
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
      name: "首页"
    },
    {
      key: "/course",
      name: "课程"
    },
    {
      key: "/video",
      name: "视频分享"
    },
    {
      key: "/stationery",
      name: "暄桐文房"
    },
    {
      key: "/about",
      name: "关于暄桐"
    },
    {
      key: "/my",
      name: "去上课"
    }
  ];
  mounted() {
  }
  updated() {}
  destroyed() {}
}
</script>

