<template>
  <a-card class="xt-view-stationery" :bordered="false" :loading="loading">
    <img
      class="xt-view-stationery-cover"
      slot="cover"
      alt="example"
      v-lazy="'https://cr-uat.xuantong.cn/iconimg/Four_stores.png'"
    />
    <a-row :gutter="16">
      <a-col v-bind="colProps" v-for="item in dataSource" :key="item.key">
        <a-card hoverable class="xt-view-stationery-card">
          <img slot="cover" alt="example" v-lazy="item.src" />
          <!-- <a-card-meta :title="item.title">
            <template slot="description">
              <span v-text="item.description"></span>
            </template>
          </a-card-meta>-->
        </a-card>
      </a-col>
    </a-row>
  </a-card>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Context } from "@nuxt/types";
import { Observer } from "mobx-vue";
import lodash from "lodash";
@Component({
})
export default class PageView extends Vue {
  loading = true;
  colProps = { lg: 6 };
  dataSource = [
    {
      key: 1,
      src: "https://cr-uat.xuantong.cn/iconimg/Four_stores.png",
      title: "暄桐教室",
      description: "description",
    },
    {
      key: 2,
      src: "https://cr-uat.xuantong.cn/iconimg/Four_stores.png",
      title: "暄桐教室",
      description: "description",
    },
    {
      key: 3,
      src: "https://cr-uat.xuantong.cn/iconimg/Four_stores.png",
      title: "暄桐教室",
      description: "description",
    },
    {
      key: 4,
      src: "https://cr-uat.xuantong.cn/iconimg/Four_stores.png",
      title: "暄桐教室",
      description: "description",
    },
  ];
  created() {
    lodash.delay(() => {
      this.loading = false;
    }, 2000);
  }
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scoped>
.xt-view-stationery {
  &-cover {
    max-height: 310px;
  }
  &-card {
    height: 230px;
    img{
      height: 230px;
    }
  }
}
</style>