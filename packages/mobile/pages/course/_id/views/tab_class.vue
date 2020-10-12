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
           
          </template>
        </div>
        <!-- 学习回顾 -->
        <div class="xt-course-class-review">
          
        </div>
      </template>
      <div class="xt-text-align-right xt-text-yellow">您可以在北京时间2020年09月17日24时之前提交作业和将作业发布到“晒作业”与大家分享</div>
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
  components: {  },
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
.xt-course-class {
  &-map {
    position: relative;
    // background: rgba(0, 0, 0, 0.2);
    animation: antFadeIn 0.6s;
    > img {
      display: block;
      padding: 0;
      margin: 0;
      // min-height: 300px;
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
