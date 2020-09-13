<!--
 * @Author: Erlin
 * @CreateTime: 2020-08-06 20:52:17
 * @LastEditors: Erlin
 * @LastEditTime: 2020-09-13 16:33:31
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
          :options="sexOptions"
        />
        <!-- 
        <a-radio-group v-model="userForm.sex">
          <a-radio :value="0">男</a-radio>
          <a-radio :value="1">女</a-radio>
        </a-radio-group> -->
      </a-form-model-item>
      <a-form-model-item label="生日" prop="birthday">
        <a-date-picker
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
          :options="industryList"
        />
      </a-form-model-item>
      <a-form-model-item label="职业">
        <a-select
          placeholder="请选择"
          class="xt-my-information-select"
          v-model="userForm.careerId"
          :options="jobList"
        />
      </a-form-model-item>
      <a-form-model-item label="学历">
        <a-select
          placeholder="请选择"
          class="xt-my-information-select"
          v-model="userForm.educationId"
          :options="educationList"
        />
      </a-form-model-item>

      <a-form-model-item label="所在地">
        <!-- :field-names="{ label: 'name', value: 'code', children: 'items' }" -->
        <!-- :defaultValue="[
            userForm.countryId,
            userForm.provinceId,
            userForm.cityId,
          ]" -->
        <a-cascader
          :allowClear="false"
          :defaultValue="defaultLocation"
          :options="locationOptions"
          :load-data="lodationLoadData"
          placeholder="请选择地区"
          change-on-select
          @change="onChange"
        />
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
import { Modal, DatePicker, Cascader } from "ant-design-vue";
Vue.use(DatePicker);
Vue.use(Cascader);

@Observer
@Component({
  // 每次进入页面都会调用
  // async fetch(ctx: Context) {
  //   const countryData = await ctx.store.$storeUser.onGetCountry();
  // },
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
  // userForm = {
  //   ...this.PageStore.UserInfo,
  //   birthday: moment(this.PageStore.UserInfo.birthday),
  // };
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
  sexOptions = [
    { label: "男", value: 0 },
    { label: "女", value: 1 },
  ];
  industryList = [
    {
      value: 20,
      label: "教育",
    },
    {
      value: 21,
      label: "文化艺术",
    },
    {
      value: 82,
      label: "互联网",
    },
    {
      value: 84,
      label: "传媒",
    },
    {
      value: 85,
      label: "金融",
    },
    {
      value: 86,
      label: "政府机关",
    },
    {
      value: 87,
      label: "其他",
    },
  ];
  jobList = [
    {
      value: 22,
      label: "教师",
    },
    {
      value: 23,
      label: "医生",
    },
    {
      value: 90,
      label: "工程师",
    },
    {
      value: 91,
      label: "程序员",
    },
    {
      value: 92,
      label: "公务员",
    },
    {
      value: 93,
      label: "创业者",
    },
    {
      value: 94,
      label: "管理者",
    },
    {
      value: 95,
      label: "职员",
    },
    {
      value: 96,
      label: "退休",
    },
    {
      value: 97,
      label: "自由职业",
    },
    {
      value: 98,
      label: "家庭主妇",
    },
    {
      value: 99,
      label: "学生",
    },
    {
      value: 100,
      label: "其他",
    },
  ];

  educationList = [
    {
      value: 24,
      label: "高中及以下",
    },
    {
      value: 25,
      label: "专科",
    },
    {
      value: 26,
      label: "本科",
    },
    {
      value: 88,
      label: "硕士",
    },
    {
      value: 89,
      label: "博士及以上",
    },
  ];
  locationOptions = [];
  get defaultLocation() {
    let userInfo = this.PageStore.UserInfo;
    return userInfo.countryId == 1
      ? [9999]
      : [userInfo.countryId, userInfo.provinceId, userInfo.cityId];
  }

  onMapValues = new Map([
    [
      "country",
      (item) => {
        return {
          value: item.country_id,
          label: item.country_name,
          isLeaf: item.country_id !== 1,
        };
      },
    ],
    [
      "province",
      (item) => {
        return {
          value: item.id,
          label: item.provincial,
          isLeaf: false,
        };
      },
    ],
    [
      "city",
      (item) => {
        return {
          value: item.id,
          label: item.city,
          isLeaf: true,
        };
      },
    ],
  ]);

  onGetLabel(key, options) {
    return options.find((item) => item.value === key)["label"];
  }

  /**
   * 地区级联加载方法
   */
  async lodationLoadData(selectedOptions) {
    const targetLevel = selectedOptions.length;
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    let actions = new Map<any, any>([
      // [级联级别, [获取数据方法, 循环数据方法key]]
      [1, ["onGetProvince", "province"]],
      [2, ["onGetCity", "city"]],
    ]);
    let action = actions.get(targetLevel);
    console.log("PageView -> lodationLoadData -> action", action);
    const res = await this.PageStore[action[0]](targetOption.value);
    targetOption.children = lodash.map(res, this.onMapValues.get(action[1]));
    targetOption.loading = false;
    this.locationOptions = [...this.locationOptions];
  }

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
  onChange() {}
  /**
   * input取消焦点 更新nickname
   */
  async onBlur() {
    try {
      if (this.nickName.trim() == "") {
        this.nickName = this.PageStore.UserInfo.nickName;
        this.inputVisible = false;
        return;
      }
      await this.PageStore.onUpdateNickName(this.nickName);
      this.inputVisible = false;
    } catch (error) {
      this.$message.warning({ content: error, key: "onUpdateNickName" });
    }
  }
  async onSubmit() {
    try {
      this.userForm.industry = this.onGetLabel(
        this.userForm.industryId,
        this.industryList
      );
      this.userForm.education = this.onGetLabel(
        this.userForm.educationId,
        this.educationList
      );
      this.userForm.career = this.onGetLabel(
        this.userForm.careerId,
        this.jobList
      );
      await this.PageStore.onUpdateUserInfo(this.userForm);
      this.$message.success({
        content: "保存成功",
        key: "onUpdateUserInfo",
      });
    } catch (error) {}
  }
  async created() {
    // 加载国家数据
    const res = await this.PageStore.onGetCountry();
    this.locationOptions = lodash.map(res, this.onMapValues.get("country"));

    let userInfo = this.PageStore.UserInfo;
    if (userInfo.countryId == 1) {
      this.locationOptions.unshift({
        value: 9999,
        label: userInfo.location,
        isLeaf: true,
      });
      // this.locationOptions[0].children = [
      //   {
      //     value: userInfo.provinceId,
      //     label: "北京市66",
      //     isLeaf: false,
      //     children: [
      //       {
      //         value: userInfo.cityId,
      //         label: "北京市88",
      //         isLeaf: true,
      //       },
      //     ],
      //   },
      // ];
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
  &-save-warp {
    // display: flex;
    // justify-content: center;
  }
}
</style>
