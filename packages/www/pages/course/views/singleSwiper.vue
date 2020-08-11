/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-06 17:14:10
 * @modify date 2020-08-06 17:14:10
 * @desc 单阶课程
 */

<template>
  <swiper class="swiper" ref="swiper" :options="swiperOption">
    <swiper-slide v-for="item in dataSource" :key="item.courseId">
      <a-card>
        <div v-text="item.courseName"></div>
        <a-card-grid style="width:50%;">
          <div v-money="item.courseFullPrice"></div>
        </a-card-grid>
        <a-card-grid style="width:50%;">
          <div>按钮</div>
        </a-card-grid>
      </a-card>
    </swiper-slide>
    <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
  </swiper>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import lodash from "lodash";
import { Observer } from "mobx-vue";
import { Context } from "@nuxt/types";
import Signup from "./signup.vue";
@Component({
  components: { Signup },
})
export default class PageView extends Vue {
  @Prop({ default: [] }) dataSource;
  swiperOption = {
    slidesPerView: 3,
    spaceBetween: 30,
    direction: "horizontal",
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    on: {
      resize: () => {
        // this.$refs.swiper.$swiper.changeDirection(
        //   window.innerWidth <= 960 ? "vertical" : "horizontal"
        // );
      },
    },
  };
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scoped>
</style>