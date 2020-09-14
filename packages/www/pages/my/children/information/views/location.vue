<!--
 * @Author: Erlin
 * @CreateTime: 2020-09-14 17:40:29
 * @LastEditors: Erlin
 * @LastEditTime: 2020-09-14 20:15:07
 * @Description: 地区联动选择
-->

<template>
  <Cascader
    :allowClear="false"
    :defaultValue="defaultLocation"
    :options="locationOptions"
    :load-data="lodationLoadData"
    placeholder="请选择地区"
    change-on-select
    @change="onChange"
  />
</template>

<script lang="ts">
import lodash from "lodash";
import moment from "moment";
import { Component, Prop, Vue, Ref } from "vue-property-decorator";
import { Observer } from "mobx-vue";
import { Cascader } from "ant-design-vue";

@Observer
@Component({
  scrollToTop: true,
  components: { Cascader },
})
export default class PageView extends Vue {
  // @Prop({ default: {} }) dataSource;
  get PageStore() {
    return this.$store.$storeUser;
  }
  locationOptions = [];
  get defaultLocation() {
    let userInfo = this.PageStore.UserInfo;
    return userInfo.countryId == 1
      ? [9999]
      : [userInfo.countryId, userInfo.provinceId, userInfo.cityId];
  }
  onChange(value, selectedOptions) {
    this.$emit("change", value);
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

  // onGetLabel(key, options) {
  //   return options.find((item) => item.value === key)["label"];
  // }

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
    const res = await this.PageStore[action[0]](targetOption.value);
    targetOption.children = lodash.map(res, this.onMapValues.get(action[1]));
    targetOption.loading = false;
    this.locationOptions = [...this.locationOptions];
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
    }
  }
}
</script>

<style>
</style>