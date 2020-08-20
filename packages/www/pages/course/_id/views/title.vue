<template>
  <div class="xt-cid-header">
    <h1 class="xt-title-h3">
      <a-tag>直播课</a-tag>
      <span v-text="PageStore.details.courseName"></span>
    </h1>
    <a-row>
      <a-col :span="12">
        <h2 class="xt-text-yellow xt-title-h6">
          <span v-text="PageStore.details.courseSubtitle"></span>
        </h2>
        <div class="xt-flex-center">
          <strong class="xt-text-green xt-font-size-xx" v-money="PageStore.details.courseFullPrice"></strong>
          <span class="xt-cid-header-text">共{{PageStore.details.classHourCount}}课</span>
          <span class="xt-cid-header-text" v-text="PageStore.details.statusName"></span>
        </div>
      </a-col>
      <a-col :span="12">
        <div class="xt-cid-header-time">
          <time v-dateFormat="PageStore.details.createTime" format="报名截至YYYY-MM-DD" />
        </div>
        <div class="xt-cid-header-signup">
          <nuxt-link to="/homework">
            <span>交作业</span>
          </nuxt-link>
          <nuxt-link to="/payment">
            <span>支付</span>
          </nuxt-link>
          <Signup :give="true" :buy="true" :id="PageStore.details" />
          <Signup :buy="true" :id="PageStore.details" />
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import { Observer } from "mobx-vue";
import Signup from "../../views/signup.vue";
import { computed } from "mobx";
@Observer
@Component({
  components: { Signup },
})
export default class PageView extends Vue {
  get PageStore() {
    return this.$store.$storeCourse;
  }
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scoped>
.xt-cid-header {
  &-text {
    color: @xt-grey-6;
    margin-left: 15px;
  }
  &-time {
    text-align: right;
    color: @xt-yellow-6;
  }
  &-signup {
    margin-top: 10px;
    text-align: right;
  }
  .xt-flex-center {
    margin-top: 10px;
    flex-direction: initial;
    justify-content: flex-start;
  }
}
</style>