/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:17:41
 * @modify date 2020-08-05 14:17:41
 * @desc [description]
 */
<template>
  <div>
    <div class="xt-swiper">
      <swiper :options="swiperOptions" ref="mySwiper">
        <swiper-slide v-for="img in PageStore.Banners" :key="img.id">
          <img v-lazy="img.pictureUri" style="width:100%;min-height:400px" />
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
        <!-- <div class="swiper-button-prev" slot="button-prev"></div> -->
        <!-- <div class="swiper-button-next" slot="button-next"></div> -->
      </swiper>
    </div>
    <div class="xt-content">
      <a-card :bordered="false" :loading="true">
        <h1 class="xt-card-title" slot="title"><a-skeleton active :paragraph="false"/></h1>
        <div>课程</div>
      </a-card>
      <a-card :bordered="false" :loading="true">
        <h1 class="xt-card-title" slot="title"><a-skeleton active :paragraph="false"/></h1>
        <div>课程</div>
      </a-card>
      <a-card :bordered="false" :loading="true">
        <h1 class="xt-card-title" slot="title"><a-skeleton active :paragraph="false"/></h1>
        <div>课程</div>
      </a-card>
      <a-card :bordered="false" :loading="true">
        <h1 class="xt-card-title" slot="title"><a-skeleton active :paragraph="false"/></h1>
        <div>课程</div>
      </a-card>
    </div>
    <!-- <div style="height:999px">
      <xt-dplayer/>
    </div> -->
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import { Observer } from "mobx-vue";
import { Context } from "@nuxt/types";
@Observer
@Component({
  fetch(ctx: Context) {
    ctx.store.$storeHome.onGetBanners();
  },
  components: {},
})
export default class PageView extends Vue {
  get PageStore() {
    return this.$store.$storeHome;
  }
  get swiper() {
    // this.$locales
    return (this.$refs.mySwiper as any).$swiper;
  }
  swiperOptions = {
    loop: true,
    autoplay: true,
    // allowTouchMove: false,
    autoHeight: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      dynamicBullets: true,
    },
  };
  created() {}
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scoped>
.xt-swiper {
  position: relative;
  overflow: hidden;
}
.xt-card-title {
  text-align: center;
}
</style>
