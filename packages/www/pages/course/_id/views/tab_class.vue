/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:02:27
 * @modify date 2020-08-05 14:02:27
 * @desc 去上课
 */
<template>
  <div class="xt-course-class xt-flex-center">
    <div class="xt-course-class-map" :class="template">
      <!-- 背景 -->
      <img :src="bgSrc" alt srcset :class="template" />
      <!-- 课程信息 -->
      <div
        v-for="(item,index) in PageStore.mapList"
        :key="item.classhourId"
        :class="'index-'+index"
        class="xt-course-class-info"
      >
        <a-row type="flex">
          <!-- 序号 -->
          <a-col :span="24" :order="1" flex="auto">
            <div class="xt-course-class-tag" v-text="index"></div>
          </a-col>
          <!-- 图片 笔山 -->
          <a-col :span="24" :order="2">
            <div class="xt-course-class-img">
              <a-popover placement="rightTop">
                <template slot="content">
                  <h5 v-text="item.classhourName"></h5>
                </template>
                <img :src="item.copyBookUri" />
              </a-popover>
              <ul class="xt-course-class-bs">
                <li v-for="bs in 4" :key="bs">
                  <a-popover placement="rightTop">
                    <template slot="content">
                      <p>观看直播</p>
                    </template>
                    <a-icon type="check-circle" />
                  </a-popover>
                </li>
              </ul>
            </div>
          </a-col>
          <!-- 状态 -->
          <a-col :span="24" :order="3" flex="auto" class="xt-course-class-state">
            <span>直播中</span>
          </a-col>
        </a-row>
      </div>
      <div class="xt-course-class-review">
        <div>
          <img
            src="https://xuantong-upload-free.oss-cn-beijing.aliyuncs.com/picturePath/568feec434929a669ff4bfe75326c28a.jpeg"
            alt
            srcset
          />
        </div>
        <div>学习回顾</div>
      </div>
      <div class="xt-text-align-right xt-text-yellow">您可以在北京时间2020年09月17日24时之前提交作业和将作业发布到“晒作业”与大家分享</div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import { Modal } from "ant-design-vue";
import { Observer } from "mobx-vue";

