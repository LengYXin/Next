<template>
  <div class="xt-header-user">
    <a-dropdown>
      <a class="ant-dropdown-link">
        <span v-text="$locale.locale"></span>
        <a-icon type="down" />
      </a>
      <a-menu slot="overlay">
        <a-menu-item>
          <a href="javascript:;" @click="onLocaleChange('zh')">中文</a>
        </a-menu-item>
        <a-menu-item>
          <a href="javascript:;" @click="onLocaleChange('en')">英文</a>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
    <span>搜索</span>
    <span>消息</span>
    <userModal text="登录" />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import userModal from "./userModal.vue";
@Component({
  components: { userModal }
})
export default class extends Vue {
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
.xt-header-user {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
}
</style>

