<!--
 * @Author: Erlin
 * @CreateTime: 2020-08-06 20:52:17
 * @LastEditors: Erlin
 * @LastEditTime: 2020-09-26 17:00:40
 * @Description: 个人信息
-->

<template>
  <div class="xt-content xt-my-information">
    <a-row type="flex" align="middle">
      <xt-hover animation="fade" class="xt-my-information-avatar-warp">
        <a-avatar
          :src="PageStore.UserInfo.headThumbnailUri"
          :alt="PageStore.UserInfo.nickName"
          :size="95"
        />
        <template #hover>
          <UpdateAvatar />
        </template>
      </xt-hover>
      <a-col :flex="1" class="xt-padding-left-lg">
        <div v-if="!inputVisible">
          <div v-text="PageStore.UserInfo.nickName"></div>
          <a-button type="link" class="xt-padding-none" @click="toggleInput"
            >修改昵称</a-button
          >
        </div>
        <a-input
          ref="nickNameInput"
          v-else
          size="large"
          class="xt-my-information-nickname-input"
          v-model="nickName"
          placeholder="请输入您的昵称"
          :max-length="25"
          @change="onChange"
          @blur="onBlur"
        />
      </a-col>
    </a-row>

    <a-row class="xt-text-align-center xt-margin-top-lg">
      <a-icon
        type="man"
        v-if="userForm.sex == 0"
        class="xt-my-information-man-icon"
      />
      <a-icon v-else type="woman" class="xt-my-information-woman-icon" />
    </a-row>

    <a-form-model
      ref="ruleForm"
      :model="userForm"
      :label-col="{ span: 9 }"
      :wrapper-col="{ span: 10 }"
      @submit="onSubmit"
      @submit.native.prevent
    >
      <a-form-model-item> 基本信息 </a-form-model-item>
      <a-form-model-item label="性别" prop="sex">
        <a-radio-group
          class="ant-radio-yellow"
          v-model="userForm.sex"
          :options="enumOptions.sexOptions"
        />
      </a-form-model-item>
      <a-form-model-item label="生日" prop="birthday">
        <DatePicker
          v-model="userForm.birthday"
          class="xt-my-information-calendar"
          size="large"
          format="YYYY年MM月DD日"
        />
      </a-form-model-item>

      <a-form-model-item> 更多 </a-form-model-item>
      <a-form-model-item label="所在行业" prop="career">
        <a-select
          placeholder="请选择"
          class="xt-my-information-select"
          v-model="userForm.industryId"
          :options="enumOptions.industryOptions"
        />
      </a-form-model-item>
      <a-form-model-item label="职业">
        <a-select
          placeholder="请选择"
          class="xt-my-information-select"
          v-model="userForm.careerId"
          :options="enumOptions.careerOptions"
        />
      </a-form-model-item>
      <a-form-model-item label="学历">
        <a-select
          placeholder="请选择"
          class="xt-my-information-select"
          v-model="userForm.educationId"
          :options="enumOptions.educationOptions"
        />
      </a-form-model-item>

      <a-form-model-item label="所在地">
        <Location @change="onLocationChange" />
      </a-form-model-item>
      <a-form-model-item
        class="xt-my-information-save-warp"
        :wrapper-col="{ span: 10, offset: 9 }"
      >
        <a-button
          size="large"
          type="primary"
          class="ant-btn-yellow"
          block
          html-type="submit"
          >保存</a-button
        >
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script lang="ts">
import lodash from "lodash";
import moment from "moment";
import { Component, Prop, Vue, Ref } from "vue-property-decorator";
import { Context } from "@nuxt/types";
import { Observer } from "mobx-vue";
import { DatePicker } from "ant-design-vue";
import { dataSource_My } from "@xt/client";

import Location from "./views/location.vue";
import UpdateAvatar from "./views/updateAvatar.vue";

@Observer
@Component({
  scrollToTop: true,
  components: { DatePicker, Location, UpdateAvatar },
})
export default class PageView extends Vue {
  enumOptions = dataSource_My;
  get PageStore() {
    return this.$store.$storeUser;
  }
  @Ref("nickNameInput") nickNameInput;
  inputVisible = false;
  nickName = this.PageStore.UserInfo.nickName;
  userForm = lodash.set(
    lodash.pick(this.PageStore.UserInfo, [
      "sex", // 性别
      "career", // 职业
      "careerId", // 职业id
      "cityId", // 城市
      "countryId", // 国家
      "education", // 学历
      "educationId", // 学历id
      "headThumbnailUri", //头像预览图
      "headUri", //头像
      "industry", // 所在行业
      "industryId", // 所在行业id
      "provinceId", // 省市
    ]),
    "birthday",
    moment(this.PageStore.UserInfo.birthday)
  );

  /**
   * 切换nickName输入框
   */
  toggleInput() {
    this.inputVisible = !this.inputVisible;
    if (this.inputVisible) {
      this.$nextTick(() => {
        this.nickNameInput.focus();
      });
    }
  }

  /**
   * 选择地区
   */
  onLocationChange(value) {
    this.userForm.countryId = value[0];
    this.userForm.provinceId = value[1];
    this.userForm.cityId = value[2];
  }
  onChange() {}

  /**
   * input取消焦点 更新nickname
   */
  async onBlur() {
    try {
      if (this.nickName == this.PageStore.UserInfo.nickName) return;
      if (this.nickName.trim() == "") {
        this.nickName = this.PageStore.UserInfo.nickName;
        this.inputVisible = false;
        return;
      }
      await this.PageStore.onUpdateNickName(this.nickName);
      this.inputVisible = false;
    } catch (error) {
      this.$message.warning({ content: this.$tc(error), key: error });
    }
  }

  async onSubmit() {
    try {
      await this.PageStore.onUpdateUserInfo(this.userForm);
      await this.PageStore.onGetUserInfo();
      this.$message.success(this.$tc(this.$EnumMessage.save_success));
    } catch (error) {
      this.$message.warning({ content: this.$tc(error), key: error });
    }
  }

  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scope>
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
}
.ant-calendar.ant-calendar-picker-container-content {
  width: 100%;
}
// 日历被选中样式
.ant-calendar-selected-day .ant-calendar-date {
  width: 26px;
  height: 26px;
  line-height: 26px;
  color: @white;
  background: @xt-yellow-6;
  border-radius: 666px;
}

.xt-my-information {
  padding-top: 30px;
  padding-bottom: 40px;

  &-avatar-warp {
    position: relative;
    width: 95px;
    height: 95px;
    margin-left: calc(50% - 47.5px);
    .xt-hover-suspension {
      cursor: pointer;
      border-radius: 666px;
    }
  }
  &-nickname-input {
    font-size: @font-size-base!important;
    max-width: 200px;
  }
  &-man-icon {
    color: @white!important;
    background: #89caf8;
    border-radius: 666px;
    padding: 5px;
  }
  &-woman-icon {
    color: @white!important;
    background: #e7afb1;
    border-radius: 666px;
    padding: 5px;
  }
  &-calendar {
    width: 310px;
    .ant-calendar-picker-input.ant-input {
      color: @xt-yellow-6;
    }
  }
  &-select {
    @selectHeight: 36px;
    height: @selectHeight;
    line-height: @selectHeight;
    .ant-select-selection.ant-select-selection--single {
      height: @selectHeight;
      line-height: @selectHeight;
      .ant-select-selection__rendered {
        height: @selectHeight;
        line-height: @selectHeight;
      }
    }
  }
  // &-save-warp {
  //   // display: flex;
  //   // justify-content: center;
  // }
}
</style>
