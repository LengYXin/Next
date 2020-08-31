<template>
  <div class="xt-content xt-cid-header">
    <h1 class="xt-title-h3 xt-flex-center">
      <a-tag class="xt-bg-yellow xt-cid-header-tag xt-font-size-md">直播课</a-tag>
      <span v-text="dataSource.courseName"></span>
      <!-- <a-button type="link" @click="onText">更改名称</a-button> -->
    </h1>
    <a-row>
      <a-col :span="12">
        <h2 class="xt-text-yellow xt-title-h6">
          <span v-text="dataSource.courseSubtitle"></span>
        </h2>
        <div class="xt-flex-center">
          <strong class="xt-text-green xt-font-size-xx" v-money="dataSource.courseFullPrice"></strong>
          <span class="xt-cid-header-text">共{{dataSource.classHourCount}}课</span>
          <span class="xt-cid-header-text" v-text="dataSource.statusName"></span>
        </div>
      </a-col>
      <a-col :span="12">
        <!-- 开课请了解 -->
        <understand v-if="dataSource.purchased">
          <a-tooltip>
            <template slot="title">赠课给他人</template>
            <Signup :give="true" :buy="true" :icon="true" :dataSource="dataSource">
              <a-icon type="question" />
            </Signup>
          </a-tooltip>
        </understand>
        <template v-else>
          <div class="xt-cid-header-time">
            <time v-dateFormat="dataSource.createTime" format="报名截至YYYY-MM-DD" />
          </div>
          <div class="xt-cid-header-signup">
            <Signup :give="true" :buy="true" :dataSource="dataSource" />
            <Signup :buy="true" :dataSource="dataSource" />
          </div>
        </template>
      </a-col>
    </a-row>
    <a-space size="large">
      <nuxt-link to="/homework">
        <span>交作业</span>
      </nuxt-link>
      <nuxt-link to="/payment">
        <span>支付</span>
      </nuxt-link>
      <nuxt-link :to="`/course/${id-1}?active=to`">
        <span>上一课</span>
      </nuxt-link>
      <nuxt-link :to="`/course/${id+1}?active=to`">
        <span>下一课</span>
      </nuxt-link>
    </a-space>
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
  get dataSource() {
    return this.PageStore.dataSource;
  }
  get id() {
    return parseInt(this.$route.params.id);
  }
  mounted() {
    // console.log("LENG: PageView -> mounted -> this.PageStore", this.PageStore);
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
  &-tag {
    width: 66px;
    height: 28px;
    line-height: 28px;
    text-align: center;
  }
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
  .xt-title-h3 {
    height: 40px;
    margin: 0;
  }
}
</style>