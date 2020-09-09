<!--
 * @Author: Erlin
 * @CreateTime: 2020-08-06 20:52:17
 * @LastEditors: Erlin
 * @LastEditTime: 2020-09-09 22:51:45
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
        <template #hover><span>修改头像</span></template>
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
          :value="nickName"
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
        v-if="PageStore.UserInfo.sex == 0"
        class="xt-my-information-man-icon"
      />
      <a-icon v-else type="woman" class="xt-my-information-woman-icon" />
    </a-row>

    <a-form-model
      ref="ruleForm"
      :label-col="{ span: 9 }"
      :wrapper-col="{ span: 15 }"
    >
      <a-form-model-item> 基本信息 </a-form-model-item>
      <a-form-model-item label="性别" prop="resource">
        <a-radio-group>
          <a-radio value="1"> Sponsor </a-radio>
          <a-radio value="2"> Venue </a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item label="生日" prop="resource">
        <a-date-picker />
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script lang="ts">
import {
  Component,
  Prop,
  Vue,
  Provide,
  Inject,
  Ref,
} from "vue-property-decorator";
import moment from "moment";
import { Modal, DatePicker } from "ant-design-vue";
Vue.use(DatePicker);

@Component({
  scrollToTop: true,
  components: {
    DatePicker,
  },
})
export default class PageView extends Vue {
  get PageStore() {
    return this.$store.$storeUser;
  }
  @Ref("nickNameInput") nickNameInput;
  inputVisible = false;
  nickName = this.PageStore.UserInfo.nickName;
  toggleInput() {
    this.inputVisible = !this.inputVisible;
    if (this.inputVisible) {
      this.$nextTick(() => {
        this.nickNameInput.focus();
      });
    }
  }
  onChange() {}
  onBlur() {
    this.inputVisible = false;
  }
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scope>
.xt-my-information {
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
}
</style>
