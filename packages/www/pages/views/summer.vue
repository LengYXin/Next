<template>
  <a-card :bordered="false" :loading="loading" class="xt-summer">
    <Course badge="right" :dataSource="dataSource" class="xt-summer-course">
      <div slot="description">
        <h6 class="xt-summer-description xt-font-family-FZXIYSK">
          夏日六课
        </h6>
        <strong
          class="xt-summer-money xt-text-green xt-font-size-xl xt-font-family-FZLTHJW"
          v-money="dataSource.courseFullPrice"
        ></strong>
        <div>
          <a-icon class="xt-summer-arrow-down" type="caret-down" />
        </div>
      </div>
    </Course>
  </a-card>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Context } from "@nuxt/types";
import { Observer } from "mobx-vue";
import lodash from "lodash";
import Course from "~/pages/course/views/course.vue";
import Signup from "~/pages/course/views/signup.vue";
@Component({
  components: { Course, Signup },
})
export default class PageView extends Vue {
  loading = true;
  colProps = { lg: 12 };
  dataSource = {
    courseFullPrice: 999,
    courseName: "拙从秀出 | 关于颜真卿的深入学习",
    coursePictureUri:
      "https://oss-free.xuantong.cn/picturePath/56dd562ee00f1d5241d5200a8c12b7a7.jpg",
  };
  created() {
    // lodash.delay(() => {
      this.loading = false;
    // }, 2000);
  }
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" >
.xt-summer {
  .ant-list-item-meta-description,
  .ant-list-item-meta-title {
    padding-left: 30px;
  }
  .xt-signup {
    &:first-child {
      margin: 0;
    }
  }
  &-arrow-down {
    width: 20px;
    height: 20px;
    color: #818181;
    font-size: 20px;
    margin: 0 60px;
  }
  &-course {
    position: relative;
  }
  &-description {
    color: #c4a57f;
    font-size: 16px;
    margin-top: 16px;
  }
  &-money {
    display: block;
    margin-top: 80px;
    font-size: 28px;
    color: #097276;
    font-weight: 600;
    margin-bottom: 50px;
  }
  .xt-course-item-signup {
    position: absolute;
    bottom: 0;
  }
}
</style>