@Observer
@Component({
  components: {},
})
export default class PageView extends Vue {
  get id() {
    return this.$route.params.id;
  }
  get Details() {
    return this.$store.$storeCourse.Details;
  }
  get PageStore() {
    return this.$store.$storeCourse.Details.Map;
  }
  get template() {
    return "xt-cc-template-" + this.Details.dataSource.tempNum;
  }
  get bgSrc() {
    return `/template/${this.Details.dataSource.tempNum}.png`;
  }
  onLoading() {
    this.PageStore.onLoading({ courseId: this.id });
  }
  created() {
    this.onLoading();
    
  }
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scoped>
@translateX: 5px;
@tag: 23px;
@img: 75px;
.xt-course-class {
  &-map {
    position: relative;
    // background: rgba(0, 0, 0, 0.2);
    animation: antFadeIn 0.6s;
    > img {
      display: block;
      padding: 0;
      margin: 0;
      &.xt-cc-template-10 {
        padding-bottom: 120px;
      }
    }
  }
  // 信息
  &-info {
    // background: rgba(255, 0, 0, 0.05);
    display: inline-block;
    position: absolute;
    left: 0;
    z-index: 10;
    animation: antFadeIn 0.6s;
    width: 140px;
  }
  // 学习回顾
  &-review {
    display: inline-block;
    position: absolute;
    left: 0;
    z-index: 10;
    img {
      width: @img;
      height: @img;
    }
  }
  // 标记
  &-tag {
    width: @tag;
    height: @tag;
    background: red;
    margin: auto;
    border-radius: 100%;
    text-align: center;
  }

  // 图片
  &-img {
    display: flex;
    justify-content: center;
    padding: @padding-sm 0;
    position: relative;
    cursor: pointer;
    img {
      width: @img;
      height: @img;
    }
  }

  // 笔山
  &-bs {
    position: absolute;
    list-style: none;
    padding: 0%;
    right: 10px;
    // transform: translateX(@translateX);
  }
  &-state {
    text-align: center;
  }
}
</style>
<style lang="less" scoped>
// 3 节课模板
.xt-cc-template-3 {
  .xt-course-class-info {
    &.index-0 {
      top: 200px;
      left: 35px;
    }
    &.index-1 {
      top: 70px;
      left: 325px;
    }
    &.index-2 {
      top: 240px;
      left: 610px;
    }
    &.index-3 {
      top: 50px;
      left: 750px;
    }
    &.index-4 {
      top: 85px;
      left: 910px;
    }
  }
  .xt-course-class-review {
    top: 140px;
    left: 1050px;
  }
}
</style>
<style lang="less" scoped>
// 5 节课模板
.xt-cc-template-5 {
  .xt-course-class-info {
    &.index-0 {
      top: 330px;
      left: 100px;
    }
    &.index-1 {
      top: 310px;
      left: 280px;
    }
    &.index-2 {
      top: 260px;
      left: 470px;
    }
    &.index-3 {
      top: 170px;
      left: 700px;
    }
    &.index-4 {
      top: 260px;
      left: 900px;
    }
    &.index-5 {
      top: 300px;
      left: 1110px;
    }
    &.index-6 {
      top: 280px;
      left: 1200px;
    }
  }
  .xt-course-class-review {
    top: 340px;
    left: 1060px;
  }
}
</style>
<style lang="less" scoped>
// 10 节课模板
.xt-cc-template-10 {
  margin-top: 90px;
  .xt-course-class-info {
    &.index-0 {
      top: 210px;
      left: 355px;
    }
    &.index-1 {
      top: 130px;
      left: 140px;
    }
    &.index-2 {
      top: 80px;
      left: 365px;
    }
    &.index-3 {
      top: 10px;
      left: 540px;
    }
    &.index-4 {
      top: 10px;
      left: 865px;
    }
    &.index-5 {
      top: 150px;
      left: 1030px;
    }
    &.index-6 {
      top: 470px;
      left: 1005px;
    }
    &.index-7 {
      top: 480px;
      left: 666px;
    }
    &.index-8 {
      top: 460px;
      left: 435px;
    }
    &.index-9 {
      top: 410px;
      left: 200px;
    }
    &.index-10 {
      top: 570px;
      left: -18px;
    }
    &.index-11 {
      top: 400px;
      left: -130px;
    }
  }
  .xt-course-class-review {
    top: 230px;
    left: 10px;
  }
}
</style>
<style lang="less" scoped>
// 20 节课模板
.xt-cc-template-20 {
  margin-top: 120px;
  .xt-course-class-info {
    &.index-0 {
      top: -60px;
      left: 0px;
    }
    &.index-1 {
      top: 45px;
      left: 260px;
    }
    &.index-2 {
      top: 138px;
      left: 400px;
    }
    &.index-3 {
      top: -70px;
      left: 525px;
    }
    &.index-4 {
      top: 102px;
      left: 664px;
    }
    &.index-5 {
      top: -70px;
      left: 800px;
    }
    &.index-6 {
      top: 66px;
      left: 960px;
    }
    &.index-7 {
      top: 187px;
      left: 973px;
    }
    &.index-8 {
      top: 330px;
      left: 774px;
    }
    &.index-9 {
      top: 330px;
      left: 610px;
    }
    &.index-10 {
      top: 308px;
      left: 450px;
    }
    &.index-11 {
      top: 300px;
      left: 300px;
    }
    &.index-12 {
      top: 300px;
      left: 200px;
    }
    &.index-13 {
      top: 210px;
      left: 70px;
    }
    &.index-14 {
      top: 310px;
      left: 0px;
    }
    &.index-15 {
      top: 610px;
      left: 40px;
    }
    &.index-16 {
      top: 630px;
      left: 210px;
    }
    &.index-17 {
      top: 585px;
      left: 340px;
    }
    &.index-18 {
      top: 540px;
      left: 470px;
    }
    &.index-19 {
      top: 525px;
      left: 590px;
    }
    &.index-20 {
      top: 540px;
      left: 700px;
    }
    &.index-21 {
      top: 640px;
      left: 875px;
    }
  }
  .xt-course-class-review {
    top: 500px;
    left: 1050px;
  }
}
</style>