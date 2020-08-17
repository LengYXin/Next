<template>
  <a-card :bordered="false" :loading="loading">
    <a-row :gutter="16">
      <a-col v-bind="colProps" v-for="item in dataSource" :key="item.key">
        <a-card hoverable>
          <img slot="cover" alt="example" v-lazy="item.src" />
          <a-card-meta :title="item.title">
            <template slot="description">
              <span v-text="item.description"></span>
            </template>
          </a-card-meta>
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
  colProps = { lg: 8 };
  dataSource = [
    {
      key: 1,
      src: "https://cr-uat.xuantong.cn/_nuxt/img/25dff69.png",
      title: "暄桐教室",
      description: "description",
    },
    {
      key: 2,
      src: "https://cr-uat.xuantong.cn/_nuxt/img/49fb57f.png",
      title: "暄桐教室",
      description: "description",
    },
    {
      key: 3,
      src: "https://cr-uat.xuantong.cn/_nuxt/img/88a9e60.png",
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
</style>