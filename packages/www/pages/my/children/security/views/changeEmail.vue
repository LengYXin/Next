<!--
 * @Author: Erlin
 * @CreateTime: 2020-09-14 19:26:54
 * @LastEditors: Erlin
 * @LastEditTime: 2020-09-26 17:06:55
 * @Description: 绑定邮箱
-->
<template>
  <a-form-model
    ref="emailFormRef"
    :model="emailForm"
    :rules="rules"
    v-bind="layout"
    @submit="onSubmit"
    :hideRequiredMark="true"
  >
    <a-form-model-item label="已绑定邮箱号" v-if="!isEnterNewEmail">
      <span class="xt-text-yellow" v-text="PageStore.UserInfo.email"></span>
    </a-form-model-item>

    <a-form-model-item ref="emailRef" label="邮箱账号" prop="email" v-else>
      <a-input
        allowClear
        size="large"
        v-model="emailForm.email"
        placeholder="请输入邮箱"
      />
    </a-form-model-item>

    <a-form-model-item
      ref="confirmCodeRef"
      label="邮箱验证码"
      prop="confirmCode"
      :autoLink="false"
    >
      <a-row type="flex" :gutter="12">
        <a-col :span="14">
          <a-input
            allowClear
            size="large"
            :maxLength="6"
            placeholder="请输入六位验证码"
            v-model="emailForm.confirmCode"
            @blur="confirmCodeRef.onFieldBlur()"
            @change="confirmCodeRef.onFieldChange()"
          />
        </a-col>
        <a-col :span="10">
          <a-button
            v-if="!isStartCountDown"
            block
            size="large"
            class="ant-btn-line-yellow xt-text-black"
            type="primary"
            @click="onSendEmail"
            >获取验证码
          </a-button>

          <a-button
            v-else
            block
            size="large"
            class="xt-change-phone-btn"
            type="primary"
          >
            <a-statistic-countdown
              class="xt-change-phone-countdown"
              v-if="toggleCountDown"
              :value="deadline"
              format="ss秒"
              @finish="toggleCountDown(false)"
            />
          </a-button>
        </a-col>
      </a-row>
    </a-form-model-item>

    <a-form-model-item :wrapper-col="{ span: 10, offset: 9 }">
      <a-button
        size="large"
        block
        class="ant-btn-yellow"
        type="primary"
        html-type="submit"
        v-text="isEnterNewEmail ? '绑定' : '下一步'"
      />
    </a-form-model-item>
  </a-form-model>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref } from "vue-property-decorator";
import { Observer } from "mobx-vue";

@Observer
@Component({
  scrollToTop: false,
})
export default class PageView extends Vue {
  get PageStore() {
    return this.$store.$storeUser;
  }
  @Ref("emailFormRef") emailFormRef;
  @Ref("emailRef") emailRef;
  @Ref("confirmCodeRef") confirmCodeRef;

  emailForm = {
    email: "",
    confirmCode: "",
  };
  rules = {
    email: [
      {
        validator: this.validateEmail,
        trigger: "blur",
      },
    ],
    confirmCode: [
      {
        required: true,
        message: "请输入六位验证码",
        trigger: "change",
      },
      { min: 6, max: 6, message: "请输入六位验证码", trigger: "blur" },
    ],
  };
  layout = {
    labelCol: { span: 9 },
    wrapperCol: { span: 10 },
  };
  deadline = 60;
  isStartCountDown = false;
  isEnterNewEmail = this.PageStore.UserInfo.email ? false : true;

  /**
   * 手机号字段验证
   */
  validateEmail(rule, value, callback) {
    if (value == "") {
      callback(new Error("请输入邮箱"));
    } else if (!this.$regulars.email.test(value)) {
      callback(new Error("请输入正确的邮箱号码"));
    } else if (value == this.PageStore.UserInfo.email) {
      callback(new Error("新邮箱不能与原邮箱相同"));
    } else {
      callback();
    }
  }

  /**
   * 表单提交
   */
  onSubmit(e) {
    e.preventDefault();
    this.emailFormRef.validate(async (valid) => {
      if (valid) {
        try {
          if (this.isEnterNewEmail) {
            let email = this.emailForm.email;
            await this.onCheckConfirmCode({
              findWay: email,
              confirmCode: this.emailForm.confirmCode,
              type: 4,
            });
            this.isEnterNewEmail = false;
            this.PageStore.onGetUserInfo();
            this.$message.success(this.$tc(this.$EnumMessage.bind_success));
            this.$emit("reset");
          } else {
            let email = this.PageStore.UserInfo.email;
            await this.onCheckConfirmCode({
              findWay: email,
              confirmCode: this.emailForm.confirmCode,
              type: 4,
            });
          }
        } catch (error) {
          this.$message.warning({ content: this.$tc(error), key: error });
        }
      }
    });
  }

  /**
   * 检测验证码是否正确
   */
  async onCheckConfirmCode(body) {
    try {
      await this.PageStore.onCheckConfirmCode(body);
      this.emailForm.confirmCode = "";
      this.toggleCountDown(false);
      this.isEnterNewEmail = true;
      this.$nextTick(() => {
        this.emailFormRef.addField(this.emailRef);
      });
    } catch (error) {
      this.$message.warning({ content: this.$tc(error), key: error });
    }
  }

  /**
   * 发送邮箱验证码
   */
  async onSendEmail() {
    let email = this.PageStore.UserInfo.email;
    if (this.isEnterNewEmail) {
      email = this.emailForm.email;
      this.emailFormRef.validateField("email", async (err) => {
        if (!err) {
          try {
            await this.PageStore.onSendEmail(email, 4);
            this.toggleCountDown(true);
          } catch (error) {
            this.$message.warning({ content: this.$tc(error), key: error });
          }
        }
      });
    } else {
      try {
        // 直接发送
        await this.PageStore.onSendEmail(email, 4);
        this.toggleCountDown(true);
      } catch (error) {
        this.$message.warning({ content: this.$tc(error), key: error });
      }
    }
  }

  /**
   * 切换倒计时开始/结束
   */
  toggleCountDown(loading: boolean = !this.isStartCountDown) {
    if (loading) {
      this.deadline = Date.now() + 1000 * 60;
    }
    this.isStartCountDown = loading;
  }
}
</script>

<style lang="less">
.xt-change-phone-countdown {
  &.ant-statistic {
    line-height: 1;
  }
  .ant-statistic-content-value {
    color: inherit;
    font-size: @font-size-base !important;
  }
}
</style>
<style lang="less" scoped>
// 输入框高度
.ant-input-lg {
  height: 36px;
  line-height: 36px;
  font-size: @font-size-base;
}
// 按钮高度
.ant-btn-lg {
  height: 36px;
  line-height: 36px;
  font-size: @font-size-base;
}
.xt-change-phone {
  &-btn {
    color: @black;
    background-color: #cccccc;
    border-color: #cccccc;
  }
}
</style>