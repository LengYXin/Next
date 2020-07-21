<template>
  <div>
    <div class="swiper">
      <swiper :options="swiperOptions" ref="mySwiper">
        <swiper-slide v-for="img in imgs" :key="img.id">
          <img v-lazy="img.pictureUri" style="width:100%;min-height:400px" />
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
    <a-spin>
      <a-icon slot="indicator" type="loading" style="font-size: 50px" spin />
      <logo />
      <h1 class="title">暄桐教室</h1>
    </a-spin>
  </div>
</template>
<script lang="ts">
import Logo from "~/components/Logo.vue";
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import { Modal } from "ant-design-vue";
@Component({
  components: { Logo }
})
export default class PageView extends Vue {
  // PageStore = new PageStore();
  get swiper() {
    return (this.$refs.mySwiper as any).$swiper;
  }
  swiperOptions = {
    // loop: true,
    autoplay: true,
    // allowTouchMove: false,
    // autoHeight: true,
    pagination: {
      el: ".swiper-pagination"
    }
  };
  imgs = [];
  async carouselimg() {
    interface imgs {
      id: string;
      pictureJumpUrl: string;
      pictureUri: string;
    }
    const res = await this.$ajax.post<Array<imgs>>("/api/carouselimg/list");
    // console.log("LENG: PageView -> carouselimg -> res", res);
    this.imgs = res;
  }
  mounted() {
    this.carouselimg();
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
