<!--
 * @Author: Erlin
 * @CreateTime: 2020-09-14 19:26:54
 * @LastEditors: Erlin
 * @LastEditTime: 2020-09-17 20:57:36
 * @Description: 修改密码折叠内容
-->
<template>
  <a-form-model
    ref="phoneFormRef"
    :model="phoneForm"
    :rules="rules"
    v-bind="layout"
    @submit="onSubmit"
    :hideRequiredMark="true"
  >
    <a-form-model-item label="已绑定手机号" v-if="!isEnterNewPhone">
      <span class="xt-text-yellow" v-phone="PageStore.UserInfo.phoneNum"></span>
    </a-form-model-item>

    <a-form-model-item
      ref="phone"
      label="新手机号"
      prop="phone"
      v-else
      :rules="[
        {
          required: true,
          message: '请输入手机号码',
          trigger: 'change',
        },
        {
          pattern: $regulars.mobilePhone,
          message: '请输入正确的手机号码',
          trigger: 'blur',
        },
      ]"
    >
      <a-input
        allowClear
        size="large"
        :maxLength="11"
        addon-before="+86"
        v-model="phoneForm.phone"
        placeholder="请输入新手机号"
      />
    </a-form-model-item>

    <a-form-model-item
      ref="confirmCode"
      label="短信验证码"
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
            v-model="phoneForm.confirmCode"
            @blur="
              () => {
                $refs.confirmCode.onFieldBlur();
              }
            "
            @change="
              () => {
                $refs.confirmCode.onFieldChange();
              }
            "
          />
        </a-col>
        <a-col :span="10">
          <a-button
            v-if="!isStartCountDown"
            block
            size="large"
            class="ant-btn-line-yellow xt-text-black"
            type="primary"
            @click="onSendSms"
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
        >下一步</a-button
      >
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
  @Ref("phoneFormRef") phoneFormRef;
  phoneForm = {
    phone: "",
    confirmCode: "",
  };
  rules = {
    phone: [
      {
        required: true,
        message: "请输入手机号码",
        trigger: "change",
      },
      {
        pattern: this.$regulars.mobilePhone,
        message: "请输入正确的手机号码",
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
  isEnterNewPhone = false;
  onSubmit(e) {
    e.preventDefault();
    this.phoneFormRef.validate((valid) => {
      if (valid) {
        this.onCheckConfirmCode({
          phone: this.PageStore.UserInfo.phoneNum,
          confirmCode: this.phoneForm.confirmCode,
          type: 4,
        });
      }
    });
  }

  /**
   * 检测验证码是否正确
   */
  async onCheckConfirmCode(body) {
    try {
      // await this.PageStore.onCheckConfirmCode(body);
      this.phoneForm.confirmCode = "";
      this.toggleCountDown(false);
      this.isEnterNewPhone = true;
    } catch (error) {}
  }

  /**
   * 发送验证码
   */
  async onSendSms() {
    this.phoneFormRef.validateField("phone", (err) => {
      console.log("PageView -> onSendSms -> err", err);
    });
    // this.toggleCountDown(true);

    return;
    let phone = this.PageStore.UserInfo.phoneNum;
    if (this.isEnterNewPhone) {
      phone = this.phoneForm.phone;
      this.phoneFormRef.validateField("phone", (err) => {
        console.log("PageView -> onSendSms -> err", err);
      });
    }
    await this.PageStore.onSendSms(phone, 4);
    this.toggleCountDown(true);
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