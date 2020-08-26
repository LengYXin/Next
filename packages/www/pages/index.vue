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
      <swiper :options="swiperOptions" ref="mySwiper">
        <swiper-slide v-for="img in PageStore.Banners" :key="img.id">
          <img :src="img.pictureUri" style="width: 100%;" />
        </swiper-slide>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
        <div class="xt-home-swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <xt-template v-for="item in templates" :key="item.template" v-bind="item">
      <component :is="item.template"></component>
    </xt-template>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import { Observer } from "mobx-vue";
import { Context } from "@nuxt/types";
import XtTemplate from "./views/template.vue";
import summer from "./views/summer.vue";
import fullOrder from "./views/fullOrder.vue";
import write from "./views/write.vue";
import xtVideo from "./views/video.vue";
import about from "./views/about.vue";
import task from "./views/task.vue";
import theWriter from "./views/theWriter.vue";
import stationery from "./views/stationery.vue";
@Observer
@Component({
  name: "PageIndex",
  fetch(ctx: Context) {
    ctx.store.$storeHome.onGetBanners();
  },
  components: {
    XtTemplate,
    summer,
    fullOrder,
    write,
    xtVideo,
    about,
    task,
    theWriter,
    stationery,
  },
})
export default class PageIndex extends Vue {
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
    direction: "horizontal",
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".xt-home-swiper-pagination",
      dynamicBullets: true,
    },
  };
  templates = [
    {
      title: "写字课",
      subTitle: "欣赏、读书、技法于一体，深入学习颜真卿",
      footerText: "查看课程",
      linkTo: { name: "course-id", params: { id: 1 } },
      template: "summer",
      background: "#F7F3F0",
    },
    {
      title: "写字课",
      titleColor: "#087276",
      subTitle: "以一支毛笔，开启中国传统文化的大门，从书法之美到生活之美",
      template: "fullOrder",
      background: "#FFFDF9",
    },
    {
      title: "写字课进阶",
      subTitle: "以静定，滋养身和心",
      footerText: "查看课程",
      linkTo: { name: "course-id", params: { id: 1 } },
      template: "write",
      background: "#FFFDF9",
    },
    {
      title: "视频分享",
      titleColor: "#000",
      subTitle: "好看的，智慧的，滋养的",
      footerText: "查看所有",
      linkTo: { name: "video" },
      template: "xtVideo",
      background: "#FFFDF9",
    },
    {
      title: "教室与老师",
      titleColor: "#000",
      subTitle: "一间关于美的教室，以传统文化与技艺，滋养当下生活",
      footerText: "查看更多",
      linkTo: { name: "about", query: { active: 3 } },
      template: "about",
      background: "#FFFDF9",
    },
    {
      title: "同学作业分享",
      titleColor: "#000",
      subTitle: "从第一笔至今，每一步都踏实",
      footerText: "查看更多",
      linkTo: { name: "about" },
      template: "task",
      isContent: false,
      background: "#FFFDF9",
    },
    {
      title: "写字的人",
      titleColor: "#000",
      subTitle: "他们有各自的样子，恰好都爱写字",
      footerText: "查看更多",
      linkTo: { name: "about" },
      template: "theWriter",
      background: "#FFFDF9",
    },
    {
      title: "暄桐文房",
      titleColor: "#087276",
      footerColor: "#087276",
      subTitle: "笔砚精良，人生一乐",
      footerText: "进入暄桐文房",
      linkTo: { name: "stationery" },
      template: "stationery",
      background: "#FFFDF9",
    },
  ];
  created() {}
  mounted() {
    console.log("LENG: PageView -> mounted -> this", this);
  }
  updated() {}
  destroyed() {}
}
</script>
<style lang="less">
.xt-home-swiper-pagination {
  position: absolute;
  text-align: center;
  transition: 300ms opacity;
  transform: translate3d(0, 0, 0);
  z-index: 10;
  .swiper-pagination-bullet-active {
    background: #ffffff;
  }
}
</style>

<style lang="less" scoped>
.swiper-button {
  &-prev {
    color: #ffffff;
  }
  &-next {
    color: #ffffff;
  }
}
</style>