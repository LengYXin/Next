<template>
  <a-card class="xt-view-theWriter" :bordered="false" :loading="loading">
    <a-row class="xt-view-theWriter-box" :gutter="26">
      <a-col v-bind="colProps">
        <a-row>
          <a-col :span="11" class="xt-view-theWriter-warp">
            <h2 class="xt-view-theWriter-title">
              写字的人 | 做你自己，世界自然会供养你
            </h2>
            <div class="xt-view-theWriter-description">
              过年写对联的时候，我就给书房门上也写了一个印心的词：无忧。从此书房就有了一个名字：无忧小屋。
              躲到这样一个自己筑起来的小世界，暂且和外界的烦...
            </div>
            <a href="#" class="xt-view-theWriter-look">查看全文</a>
            <div class="xt-view-theWriter-date">2020.7.02</div>
          </a-col>
          <a-col :span="13">
            <img
              class="xt-view-theWriter-cover"
              alt="example"
              v-lazy="
                'https://oss-free.xuantong.cn/picturePath/dc4e7ca6ddf67eb508d791346290cc36.jpg'
              "
          /></a-col>
        </a-row>
      </a-col>
      <a-col v-bind="colProps">
        <a-card v-viewer class="xt-view-theWriter-card" :bordered="false">
          <a-card-grid
            :hoverable="false"
            class="xt-view-theWriter-card-grid"
            v-for="item in dataSource"
            :key="item.key"
          >
            <!-- <a href=""> -->
            <img
              class="xt-view-theWriter-card-img"
              alt="example"
              v-lazy="item.src"
            />
            <!-- </a> -->
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
        "https://oss-free.xuantong.cn/picturePath/c1239a907d9a711e77cff133cd7d7a2b.jpg",
      title: "暄桐教室",
      description: "description",
    },
    {
      key: 3,
      src:
        "https://oss-free.xuantong.cn/picturePath/2f6f1cf683b96e28abbbea443136bdde.jpg",
      title: "暄桐教室",
      description: "description",
    },
    {
      key: 4,
      src:
        "https://oss-free.xuantong.cn/picturePath/2179e7d7362922244c5e99288a2465d7.jpg",
      title: "暄桐教室",
      description: "description",
    },
    {
      key: 5,
      src:
        "https://oss-free.xuantong.cn/picturePath/20368a15e82f6ee3b7bccb1d4d1c2a28.jpg",
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
  margin-top: 60px;
  &-warp {
    height: 310px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-right: 18px;
  }
  &-title {
    font-size: 18px;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 400;
  }
  &-description {
    color: #99908c;
    line-height: 25px;
    font-size: 14px;
    letter-spacing: 1px;
  }
  &-look {
    color: #333;
    text-decoration: none;
  }
  &-date {
    font-size: 14px;
    color: #837b78;
  }

  &-cover {
    width: 100%;
    height: 310px;
  }
  &-card {
    // text-align: left;
    &-grid {
      padding: 0 0 24px;
      width: 33.33%;
      text-align: center;
      box-shadow: none;
    }
    &-img {
      width: 130px;
      height: 143px;
      margin: 0 auto;
    }
  }
}
</style>