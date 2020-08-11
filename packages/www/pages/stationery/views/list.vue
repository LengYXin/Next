/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:17:47
 * @modify date 2020-08-05 14:17:47
 * @desc [description]
 */
<template>
  <a-spin :spinning="loading">
    <a-row :gutter="16">
      <transition-group name="opacity">
        <a-col v-for="item in dataSource" :key="item.commodityId" v-bind="bindCol">
          <a-card class="xt-stationery-card" :bordered="false">
            <xt-hover>
              <img class="xt-stationery-img" v-lazy="item.commodityCoverUrl" />
              <template #hover>
                <span v-text="item.commodityName"></span>
                <span v-money="item.commodityPrice"></span>
                <a :href="item.commodityUrl" target="_blank">
                  <a-button type="orange">购买</a-button>
                </a>
              </template>
            </xt-hover>
          </a-card>
        </a-col>
      </transition-group>
    </a-row>
  </a-spin>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Context } from "@nuxt/types";
import { Observer } from "mobx-vue";
import lodash from "lodash";
@Component({
  components: {},
})
export default class PageView extends Vue {
  @Prop({ default: true }) loading;
  @Prop({ default: [] }) dataSource;
  bindCol = {
    lg: 6,
    md: 8,
    sm: 12,
    xs: 24,
  };
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" >
.xt-stationery {
  &-card {
    .ant-card-body {
      padding: 20px 0;
    }
  }
  &-img {
    width: 230px;
    height: 230px;
    display: block;
    margin: auto;
  }
}
</style>