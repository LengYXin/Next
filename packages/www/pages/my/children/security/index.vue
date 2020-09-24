<!--
 * @Author: Erlin
 * @CreateTime: 2020-08-06 20:52:17
 * @LastEditors: Erlin
 * @LastEditTime: 2020-09-24 16:53:33
 * @Description: 安全设置
-->

<template>
  <div class="xt-content xt-my-security">
    <a-collapse
      v-model="activeKey"
      accordion
      :bordered="false"
      expandIconPosition="right"
      class="xt-my-security-collapse xt-font-family-FZLTHJW"
    >
      <template #expandIcon="props">
        <div class="xt-text-yellow">
          <a-icon type="double-right" :rotate="props.isActive ? 90 : 0" />
        </div>
      </template>
      <!-- 修改密码 -->
      <a-collapse-panel key="1" class="xt-my-security-panel">
        <template slot="header">
          <span>修改密码</span>
        </template>
        <template slot="extra" slot-scope="props">
          <span v-if="props.isActive">收起</span>
          <span v-else>编辑</span>
        </template>
        <ChangePassword @reset="onResetCollapse" />
      </a-collapse-panel>

      <a-collapse-panel key="2" class="xt-my-security-panel">
        <template slot="header">
          <span>手机绑定</span>
          <span
            class="xt-margin-left-xxl xt-text-bold"
            v-phone="PageStore.UserInfo.phoneNum"
          ></span>
        </template>
        <template slot="extra">编辑</template>
        <ChangePhone @reset="onResetCollapse" />
      </a-collapse-panel>

      <a-collapse-panel key="3" class="xt-my-security-panel">
        <template slot="header">
          <span>邮箱绑定</span>
          <span class="xt-margin-left-xxl">已绑定</span>
        </template>
        <template slot="extra">编辑</template>
      </a-collapse-panel>

      <a-collapse-panel key="4" class="xt-my-security-panel">
        <template slot="header">
          <span>微信绑定</span>
          <span class="xt-margin-left-xxl">已绑定</span>
        </template>
        <template slot="extra">编辑</template>
        <div>当前密码：xxx</div>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import { Observer } from "mobx-vue";
import ChangePassword from "./views/changePassword.vue";
import ChangePhone from "./views/changePhone.vue";

@Observer
@Component({
  scrollToTop: true,
  components: { ChangePassword, ChangePhone },
})
export default class PageView extends Vue {
  get PageStore() {
    return this.$store.$storeUser;
  }
  activeKey = null;
  // 关闭折叠面板
  onResetCollapse() {
    this.activeKey = null;
  }
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scoped>
.xt-my-security {
  &-collapse {
    background-color: #ffffff;
  }
  &-panel {
    // background-color: transparent;
  }
}
</style>
