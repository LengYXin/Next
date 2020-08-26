<template>
  <a-card class="xt-view-task" :bordered="false" :loading="loading">
    <swiper class="swiper" ref="swiper" :options="swiperOption">
      <swiper-slide v-for="(item,index) in dataSource" :key="item.key">
        <div @click.prevent.stop="onViewer(index)">
          <xt-hover>
            <img class="xt-view-task-img" alt="example" :src="item.src" />
            <div slot="hover">
              <div class="xt-view-task-hover-title">{{ item.title }}</div>
              <div class="xt-view-task-hover-author">— {{ item.author }} —</div>
            </div>
          </xt-hover>
        </div>
      </swiper-slide>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
      <div class="xt-task-swiper-pagination" slot="pagination"></div>
    </swiper>
    <div v-viewer ref="viewer" v-show="false">
      <img v-for="item in dataSource" :key="item.key" :src="item.src" />
    </div>
  </a-card>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Context } from "@nuxt/types";
import { Observer } from "mobx-vue";
import Viewer from "viewerjs";
import lodash from "lodash";
@Component({
  components: {},
})
export default class PageView extends Vue {
  get viewer(): Viewer {
    return this.$refs.viewer["$viewer"];
  }
  loading = true;
  swiperOption = {
    loop: true,
    autoplay: true,
    watchOverflow: true,
    simulateTouch: true,
    slidesPerView: 3,
    // spaceBetween: 30,
    direction: "horizontal",
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".xt-task-swiper-pagination",
      // dynamicBullets: true,
      type: "bullets",
      bulletClass: "xt-bullet",
      bulletActiveClass: "xt-bullet-active",
      bulletElement: "li",
    },
    on: {
      init: () => {},
    },
  };
  dataSource = [
    {
      key: 1,
      src:
        "https://oss-free.xuantong.cn/picturePath/3695b652941242ae921f060cf15f8b39.jpg",
      title: "暄桐教室",
      author: "author",
    },
    {
      key: 2,
      src:
        "https://xuantong-upload-free.oss-cn-beijing.aliyuncs.com/picturePath/be30320195188b16accf8e4b9bc3e0b5.jpg?Expires=1884739916&OSSAccessKeyId=LTAI4FoTa7tgoQpv1j3SU8zZ&Signature=ZMdc6YaAjACI%2BypuzztUUfgQq%2BE%3D",
      title: "暄桐教室",
      author: "author",
    },
    {
      key: 3,
      src:
        "https://xuantong-upload-free.oss-cn-beijing.aliyuncs.com/picturePath/f87a7859c73bed85115069f4d21b1176.jpg?Expires=1884677705&OSSAccessKeyId=LTAI4FoTa7tgoQpv1j3SU8zZ&Signature=V3S9FTlpMtTkommyNhT0ZU8E%2BcQ%3D",
      title: "暄桐教室",
      author: "author",
    },
    {
      key: 4,
      src:
        "https://xuantong-upload-free.oss-cn-beijing.aliyuncs.com/picturePath/f87a7859c73bed85115069f4d21b1176.jpg?Expires=1884677705&OSSAccessKeyId=LTAI4FoTa7tgoQpv1j3SU8zZ&Signature=V3S9FTlpMtTkommyNhT0ZU8E%2BcQ%3D",
      title: "暄桐教室",
      author: "author",
    },
    {
      key: 5,
      src:
        "https://xuantong-upload-free.oss-cn-beijing.aliyuncs.com/picturePath/f87a7859c73bed85115069f4d21b1176.jpg?Expires=1884677705&OSSAccessKeyId=LTAI4FoTa7tgoQpv1j3SU8zZ&Signature=V3S9FTlpMtTkommyNhT0ZU8E%2BcQ%3D",
      title: "暄桐教室",
      author: "author",
    },
  ];
  onViewer(index) {
    this.viewer.view(index);
    console.log(
      "LENG: PageView -> onViewer -> this.viewer",
      index,
      this.viewer
    );
  }
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
<style lang="less">
.xt-task-swiper-pagination {
  .xt-bullet {
    flex: 1;
    display: block;
    background-color: #cccccc;
    &-active {
      background-color: #087276;
    }
  }
}
</style>
<style lang="less" scoped>
.xt-view-task {
  .swiper-container {
    overflow-y: visible;
    overflow-x: visible;
    position: relative;
    box-sizing: border-box;
    &::before {
      content: " ";
      position: absolute;
      top: 0;
      left: 0;
      width: 33.33%;
      height: 100%;
      z-index: 2;
      background: rgba(0, 0, 0, 0.5);
    }
    &::after {
      content: " ";
      position: absolute;
      top: 0;
      right: 0;
      width: 33.33%;
      height: 100%;
      z-index: 2;
      background: rgba(0, 0, 0, 0.5);
    }
  }
  .swiper-button {
    &-prev {
      left: 15%;
      color: #ffffff;
    }
    &-next {
      right: 15%;
      color: #ffffff;
    }
  }
  .xt-task-swiper-pagination {
    position: absolute;
    text-align: center;
    transition: 300ms opacity;
    transform: translate3d(0, 30px, 0);
    z-index: 10;
    display: flex;

    margin-left: 33.33%;
    width: 33.33%;
    height: 3px;
    // bottom: 0;
    // transform: translateY(30px);
  }
  &-img {
    width: 100%;
    height: 330px;
    object-fit: cover;
  }
  &-hover-title {
    // margin-top: 135px;
    font-size: 36px;
    letter-spacing: 2px;
    font-weight: 400;
    text-align: center;
  }
  &-hover-author {
    text-align: center;
    margin-top: 20px;
    font-size: 14px;
  }
}
</style>