<template>
  <div class="xt-cid-header">
    <h1 class="xt-title-h3">
      <a-tag>直播课</a-tag>
      <span v-text="PageStore.dataSource.courseName"></span>
      <a-button type="link" @click="onText">更改名称</a-button>
    </h1>
    <a-row>
      <a-col :span="12">
        <h2 class="xt-text-yellow xt-title-h6">
          <span v-text="PageStore.dataSource.courseSubtitle"></span>
        </h2>
        <div class="xt-flex-center">
          <strong
            class="xt-text-green xt-font-size-xx"
            v-money="PageStore.dataSource.courseFullPrice"
          ></strong>
          <span class="xt-cid-header-text">共{{PageStore.dataSource.classHourCount}}课</span>
          <span class="xt-cid-header-text" v-text="PageStore.dataSource.statusName"></span>
        </div>
      </a-col>
      <a-col :span="12">
        <div class="xt-cid-header-time">
          <time v-dateFormat="PageStore.dataSource.createTime" format="报名截至YYYY-MM-DD" />
        </div>
        <div class="xt-cid-header-signup">
          <nuxt-link to="/homework">
            <span>交作业</span>
          </nuxt-link>
          <nuxt-link to="/payment">
            <span>支付</span>
          </nuxt-link>
          <understand />
          <Signup :give="true" :buy="true" :id="PageStore.dataSource" />
          <Signup :buy="true" :id="PageStore.dataSource" />
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import { Observer } from "mobx-vue";
import Signup from "../../views/signup.vue";
import understand from "./understand.vue";
@Observer
@Component({
  components: { Signup, understand },
})
export default class PageView extends Vue {
  get PageStore() {
    return this.$store.$storeCourse.Details;
  }
  mounted() {
    console.log("LENG: PageView -> mounted -> this.PageStore", this.PageStore);
  }
  onText() {
    this.PageStore.onUpdate({ courseName: "更改名字" + Date.now() });
  }
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