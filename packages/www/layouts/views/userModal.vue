<template>
  <span v-if="PageStore.loggedIn">
    <a-popover>
      <template slot="content">
        <div>
          <a-avatar
            :src="PageStore.UserInfo.headThumbnailUri"
            :alt="PageStore.UserInfo.nickName"
            size="large"
          />
          <span v-text="PageStore.UserInfo.nickName"></span>
          <a-button type="link" @click="onOutLogin">退出登录</a-button>
        </div>
        <a-row type="flex" :gutter="16">
          <a-col v-for="item in menu" :key="item.key">
            <nuxt-link :to="{name:item.key}">
              <span v-t="item.name"></span>
            </nuxt-link>
          </a-col>
        </a-row>
      </template>
      <a-avatar
        :src="PageStore.UserInfo.headThumbnailUri"
        :alt="PageStore.UserInfo.nickName"
        size="large"
      />
    </a-popover>
  </span>
  <span v-else>
    <span @click="onVisible(true,'links_signin')" v-t="locale.links_signin">登录</span>
    <span @click="onVisible(true,'links_register')" v-t="locale.links_register">注册</span>
    <a-modal
      :title="$t(title)"
      :visible="PageStore.visible"
      @ok="onOk"
      @cancel="onCancel"
      :footer="null"
    >
      <signin v-if="title==='links_signin'" />
      <register v-else />
    </a-modal>
  </span>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import signin from "./signin.vue";
import register from "./register.vue";
import { Observer } from "mobx-vue";
@Observer
@Component({
  components: { signin, register },
})
export default class extends Vue {
  get PageStore() {
    return this.$store.$storeUser;
  }
  visible = false;
  title = "";
  get locale() {
    return this.$EnumLocaleLinks;
  }
  menu = [
    {
      key: "my-homework",
      name: "我的作业",
    },
    {
      key: "my-order",
      name: "我的订单",
    },
    {
      key: "my-showHomework",
      name: "我的晒出的作业",
    },
  ];
  onVisible(visible, title?) {
    this.title = title;
    this.PageStore.onToggleVisible(visible);
  }
  onOutLogin() {
    this.$router.replace("/");
    this.PageStore.onOutLogin();
  }
  onOk() {
    this.onVisible(false);
  }
  onCancel() {
    this.onVisible(false);
  }
  onSubmit() {}
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

