/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:14:21
 * @modify date 2020-08-05 14:14:21
 * @desc 安全设置 
 */
<template>
  <div class="xt-content xt-my-security">
    <a-collapse
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
        <!-- 修改密码折叠内容 -->
        <a-form-model
          ref="passwordForm"
          v-model="passwordForm"
          :label-col="{ span: 9 }"
          :wrapper-col="{ span: 10 }"
          @submit="onUpdatePassword"
        >
          <a-form-model-item has-feedback label="当前密码" prop="pass">
            <a-input-password v-model="passwordForm.oldPassword" />
          </a-form-model-item>
          <a-form-model-item has-feedback label="新密码" prop="checkPass">
            <a-input-password
              placeholder="密码 (8-16位字母＋数字组合)"
              v-model="passwordForm.newPassword"
            />
          </a-form-model-item>
          <a-form-model-item has-feedback label="确认密码" prop="age">
            <a-input-password v-model="passwordForm.confirmNewPassword" />
          </a-form-model-item>

          <a-form-model-item :wrapper-col="{ span: 10, offset: 9 }">
            <a-button
              block
              class="ant-btn-yellow"
              type="primary"
              html-type="submit"
              >保存</a-button
            >
          </a-form-model-item>
        </a-form-model>
      </a-collapse-panel>

      <a-collapse-panel key="2" class="xt-my-security-panel">
        <template slot="header">
          <span>手机绑定</span>
          <span class="xt-margin-left-xxl xt-text-bold">166****5446</span>
        </template>
        <template slot="extra">编辑</template>
        <div>当前密码：xxx</div>
      </a-collapse-panel>

      <a-collapse-panel key="3" class="xt-my-security-panel">
        <template slot="header">
          <span>邮箱绑定</span>
          <span class="xt-margin-left-xxl">已绑定</span>
        </template>
        <template slot="extra">编辑</template>
        <div>当前密码：xxx</div>
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
import { Collapse } from "ant-design-vue";
Vue.use(Collapse);

@Observer
@Component({
  scrollToTop: true,
  components: {},
})
export default class PageView extends Vue {
  get PageStore() {
    return this.$store.$storeUser;
  }
  passwordForm = {};
  async onUpdatePassword() {
    try {
      await this.PageStore.onUpdatePassword(this.passwordForm);
    } catch (error) {}
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
