<template>
  <a-card class="xt-view-task" :bordered="false" :loading="loading">
    <swiper class="swiper" ref="swiper" :options="swiperOption">
      <swiper-slide v-for="item in dataSource" :key="item.key">
        <img class="xt-view-task-img" alt="example" :src="item.src" />
      </swiper-slide>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
  </a-card>
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
  loading = true;
  swiperOption = {
    loop: true,
    autoplay: true,
    slidesPerView: 3,
    // spaceBetween: 30,
    direction: "horizontal",
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      dynamicBullets: true,
    },
    on: {
      resize: () => {
        // this.$refs.swiper.$swiper.changeDirection(
        //   window.innerWidth <= 960 ? "vertical" : "horizontal"
        // );
      },
    },
  };
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
        "https://cr-uat.xuantong.cn/iconimg/Four_stores.png",
      title: "暄桐教室",
      description: "description",
    },
    {
      key: 3,
      src:
        "https://oss-free.xuantong.cn/picturePath/f477ad5a4d829f8eb29eb89befc51486.jpg",
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
.xt-view-task {
  &-img {
    width: 100%;
    height: 330px;
  }
}
</style>