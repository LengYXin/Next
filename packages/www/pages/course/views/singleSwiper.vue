/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-06 17:14:10
 * @modify date 2020-08-06 17:14:10
 * @desc 单阶课程
 */

<template>
  <div
    v-if="dataSource"
    class="xt-course-swiper"
    :class="`xt-swiper-button-${onShowPrev(dataSource.length)}`"
  >
    <swiper class="swiper" ref="swiper" :options="swiperOption">
      <swiper-slide class="swiper-slide" v-for="item in dataSource" :key="item.courseId">
        <nuxt-link class="xt-course-swiper-title" :to="`/course/${item.courseId}`">
          <div v-text="item.courseName"></div>
        </nuxt-link>
        <a-row type="flex">
          <a-col :flex="1">
            <span class="xt-course-swiper-price" v-money="item.courseFullPrice">价格</span>
          </a-col>
          <a-col :flex="1">
            <nuxt-link class="ant-btn ant-btn-link" :to="`/course/${item.courseId}`">
              <span>赠课</span>
            </nuxt-link>
            <!-- <a-button class="ant-btn-link" type="link">赠课</a-button> -->
            <a-divider class="ant-divider" type="vertical"></a-divider>
            <!-- <a-button class="ant-btn-link" type="link">立即报名</a-button> -->
            <nuxt-link class="ant-btn ant-btn-link" :to="`/course/${item.courseId}`">
              <span>立即报名</span>
            </nuxt-link>
          </a-col>
        </a-row>
      </swiper-slide>
      <!-- <div ref="prev" v-show="onShowPrev(dataSource.length)" class="swiper-button-prev" slot="button-prev"></div>
      <div ref="next" v-show="onShowPrev(dataSource.length)" class="swiper-button-next" slot="button-next"></div>-->
    </swiper>
    <div ref="prev" @click="onSwiper('slidePrev')" class="swiper-button-prev"></div>
    <div ref="next" @click="onSwiper('slideNext')" class="swiper-button-next"></div>
  </div>
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
  @Prop({}) dataSource;
  swiperOption = {
    slidesPerView: 4,
    spaceBetween: 30,
    direction: "horizontal",
    navigation: {
      // nextEl: this.$refs.prev,
      // prevEl: this.$refs.prev,
    },
    on: {
      resize: () => {
        // this.$refs.swiper.$swiper.changeDirection(
        //   window.innerWidth <= 960 ? "vertical" : "horizontal"
        // );
      },
    },
  };
  get swiper() {
    return (this.$refs.swiper as any).$swiper;
  }
  onShowPrev(length) {
    return length > this.swiperOption.slidesPerView;
  }
  onSwiper(key) {
    lodash.result(this.swiper, key);
  }
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scoped>
@left: 70px;
.xt-course-swiper {
  margin-top: 30px;
  position: relative;
  // .swiper {
  //   background: red;
  // }
  .swiper-slide {
    border-right: 1px solid @xt-yellow-6;
    &:last-child {
      border-right: none;
    }
  }
  .swiper-button-prev {
    left: -@left;
    display: none;
  }
  .swiper-button-next {
    right: -@left;
    display: none;
  }
  &.xt-swiper-button-true {
    .swiper-button-prev,
    .swiper-button-next {
      display: block;
    }
  }
  &-title {
    font-size: @font-size-md;
    color: @black;
    &:hover {
      color: @xt-green-6;
    }
  }
  &-price {
    color: @black;
    font-size: @font-size-md;
    line-height: 32px;
  }
  .ant-btn-link {
    color: @black;
    padding: 0;
    opacity: 0.6;
    &:hover {
      color: @xt-green-6;
    }
  }
  .ant-divider {
    margin: 0 2px;
    opacity: 0.6;
    background: @black;
  }
}
</style>
<style lang="less" >
// 不够滚动的居中
.xt-swiper-button-false {
  .swiper-wrapper {
    justify-content: center;
  }
}
</style>