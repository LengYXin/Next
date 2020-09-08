/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:02:27
 * @modify date 2020-08-05 14:02:27
 * @desc 去上课
 */
<template>
  <div class="xt-course-class xt-flex-center" ref="content">
    <div class="xt-course-class-map" :class="template">
      <!-- 背景 -->
      <img :src="bgSrc" alt srcset :class="template" />
      <!-- 课程信息 -->
      <template v-if="!PageStore.loading">
        <div
          v-for="(item,index) in PageStore.mapList"
          :key="item.classhourId"
          :class="'index-'+index"
          class="xt-course-class-info"
        >
          <template v-if="item.classhourName">
            <!-- 路径 -->
            <img class="xt-course-class-line" :src="getLineSrc(index)" alt srcset />
            <!-- 内容主体 -->
            <a-row type="flex">
              <!-- 序号 -->
              <a-col :span="24" flex="auto" class="xt-course-class-index">
                <div class="xt-course-class-tag">
                  <span v-text="index"></span>
                </div>
              </a-col>
              <!-- 图片 笔山 -->
              <a-col :span="24" class="xt-course-class-content">
                <div class="xt-course-class-img">
                  <a-popover
                    arrowPointAtCenter
                    placement="right"
                    :getPopupContainer="getPopupContainer"
                  >
                    <template slot="content">
                      <h5 v-text="item.classhourName"></h5>
                      <div v-text="item.classhourIntroduction" />
                      <time v-dateFormat="item.courseStartTime" format="YYYY-MM-DD HH:mm" />
                    </template>
                    <img @click="onVisible(item)" :src="item.copyBookUri" />
                  </a-popover>
                  <ul class="xt-course-class-bs">
                    <li v-for="bs in getTask(item)" :key="bs.homeworkTaskId">
                      <a-popover
                        arrowPointAtCenter
                        :placement="getPlacement(index)"
                        :getPopupContainer="getPopupContainer"
                      >
                        <template slot="content">
                          <div v-text="bs.homeworkTypeDesc">观看直播</div>
                        </template>
                        <a-icon type="check-circle" />
                      </a-popover>
                    </li>
                  </ul>
                </div>
              </a-col>
              <!-- 状态 -->
              <a-col :span="24" flex="auto" class="xt-course-class-state">
                <span>直播中</span>
              </a-col>
            </a-row>
          </template>
        </div>
        <!-- 学习回顾 -->
        <div class="xt-course-class-review">
          <a-row type="flex">
            <a-col :span="24" class="xt-course-class-content">
              <mapReview>
                <img src="https://www.xuantong.cn/_nuxt/img/3e229e1.png" alt srcset />
              </mapReview>
            </a-col>
            <a-col :span="24" class="xt-course-class-state">
              <div class="xt-text-yellow xt-margin-md">学习回顾</div>
            </a-col>
          </a-row>
        </div>
      </template>
      <div class="xt-text-align-right xt-text-yellow">您可以在北京时间2020年09月17日24时之前提交作业和将作业发布到“晒作业”与大家分享</div>
    </div>
    <mapDetails :classhour="classhour" @cancel="onVisible(null)" />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import { Modal } from "ant-design-vue";
import { Observer } from "mobx-vue";
import lodash from "lodash";
import mapDetails from "./tab_class_details.vue";
import mapReview from "./tab_class_review.vue";

