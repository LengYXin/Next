<template>
  <div>
    <div class="swiper">
      <swiper :options="swiperOptions" ref="mySwiper">
        <swiper-slide v-for="img in PageStore.Banners" :key="img.id">
          <img v-lazy="img.pictureUri" style="width:100%;min-height:400px" />
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <a-icon type="loading" style="font-size: 50px" />
    <a-icon type="exclamation-circle" style="font-size: 50px" />
    <a-icon type="check-circle" style="font-size: 50px" />
    <a-icon type="close-circle" style="font-size: 50px" />

    <a-spin>
      <a-icon slot="indicator" type="loading" style="font-size: 50px" spin />
      <logo />
      <h1 class="title">暄桐教室</h1>
      <h1 class="title" v-t="'tips.test'"></h1>
    </a-spin>
    <div style="height:999px">

    </div>
  </div>
</template>
<script lang="ts">
import Logo from "~/components/Logo.vue";
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import { Observer } from "mobx-vue";
import { Context } from "@nuxt/types";
@Observer
@Component({
  fetch(ctx: Context) {
    ctx.store.$storeHome.onGetBanners();
  },
  components: { Logo },
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
    // loop: true,
    autoplay: true,
    // allowTouchMove: false,
    // autoHeight: true,
    pagination: {
      el: ".swiper-pagination",
    },
  };
  created() {}
  mounted() {
  }
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scoped>
.swiper {
  max-height: 900px;
  overflow: hidden;
}
</style>
