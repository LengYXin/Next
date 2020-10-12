/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:02:27
 * @modify date 2020-08-05 14:02:27
 * @desc 去上课
 */
<template>
  <div class="xt-course-class xt-content">
    <div class="xt-course-class-map" :class="template">
      <!-- 背景 -->
      <!-- <img :src="bgSrc" alt srcset :class="template" /> -->
      <!-- 课程信息 -->
      <template v-if="!PageStore.loading">
        <div
          v-for="(item, index) in getMapList(PageStore.mapList)"
          :key="item.classhourId"
          :class="'index-' + index"
          class="xt-course-class-info"
        >
          <div class="xt-course-class-info-box">
            <van-row type="flex">
              <van-col span="20">
                <time v-dateFormat="item.courseStartTime" format="YYYY-MM-DD" />
              </van-col>
              <van-col span="4">
                <div class="xt-course-class-info-badge" v-text="index + 1" />
                <van-image
                  class="xt-course-class-info-image"
                  lazy-load
                  :src="item.copyBookUri"
                />
              </van-col>
            </van-row>
            <div class="xt-course-class-info-des">
              <h5
                class="xt-margin-none xt-text-yellow van-ellipsis"
                v-text="item.classhourName"
              ></h5>
              <div v-text="item.classhourIntroduction" class="van-ellipsis" />
            </div>
          </div>
        </div>
        <!-- 学习回顾 -->
        <div class="xt-course-class-info">
          <div class="xt-course-class-info-box">
            <img
              src="https://www.xuantong.cn/_nuxt/img/3e229e1.png"
              alt
              srcset
            />
            <div class="xt-text-yellow xt-margin-md">学习回顾</div>
          </div>
        </div>
      </template>
    </div>
    <div class="xt-text-center xt-text-yellow">
      您可以在北京时间2020年09月17日24时之前提交作业和将作业发布到“晒作业”与大家分享
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import { Modal } from "ant-design-vue";
import { Observer } from "mobx-vue";
import lodash from "lodash";
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
  // 模板类
  get template() {
    return "xt-cc-template-" + this.Details.dataSource.tempNum;
  }
  // 背景图
  get bgSrc() {
    return `/template/${this.Details.dataSource.tempNum}.png`;
  }
  getMapList(list) {
    return lodash.filter(list, "classhourName");
  }
  // 选择课程
  classhour = {};

  // 笔山列表
  getTask(item) {
    if (item && item.homeworkTaskList) {
      return lodash.concat(
        [
          {
            hasCompleted: false,
            homeworkTaskId: -1,
            homeworkTitle: "观看直播",
            homeworkType: 1,
            homeworkTypeDesc: "观看直播",
          },
        ],
        item.homeworkTaskList
      );
    }
    return [];
  }
  // 笔山 悬浮方向
  // getPlacement(index) {
  //   const collection = lodash.get(
  //     {
  //       10: [1, 2, 3, 6, 7, 8, 9],
  //       20: [1, 2, 3, 9, 10, 11, 12, 13],
  //     },
  //     this.Details.dataSource.tempNum
  //   );
  //   if (lodash.includes(collection, index)) {
  //     return "left";
  //   }
  //   return "right";
  // }
  // // popover 容器
  // getPopupContainer(triggerNode) {
  //   return this.$refs.content;
  // }
  // 路径地址
  getLineSrc(index) {
    const path = lodash.get(
      { 10: "ten", 20: "twenty" },
      this.Details.dataSource.tempNum
    );
    if (index <= this.Details.dataSource.tempNum && path) {
      return `/template/${path}/${index}.png`;
    }
  }
  onLoading(courseId) {
    this.PageStore.onReset();
    this.PageStore.onLoading({ courseId });
  }
  async onVisible(classhour) {
    if (classhour) {
      try {
        this.$InspectUser();
        this.classhour = classhour;
      } catch (error) {}
    } else {
      this.classhour = {};
    }
  }
  created() {
    this.onLoading(this.id);
  }
  mounted() {
    // this.onVisible({ classhourId: 339, createTime: Date.now() });
  }
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scoped>
@translateX: 5px;
@tag: 23px;
@img: 75px;
.info-box-after() {
  content: "";
  display: block;
  position: absolute;
  bottom: -40px;
  height: 70px;
  width: 50%;
  background-position-x: center;
  background-position-y: top;
  background-size: 100%;
  background-repeat: no-repeat;
}
.xt-course-class {
  padding-top: 40px;
  &-map {
    position: relative;
    // background: rgba(0, 0, 0, 0.2);
    animation: antFadeIn 0.6s;
    background-image: url(~assets/images/mapbg.png);
    background-position-x: center;
    background-position-y: top;
    background-size: 42px;
    background-repeat: repeat-y;
    min-height: 778px;
    padding-bottom: 100px;
    // > img {
    //   display: block;
    //   padding: 0;
    //   margin: 0;
    //   // min-height: 300px;
    //   &.xt-cc-template-10 {
    //     padding-bottom: 120px;
    //   }
    // }
  }
  // 信息
  &-info {
    // background: rgba(255, 0, 0, 0.05);
    // display: inline-block;
    // position: absolute;
    // left: 0;
    // // z-index: 10;
    // animation: antFadeIn 0.6s;
    // width: 140px;

    &:nth-child(even) {
      .van-col--20 {
        order: 2;
      }
      .xt-course-class-info-box {
        &::after {
          .info-box-after();
          left: 0;
          background-image: url(~assets/images/map-left.png);
        }
      }
    }
    &:nth-child(odd) {
      text-align: right;
      .xt-course-class-info-box {
        &::after {
          .info-box-after();
          right: 0;
          background-image: url(~assets/images/map-right.png);
        }
      }
      .xt-course-class-info-des {
        margin-left: auto;
      }
    }
    &-box {
      height: 132px;
      position: relative;
      .van-col--4{
        position: relative;
        text-align: center;
      }
    }
    &-des {
      width: 45%;
    }
    &-badge {
      height: 21px;
      width: 21px;
      line-height: 21px;
      background: @xt-yellow-6;
      color: white;
      text-align: center;
      border-radius: 100%;
      position: absolute;
      z-index: 10;
      left: 0;
      top: 0;
      transform: translate(-25%, -50%);
    }
    &-image {
      width: 45px;
      height: 45px;
    }
  }
  &-content {
    // opacity: 0.1;
    position: relative;
    z-index: 5;
    cursor: pointer;
  }
  &-line {
    position: absolute;
    // opacity: 0;
    z-index: 0;
  }
  // 学习回顾
  &-review {
    display: inline-block;
    position: absolute;
    left: 0;
    z-index: 10;
    animation: antFadeIn 0.6s;
    width: 140px;
    text-align: center;
    img {
      width: 36px;
      height: 70px;
    }
  }
  // 标记
  &-tag {
    width: @tag;
    height: @tag;
    color: @white;
    background: @xt-golden-6;
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
    color: @xt-golden-6;
  }
}
</style>
