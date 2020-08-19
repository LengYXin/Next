<template>
  <a-card :bordered="false" :loading="loading" class="xt-write">
    <Course badge="right" :dataSource="dataSource" class="xt-write-course">
      <div slot="description">
        <h6 class="xt-title-h6 xt-text-yellow">从书法之美到生活之美——林曦老师的在线直播书法课</h6>
        <h4 class="xt-text-grey xt-font-size-base">共{{dataSource.classHourCount}}课</h4>
        <strong
          class="xt-summer-money xt-text-green xt-font-size-xl"
          v-money="dataSource.courseFullPrice"
        ></strong>
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
    classHourCount: 30,
    courseFullPrice: 999,
    courseName: "拙从秀出 | 关于颜真卿的深入学习",
    coursePictureUri:
      "https://oss-free.xuantong.cn/picturePath/6135cbd3490aa11bc4e052d1e4e681e4.jpg",
  };
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
<style lang="less" >
.xt-write {
  .ant-list-item-meta-description,
  .ant-list-item-meta-title {
    padding-left: 30px;
  }
  .xt-signup {
    &:first-child {
      margin: 0;
    }
  }
  &-course {
    position: relative;
  }
  &-money {
    display: block;
    margin-top: 60px;
  }
  .xt-course-item-signup {
    position: absolute;
    bottom: 0;
  }
}
</style>