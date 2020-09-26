<!--
 * @Author: Erlin
 * @CreateTime: 2020-09-14 19:26:54
 * @LastEditors: Erlin
 * @LastEditTime: 2020-09-26 17:09:07
 * @Description: 绑定手机号
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

    <a-form-model-item ref="phoneRef" label="新手机号" prop="phone" v-else>
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
      ref="confirmCodeRef"
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
        v-text="isEnterNewPhone ? '绑定' : '下一步'"
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
  @Ref("phoneFormRef") phoneFormRef;
  @Ref("phoneRef") phoneRef;
  @Ref("confirmCodeRef") confirmCodeRef;

  phoneForm = {
    phone: "",
    confirmCode: "",
  };
  rules = {
    phone: [
      {
        validator: this.validatePhone,
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
  isEnterNewPhone = this.PageStore.UserInfo.phoneNum ? false : true;

  /**
   * 手机号字段验证
   */
  validatePhone(rule, value, callback) {
    if (value == "") {
      callback(new Error("请输入手机号码"));
    } else if (!this.$regulars.mobilePhone.test(value)) {
      callback(new Error("请输入正确的手机号码"));
    } else if (value == this.PageStore.UserInfo.phoneNum) {
      callback(new Error("新手机号不能与原手机号相同"));
    } else {
      callback();
    }
  }

  /**
   * 表单提交
   */
  onSubmit(e) {
    e.preventDefault();
    this.phoneFormRef.validate(async (valid) => {
      if (valid) {
        try {
          if (this.isEnterNewPhone) {
            let phone = this.phoneForm.phone;
            await this.onCheckConfirmCode({
              findWay: phone,
              confirmCode: this.phoneForm.confirmCode,
              type: 4,
            });
            this.isEnterNewPhone = false;
            this.$message.success(this.$tc(this.$EnumMessage.bind_success));
            this.$emit("reset");
          } else {
            let phone = this.PageStore.UserInfo.phoneNum;
            await this.onCheckConfirmCode({
              findWay: phone,
              confirmCode: this.phoneForm.confirmCode,
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
      this.phoneForm.confirmCode = "";
      this.toggleCountDown(false);
      this.isEnterNewPhone = true;
      this.$nextTick(() => {
        this.phoneFormRef.addField(this.phoneRef);
      });
    } catch (error) {
      this.$message.warning({ content: this.$tc(error), key: error });
    }
  }

  /**
   * 发送验证码
   */
  async onSendSms() {
    // this.toggleCountDown(true);
    // return;
    let phone = this.PageStore.UserInfo.phoneNum;
    if (this.isEnterNewPhone) {
      // 验证新手机号成功后再发送
      phone = this.phoneForm.phone;
      this.phoneFormRef.validateField("phone", async (err) => {
        if (!err) {
          try {
            await this.PageStore.onSendSms(phone, 4);
            this.toggleCountDown(true);
          } catch (error) {
            this.$message.warning({ content: this.$tc(error), key: error });
          }
        }
      });
    } else {
      try {
        // 直接发送
        await this.PageStore.onSendSms(phone, 4);
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