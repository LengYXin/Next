<template>
  <a-card class="xt-view-stationery" :bordered="false" :loading="loading">
    <img
      class="xt-view-stationery-cover hvr-grow-shadow"
      slot="cover"
      alt="example"
      v-lazy="'https://cr-uat.xuantong.cn/iconimg/Four_stores.png'"
    />
    <a-row :gutter="16" class="xt-view-stationery-warp">
      <a-col v-bind="colProps" v-for="item in dataSource" :key="item.key">
        <a-card hoverable class="xt-view-stationery-card hvr-grow-shadow">
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
@Component({})
export default class PageView extends Vue {
  loading = true;
  colProps = { lg: 6 };
  dataSource = [
    {
      key: 1,
      src: "https://xuantong-upload-free.oss-cn-beijing.aliyuncs.com/thumbPath/653765e4ccc6fe11f3eeb41483e98863.jpg?Expires=1886065235&OSSAccessKeyId=LTAI4FoTa7tgoQpv1j3SU8zZ&Signature=e0ULPboXaLrA6U6Hgk%2F7fkb5XC8%3D",
      title: "暄桐教室",
      description: "description",
    },
    {
      key: 2,
      src: "https://oss-free.xuantong.cn/thumbPath/b67081a30af227494bffe5c4e52aee1e.jpg",
      title: "暄桐教室",
      description: "description",
    },
    {
      key: 3,
      src: "https://xuantong-upload-free.oss-cn-beijing.aliyuncs.com/thumbPath/40390738534d5e9e54f91de9ec75b796.jpg?Expires=1886065446&OSSAccessKeyId=LTAI4FoTa7tgoQpv1j3SU8zZ&Signature=4FPTvxeoDGPlGQPbMhFFRY%2FhOT8%3D",
      title: "暄桐教室",
      description: "description",
    },
    {
      key: 4,
      src: "https://xuantong-upload-free.oss-cn-beijing.aliyuncs.com/thumbPath/4ccefa0ab4d3302d4e983c6ed59e95be.jpg?Expires=1886066808&OSSAccessKeyId=LTAI4FoTa7tgoQpv1j3SU8zZ&Signature=bvv0L8HWkRVaXylE%2B38jqi%2FIAJM%3D",
      title: "暄桐教室",
      description: "description",
    },
  ];
  created() {
    // lodash.delay(() => {
      this.loading = false;
    // }, 2000);
  }
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scoped>
.xt-view-stationery {
  margin-top: 60px;
  &-warp {
    margin-top: 27px;
  }
  &-cover {
    max-height: 310px;
  }
  &-card {
    height: 230px;
    img {
      height: 230px;
    }
  }
}
</style>