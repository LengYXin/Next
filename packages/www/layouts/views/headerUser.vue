<template>
  <a-space size="20" class="xt-header-user" align="end">
    <a-dropdown v-if="!production">
      <a class="ant-dropdown-link xt-header-user-item">
        <span v-text="$locale.locale"></span>
        <a-icon type="down" />
      </a>
      <a-menu class="xt-header-user-item" slot="overlay">
        <a-menu-item>
          <a href="javascript:;" @click="onLocaleChange('zh')">中文</a>
        </a-menu-item>
        <a-menu-item>
          <a href="javascript:;" @click="onLocaleChange('en')">英文</a>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
    <nuxt-link to="/search">
      <a-icon class="xt-header-user-item" type="search" />
    </nuxt-link>
    <nuxt-link to="/my/letter">
      <a-badge class="xt-header-user-item" dot>
        <a-icon type="bell" />
      </a-badge>
    </nuxt-link>
    <userModal />
  </a-space>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import userModal from "./userModal.vue";
@Component({
  components: { userModal },
})
export default class extends Vue {
  get $locale() {
    return this.$store.$locale;
  }
  get production() {
    return this.$store.$global.production;
  }
  onLocaleChange(locale) {
    if (this.$locale.locale === locale) {
      return;
    }
    this.$locale.onLocaleChanges(locale);
    window.location.reload();
  }
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scoped>
@s-pd: 4px;
.xt-header-user {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  &-item {
    font-size: 16px;
    // padding: @s-pd;
  }
}
</style>

