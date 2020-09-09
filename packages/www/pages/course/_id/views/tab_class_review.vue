/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:02:27
 * @modify date 2020-08-05 14:02:27
 * @desc 去上课
 */
<template>
  <div v-show="show">
    <div @click.prevent.stop="onVisible(true)">
      <slot />
    </div>

    <a-modal
      wrapClassName="xt-course-review-modal"
      :visible="visible"
      destroyOnClose
      @cancel="onVisible(false)"
      :footer="null"
      width="640px"
    >
      <a-row class="xt-course-review-header">
        <a-col :span="24">
          <h3 class="xt-course-review-nick">
            亲爱的
            <span v-text="PageStore.CourseReview.userNickname"></span>
          </h3>
        </a-col>
        <a-col :span="22" :offset="2">
          <h3 class="color-1 xt-font-size-md">
            <span v-text="PageStore.CourseReview.courseName" />
            共
            <span v-text="PageStore.CourseReview.classhourTotalCount" />
            节课
          </h3>
        </a-col>
        <a-col :span="22" class="xt-text-align-right">
          <h3 class="color-2 xt-font-size-lg">
            这一阶你共上课
            <span v-text="PageStore.CourseReview.classhourAttendNum" />
            节，获得
            <span v-text="PageStore.CourseReview.bishanCount" />
            个
          </h3>
        </a-col>
        <a-col :span="20" :offset="4">
          <h3 class="color-3 xt-font-size-x">
            共交了
            <span v-text="PageStore.CourseReview.userHomeworkcount" />
            份作业，作业图共
            <span v-text="PageStore.CourseReview.userHomewoekPictureCount" />
            张
          </h3>
        </a-col>
        <a-col :span="22" :offset="2">
          <h3 class="color-4 xt-font-size-base">
            晒出作业
            <span v-text="PageStore.CourseReview.MomentCount" />
            份儿，分享图片
            <span v-text="PageStore.CourseReview.momentPictureCount" />
            张
          </h3>
        </a-col>
      </a-row>
      <div class="xt-course-review-timeline">
        <h3 class="xt-course-review-timeline-h3">一起回顾下你的进步过程吧~</h3>
        <a-timeline>
          <!-- 加入 -->
          <a-timeline-item>
            <time v-dateFormat="PageStore.CourseReview.registeredTime" format="YYYY/MM/DD" /> 加入暄桐教室
          </a-timeline-item>
          <!-- 报名 -->
          <a-timeline-item>
            <time v-dateFormat="PageStore.CourseReview.registrationTime" format="YYYY/MM/DD" /> 报名《
            <span v-text="PageStore.CourseReview.courseName" />
            》课程，开始学习之旅~
          </a-timeline-item>
          <!-- 上课 -->
          <a-timeline-item>
            <time v-dateFormat="PageStore.CourseReview.firstClassTime" format="YYYY/MM/DD" /> 第一次上课，还记得当时的感觉吗~
          </a-timeline-item>
          <!-- 交作业 -->
          <a-timeline-item v-if="isCreateTime(PageStore.CourseReview.firstHomework)">
            <time
              v-dateFormat="PageStore.CourseReview.firstHomework.createTime"
              format="YYYY/MM/DD"
            /> 第一次交作业，看看自己出发时的样子
            <xt-nine
              size="128"
              :dataSource="PageStore.CourseReview.firstHomework.homeworkPictureList"
              thumb="waterThumbUrl"
              original="waterUrl"
            />
          </a-timeline-item>
          <!-- 晒作业 -->
          <a-timeline-item v-if="isCreateTime(PageStore.CourseReview.firstMoment)">
            <time v-dateFormat="PageStore.CourseReview.firstMoment.createTime" format="YYYY/MM/DD" /> 第一次晒作业，分享自己的成果
            <div v-ellipsis v-html="formatFace(PageStore.CourseReview.firstMoment.content)"></div>
            <xt-nine
              size="128"
              :dataSource="PageStore.CourseReview.firstMoment.momentPictureList"
              thumb="waterThumbUrl"
              original="waterUrl"
            />
          </a-timeline-item>
        </a-timeline>
      </div>
      <div ref="popover" class="xt-course-review-share">
        <a-popover
          trigger="click"
          placement="top"
          @visibleChange="visibleChange"
          :getPopupContainer="getPopupContainer"
        >
          <template slot="content">
            <xt-qrcode :options="qrcode" />
          </template>
          <a-button icon="share-alt" type="yellow">分享至微信</a-button>
        </a-popover>
      </div>
    </a-modal>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch, Emit } from "vue-property-decorator";
import { Modal } from "ant-design-vue";
import { Observer } from "mobx-vue";
import lodash from "lodash";

@Observer
@Component({
  components: {},
})
export default class PageView extends Vue {
  @Prop({ default: () => ({}) }) classhour;
  visible = false;
  token = "";
  get show() {
    return this.classhour.purchased;
  }
  get PageStore() {
    return this.$store.$storeCourse.Details.Map;
  }
  get qrcode() {
    return `${this.$store.$global.domain}/wx/index.html#/course/reviewShare?token=${this.token}`;
  }
  isCreateTime(data) {
    return data && data.createTime;
  }
  getPopupContainer() {
    return this.$refs.popover;
  }
  async visibleChange(visible) {
    if (visible) {
      const token: any = await this.PageStore.onGetCreatetempToken(
        this.classhour.courseId
      );
      this.token = token;
    }
  }
  onVisible(visible) {
    this.visible = visible;
    if (this.visible) {
      this.PageStore.onGetCourseReview(this.classhour.courseId);
    }
  }
  created() {
    // this.onVisible(true);
  }
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" >
.xt-course-review {
  &-modal {
    .ant-modal-content {
      background-image: url(/images/background/review.png);
      background-repeat: no-repeat;
      background-size: 100%;
    }
    .ant-modal-body {
      max-height: 85vh;
      min-height: 300px;
      overflow: hidden;
      padding: 24px 0;
      animation: antFadeIn 0.4s;
      > div {
        animation: antFadeIn 0.6s;
        transition: all 0.5s;
      }
    }
  }
  &-header {
    height: 306px !important;
    padding: 0 24px;
    h3 {
      margin-bottom: 24px;
      &.color-1 {
        color: #077478;
      }
      &.color-2 {
        color: #c4a57f;
      }
      &.color-3 {
        color: #7a9e7c;
      }
      &.color-4 {
        color: #c4a57fb3;
      }
    }
  }
  &-nick {
    font-size: 16px;
    font-weight: 700;
    color: #000;
    margin-bottom: 35px;
  }
  &-timeline {
    padding: 30px 60px 24px 60px;
    max-height: calc(85vh - 400px);
    overflow: auto;
    &-h3 {
      font-size: 14px;
      line-height: 20px;
      color: @xt-yellow-6;
      margin-bottom: 30px;
    }
    .ant-timeline-item-head-blue {
      border: 6px solid transparent;
      border-radius: 0;
      border-top-color: @xt-yellow-6;
      margin-left: -1px;
    }
    .ant-timeline-item-tail {
      top: 5px;
      bottom: 0px;
      // color: @xt-yellow-6;
      // border-color: @xt-yellow-6;
    }
    .ant-timeline-item-content {
      font-size: 12px;
      line-height: 20px;
    }
  }
  &-share {
    padding-top: 10px;
    text-align: center;
    position: relative;
    .ant-popover-placement-top {
      left: 230px !important;
    }
    .ant-popover-inner-content {
      width: 180px;
      height: 180px;
      padding: 0;
    }
  }
}
</style>
