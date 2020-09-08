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
      width="700px"
    >
      <a-row type="flex">
        <a-col :span="24">
          <h3>
            亲爱的
            <span v-text="PageStore.CourseReview.userNickname"></span>
          </h3>
        </a-col>
        <a-col :span="24">
          <h3>
            <span v-text="PageStore.CourseReview.courseName"></span> 共6节课
          </h3>
        </a-col>
        <a-col :span="24">
          <h3>这一阶你共上课2节，获得2个</h3>
        </a-col>
        <a-col :span="24">
          <h3>共交了 0份作业，作业图共0张</h3>
        </a-col>
        <a-col :span="24">
          <h3>晒出作业0份儿，分享图片0张</h3>
        </a-col>
      </a-row>
      <div>
        <h3>一起回顾下你的进步过程吧~</h3>
        <a-timeline>
          <a-timeline-item>Create a services site 2015-09-01</a-timeline-item>
          <a-timeline-item>Solve initial network problems 2015-09-01</a-timeline-item>
          <a-timeline-item>Technical testing 2015-09-01</a-timeline-item>
          <a-timeline-item>Network problems being solved 2015-09-01</a-timeline-item>
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
            <div class="xt-course-review-qrcode">
              <xt-qrcode :options="qrcode" />
            </div>
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
  created() {}
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" >
.xt-course-review {
  &-share {
    text-align: center;
    position: relative;
  }
  &-qrcode {
    width: 180px;
    height: 180px;
    position: relative;
    overflow: hidden;
  }
}
</style>
