<template>
  <a-card :bordered="false" :loading="loading">
    <a-row :gutter="16">
      <a-col v-bind="colProps" v-for="item in dataSource" :key="item.key">
        <a-card hoverable :bordered="false" class="hvr-grow-shadow">
          <img slot="cover" alt="example" v-lazy="item.src" />
          <a-card-meta>
            <template slot="title">
              <div
                class="xt-about-title xt-font-family-FZLTHJW"
                v-text="item.title"
              ></div>
            </template>
            <template slot="description">
              <div
                class="xt-about-description xt-font-family-FZLTHJW"
                v-text="item.description"
              ></div>
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
@Component({})
export default class PageView extends Vue {
  loading = true;
  colProps = { lg: 8 };
  dataSource = [
    {
      key: 1,
      src: "https://cr-uat.xuantong.cn/_nuxt/img/25dff69.png",
      title: "暄桐教室",
      description: "一间美育教室，以书法为起点，亲近中国传统之美，滋养当下生活",
    },
    {
      key: 2,
      src: "https://cr-uat.xuantong.cn/_nuxt/img/49fb57f.png",
      title: "林曦",
      description: "水墨画家，毕业于中央美术学院，暄桐教室的创办人与授课老师",
    },
    {
      key: 3,
      src: "https://cr-uat.xuantong.cn/_nuxt/img/88a9e60.png",
      title: "暄桐线上课",
      description: "为喜爱传统文化艺术的同好精心设置的线上教学系统",
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
.xt-about-title {
  margin-top: 15px;
  font-size: 20px;
  color: #3e3732;
  text-align: center;
}

.xt-about-description {
  padding: 12px 34px;
  line-height: 25px;
  font-size: 15px;
  color: #898989;
}
</style>