<template>
  <a-card class="xt-view-theWriter" :bordered="false" :loading="loading">
    <a-row :gutter="16">
      <a-col v-bind="colProps">
        <img
          class="xt-view-theWriter-cover"
          alt="example"
          v-lazy="'https://oss-free.xuantong.cn/picturePath/dc4e7ca6ddf67eb508d791346290cc36.jpg'"
        />
      </a-col>
      <a-col v-bind="colProps">
        <a-card class="xt-view-theWriter-card">
          <a-card-grid
            style="width:33.33%;text-align:center"
            v-for="item in dataSource"
            :key="item.key"
          >
            <img alt="example" style="width:100%;" v-lazy="item.src" />
          </a-card-grid>
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
  colProps = { lg: 12 };
  dataSource = [
    {
      key: 1,
      src:
        "https://xuantong-upload-free.oss-cn-beijing.aliyuncs.com/picturePath/e452e2b4cbcd97bbf2fd03596de5c0b2.jpg?Expires=1886498699&OSSAccessKeyId=LTAI4FoTa7tgoQpv1j3SU8zZ&Signature=jJsL7uInZhqurZMW89Is%2Bt18E04%3D",
      title: "暄桐教室",
      description: "description",
    },
    {
      key: 2,
      src:
        "https://xuantong-upload-free.oss-cn-beijing.aliyuncs.com/picturePath/e452e2b4cbcd97bbf2fd03596de5c0b2.jpg?Expires=1886498699&OSSAccessKeyId=LTAI4FoTa7tgoQpv1j3SU8zZ&Signature=jJsL7uInZhqurZMW89Is%2Bt18E04%3D",
      title: "暄桐教室",
      description: "description",
    },
    {
      key: 3,
      src:
        "https://xuantong-upload-free.oss-cn-beijing.aliyuncs.com/picturePath/e452e2b4cbcd97bbf2fd03596de5c0b2.jpg?Expires=1886498699&OSSAccessKeyId=LTAI4FoTa7tgoQpv1j3SU8zZ&Signature=jJsL7uInZhqurZMW89Is%2Bt18E04%3D",
      title: "暄桐教室",
      description: "description",
    },
    {
      key: 4,
      src:
        "https://xuantong-upload-free.oss-cn-beijing.aliyuncs.com/picturePath/e452e2b4cbcd97bbf2fd03596de5c0b2.jpg?Expires=1886498699&OSSAccessKeyId=LTAI4FoTa7tgoQpv1j3SU8zZ&Signature=jJsL7uInZhqurZMW89Is%2Bt18E04%3D",
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
.xt-view-theWriter {
  &-cover {
    max-height: 310px;
  }
}
</style>