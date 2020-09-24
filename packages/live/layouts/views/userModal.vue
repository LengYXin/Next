<template>
  <!-- <span v-if="PageStore.loggedIn">
    <a-popover placement="bottomRight">
      <template slot="content">
        <div class="user-modal-warp">
          <a-row type="flex" justify="space-between" align="middle">
            <a-col>
              <a-row type="flex" justify="start" align="middle" :gutter="12">
                <a-col>
                  <a-avatar
                    :src="PageStore.UserInfo.headThumbnailUri"
                    :alt="PageStore.UserInfo.nickName"
                    :size="55"
                /></a-col>
                <a-col>
                  <nuxt-link
                    :to="'/my/information'"
                    v-text="PageStore.UserInfo.nickName"
                  ></nuxt-link>
                </a-col>
              </a-row>
            </a-col>
            <a-col>
              <a-button type="link" @click="onOutLogin">退出登录</a-button>
            </a-col>
          </a-row>
          <a-divider></a-divider>
          <a-row type="flex" :gutter="16">
            <a-col v-for="item in menu" :key="item.key">
              <nuxt-link :to="{ name: item.key }">
                <a-icon type="caret-right" />
                <span v-t="item.name"></span>
              </nuxt-link>
            </a-col>
          </a-row>
        </div>
      </template>
      <a-avatar
        :src="PageStore.UserInfo.headThumbnailUri"
        :alt="PageStore.UserInfo.nickName"
        size="large"
      />
    </a-popover>
  </span>
  <a-space :size="0" v-else>
    <a-button
      size="small"
      type="link"
      @click="onVisible(true, locale.links_signin)"
      v-t="locale.links_signin"
      >登录</a-button
    >
    <a-button
      size="small"
      type="link"
      @click="onVisible(true, locale.links_register)"
      v-t="locale.links_register"
      >注册</a-button
    > -->
  <!-- :title="$t(title||'links_signin')" -->
  <a-modal
    wrapClassName="xt-signin-modal"
    :visible="PageStore.visible"
    @ok="onOk"
    @cancel="onCancel"
    :footer="null"
    width="700px"
  >
    <div v-show="PageStore.visible">
      <signin v-if="isSignin" @toggle="onToggle" />
      <!-- <register
          v-else-if="title === locale.links_register"
          @toggle="onToggle"
        />
        <retrieve
          v-else-if="title === locale.links_retrieve"
          @toggle="onToggle"
        /> -->
    </div>
  </a-modal>
  <!-- </a-space> -->
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import signin from "./signin.vue";
import register from "./register.vue";
import retrieve from "./retrieve.vue";
import lodash from "lodash";
import { Observer } from "mobx-vue";
@Observer
@Component({
  components: { signin, register, retrieve },
})
export default class extends Vue {
  get PageStore() {
    return this.$store.$storeUser;
  }
  title = "";
  get isSignin() {
    return lodash.includes(
      [this.locale.links_signin, "", undefined],
      this.title
    );
  }
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
  onToggle(title) {
    this.title = title;
    console.log("LENG: extends -> onToggle -> this.title", this.title);
  }
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
  mounted() {
    // console.log(this);
  }
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
<style lang="less" >
.xt-signin-modal {
  .ant-modal-body {
    padding: 0;
  }
}
.user-modal-warp {
  padding: 8px;
}
</style>