@Observer
@Component({
  components: { mapDetails, mapReview },
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
  getPlacement(index) {
    const collection = lodash.get(
      {
        10: [1, 2, 3, 6, 7, 8, 9],
        20: [1, 2, 3, 9, 10, 11, 12, 13],
      },
      this.Details.dataSource.tempNum
    );
    if (lodash.includes(collection, index)) {
      return "left";
    }
    return "right";
  }
  // popover 容器
  getPopupContainer(triggerNode) {
    return this.$refs.content;
  }
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
    // z-index: 10;
    animation: antFadeIn 0.6s;
    width: 140px;
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
<style lang="less" scoped dec="三阶">
.info(@top,@left) {
  top: @top;
  left: @left;
  .xt-course-class {
    &-index {
      order: 3;
    }
    &-content {
      order: 2;
    }
    &-state {
      order: 1;
    }
  }
}
.tag() {
  .xt-course-class-tag {
    width: 10px;
    height: 10px;
    span {
      display: none;
    }
  }
}
// 3 节课模板
.xt-cc-template-3 {
  .xt-course-class-info {
    &.index-0 {
      .info(200px,35px);
      .tag();
    }
    &.index-1 {
      .info(70px,325px);
    }
    &.index-2 {
      .info(240px,610px);
    }
    &.index-3 {
      .info(50px,750px);
    }
    &.index-4 {
      .info(85px,910px);
      .tag();
    }
  }
  .xt-course-class-review {
    .info(140px,1020px);
  }
}
</style>
<style lang="less" scoped dec="五阶">
.info(@top,@left,@index:1,@content:2,@state:3) {
  top: @top;
  left: @left;
  .xt-course-class {
    &-index {
      order: @index;
    }
    &-content {
      order: @content;
    }
    &-state {
      order: @state;
    }
  }
}
.tag() {
  .xt-course-class-tag {
    width: 10px;
    height: 10px;
    span {
      display: none;
    }
  }
}
// 5 节课模板
.xt-cc-template-5 {
  .xt-course-class-info {
    &.index-0 {
      .info(220px,50px,3,2,1);
      .tag();
    }
    &.index-1 {
      .info(330px,140px);
    }
    &.index-2 {
      .info(310px,280px);
    }
    &.index-3 {
      .info(260px,470px);
    }
    &.index-4 {
      .info(170px,700px);
    }
    &.index-5 {
      .info(240px,980px);
    }
    &.index-6 {
      .info(300px,1115px);
      .tag();
    }
  }
  .xt-course-class-review {
    .info(160px,1184px,3,2,1);
  }
}
</style>
<style lang="less" scoped dec="十阶">
.info(@top,@left,@index:1,@content:2,@state:3) {
  top: @top;
  left: @left;
  .xt-course-class {
    &-index {
      order: @index;
    }
    &-content {
      order: @content;
    }
    &-state {
      order: @state;
    }
  }
}
.tag() {
  .xt-course-class-tag {
    width: 10px;
    height: 10px;
    span {
      display: none;
    }
  }
}
.tag-left() {
  .xt-course-class-tag {
    margin-left: 0px;
    transform: translateY(60px);
  }
}
.bs-left() {
  .xt-course-class-bs {
    right: auto;
    left: 10px;
  }
}
.line(@top,@left,@rotate:0deg) {
  .xt-course-class-line {
    top: @top;
    left: @left;
    transform: rotate(@rotate);
  }
}
// 10 节课模板
.xt-cc-template-10 {
  margin-top: 90px;
  .xt-course-class-info {
    &.index-0 {
      .info(210px,340px);
      .tag();
    }
    &.index-1 {
      .info(130px,110px);
      .bs-left();
      .xt-course-class-tag {
        margin-right: 10px;
      }
      .line(-117px,91px);
    }
    &.index-2 {
      .info(70px,365px);
      .bs-left();
      .line(-63px,78px);
    }
    &.index-3 {
      .info(0,540px);
      .bs-left();
      .line(5px,78px);
    }
    &.index-4 {
      .info(-20px,840px);
      .tag-left();
      .line(59px,5px);
    }
    &.index-5 {
      .info(140px,1005px);
      .tag-left();
      .line(79px,8px);
    }
    &.index-6 {
      .info(450px,1010px);
      .bs-left();
      .line(-58px,-250px);
    }
    &.index-7 {
      .info(460px,675px);
      .bs-left();
      .line(-11px,-161px);
    }
    &.index-8 {
      .info(440px,450px);
      .bs-left();
      .line(3px,-135px);
    }
    &.index-9 {
      .info(410px,240px,3,2,1);
      .bs-left();
      .line(128px,-172px);
    }
    &.index-10 {
      .info(550px,-18px);
      .line(-400px,23px);
    }
    &.index-11 {
      .info(370px,-63px,3,2,1);
      .tag();
    }
  }
  .xt-course-class-review {
    .info(260px,30px,3,2,1);
  }
}
</style>
<style lang="less" scoped dec="二十阶">
.info(@top,@left,@index:1,@content:2,@state:3) {
  top: @top;
  left: @left;
  .xt-course-class {
    &-index {
      order: @index;
    }
    &-content {
      order: @content;
    }
    &-state {
      order: @state;
    }
  }
}
.tag() {
  .xt-course-class-tag {
    width: 10px;
    height: 10px;
    span {
      display: none;
    }
  }
}
.tag-left(@y:60px) {
  .xt-course-class-tag {
    margin-left: 0px;
    transform: translateY(@y);
  }
}
.bs-left() {
  .xt-course-class-bs {
    right: auto;
    left: 10px;
  }
}
.line(@top,@left,@rotate:0deg) {
  .xt-course-class-line {
    top: @top;
    left: @left;
    transform: rotate(@rotate);
  }
}
// 20 节课模板
.xt-cc-template-20 {
  margin-top: 120px;
  .xt-course-class-info {
    &.index-0 {
      .info(-104px,80px,3,2,1);
      .tag();
      .line(124px,81px);
    }
    &.index-1 {
      .info(36px,263px);
      .bs-left();
      .line(16px,82px);
    }
    &.index-2 {
      .info(120px,400px);
      .bs-left();
      .line(12px,82px,-5deg);
    }
    &.index-3 {
      .info(-75px,525px,3,2,1);
      .bs-left();
      .line(165px,95px);
    }
    &.index-4 {
      .info(75px,680px);
      .line(-5px,87px);
    }
    &.index-5 {
      .info(-55px,800px,3,2,1);
      .line(142px,67px,13deg);
    }
    &.index-6 {
      .info(66px,940px,3,2,1);
      .tag-left(-60px);
      .line(64px,0,5deg);
    }
    &.index-7 {
      .info(187px,945px);
      .tag-left(35px);
      .line(57px,-55px);
    }
    &.index-8 {
      .info(300px,810px);
      .line(11px,-75px,4deg);
    }
    &.index-9 {
      .info(315px,650px);
      .bs-left();
      .line(-5px,-75px);
    }
    &.index-10 {
      .info(300px,510px);
      .bs-left();
      .line(-5px,-70px);
    }
    &.index-11 {
      .info(285px,380px);
      .bs-left();
      .line(9px,-80px);
    }
    &.index-12 {
      .info(290px,230px);
      .bs-left();
      .line(15px,-49px,-5deg);
    }
    &.index-13 {
      .info(208px,115px,3,2,1);
      .bs-left();
      .line(132px,-45px);
    }
    &.index-14 {
      .info(300px,0px,3,2,1);
      .line(138px,59px,-8deg);
    }
    &.index-15 {
      .info(580px,33px);
      .line(9px,85px,-9deg);
    }
    &.index-16 {
      .info(610px,200px);
      .line(-39px,85px,-7deg);
    }
    &.index-17 {
      .info(562px,340px);
      .line(-44px,70px);
    }
    &.index-18 {
      .info(515px,470px);
      .line(-12px,70px);
    }
    &.index-19 {
      .info(500px,595px);
      .line(6px,65px);
    }
    &.index-20 {
      .info(525px,710px);
      .line(8px,65px);
    }
    &.index-21 {
      .tag();
      .info(640px,910px);
    }
  }
  .xt-course-class-review {
    .info(520px,965px,3,2,1);
  }
}
</style>