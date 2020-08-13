/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:17:41
 * @modify date 2020-08-05 14:17:41
 * @desc [description]
 */
<template>
  <div class="xt-home">
    <div class="xt-swiper">
      <swiper :options="swiperOptions" ref="mySwiper" :style="{minHeight:swiperOptions.minHeight}">
        <swiper-slide v-for="img in PageStore.Banners" :key="img.id">
          <img :src="img.pictureUri" style="width:100%;" />
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
        <!-- <div class="swiper-button-prev" slot="button-prev"></div> -->
        <!-- <div class="swiper-button-next" slot="button-next"></div> -->
      </swiper>
    </div>
    <xt-template title="写字课" subTitle="欣赏、读书、技法于一体，深入学习颜真卿">
      <a-card :bordered="false" :loading="true">
        <h1 class="xt-card-title" slot="title">
          <a-skeleton active :paragraph="false" />
        </h1>
        <div>课程</div>
      </a-card>
    </xt-template>
    <xt-template title="写字课" titleColor="#087276" subTitle="以一支毛笔，开启中国传统文化的大门，从书法之美到生活之美">
      <a-card :bordered="false" :loading="true">
        <h1 class="xt-card-title" slot="title">
          <a-skeleton active :paragraph="false" />
        </h1>
        <div>课程</div>
      </a-card>
    </xt-template>
    <xt-template title="写字课进阶" subTitle="以静定，滋养身和心">
      <a-card :bordered="false" :loading="true">
        <h1 class="xt-card-title" slot="title">
          <a-skeleton active :paragraph="false" />
        </h1>
        <div>课程</div>
      </a-card>
    </xt-template>
    <xt-template
      title="视频分享"
      titleColor="#000"
      subTitle="好看的，智慧的，滋养的"
      footerText="查看所有"
      :footerTo="{name:'video'}"
    >
      <a-card :bordered="false" :loading="true">
        <h1 class="xt-card-title" slot="title">
          <a-skeleton active :paragraph="false" />
        </h1>
        <div>课程</div>
      </a-card>
    </xt-template>
    <xt-template
      title="教室与老师"
      titleColor="#000"
      subTitle="一间关于美的教室，以传统文化与技艺，滋养当下生活"
      footerText="查看更多"
      :footerTo="{name:'about'}"
    >
      <a-card :bordered="false" :loading="true">
        <h1 class="xt-card-title" slot="title">
          <a-skeleton active :paragraph="false" />
        </h1>
        <div>课程</div>
      </a-card>
    </xt-template>
    <xt-template title="同学作业分享" titleColor="#000" subTitle="从第一笔至今，每一步都踏实" footerText="查看更多">
      <a-card :bordered="false" :loading="true">
        <h1 class="xt-card-title" slot="title">
          <a-skeleton active :paragraph="false" />
        </h1>
        <div>课程</div>
      </a-card>
    </xt-template>
    <xt-template title="写字的人" titleColor="#000" subTitle="他们有各自的样子，恰好都爱写字" footerText="查看更多">
      <a-card :bordered="false" :loading="true">
        <h1 class="xt-card-title" slot="title">
          <a-skeleton active :paragraph="false" />
        </h1>
        <div>课程</div>
      </a-card>
    </xt-template>
    <xt-template
      title="暄桐文房"
      titleColor="#087276"
      subTitle="笔砚精良，人生一乐"
      footerText="进入暄桐文房"
      :footerTo="{name:'stationery'}"
    >
      <a-card :bordered="false" :loading="true">
        <h1 class="xt-card-title" slot="title">
          <a-skeleton active :paragraph="false" />
        </h1>
        <div>课程</div>
      </a-card>
    </xt-template>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import { Observer } from "mobx-vue";
import { Context } from "@nuxt/types";
import XtTemplate from "./views/template.vue";
@Observer
@Component({
  fetch(ctx: Context) {
    ctx.store.$storeHome.onGetBanners();
  },
  components: {
    XtTemplate,
  },
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
    minHeight: "400px",
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
.xt-home {
  padding-bottom: @padding-xs;
}
.xt-swiper {
  position: relative;
  overflow: hidden;
  // max-width: 1920px;
  margin: auto;
}
.xt-card-title {
  text-align: center;
}
</style>
