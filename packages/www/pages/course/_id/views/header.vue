<template>
  <div class="xt-content xt-cid-header">
    <h1 class="xt-title-h3 xt-flex-center">
      <a-tag class="xt-cid-header-tag">直播课</a-tag>
      <span v-text="dataSource.courseName"></span>
      <!-- <a-button type="link" @click="onText">更改名称</a-button> -->
      <template v-if="dataSource.purchased">
        <span class="xt-cid-header-text">共{{dataSource.classHourCount}}课</span>
        <span class="xt-cid-header-text xt-text-green" v-text="dataSource.statusName"></span>
        <!-- 开课请了解 -->
        <understand>
          <a-tooltip>
            <template slot="title">赠课给他人</template>
            <Signup :give="true" :buy="true" :icon="true" :dataSource="dataSource">
              <a-icon type="question" />
            </Signup>
          </a-tooltip>
        </understand>
      </template>
    </h1>
    <a-row>
      <a-col :span="12">
        <h2 class="xt-text-yellow xt-title-h6">
          <span v-text="dataSource.courseSubtitle"></span>
        </h2>
        <div class="xt-flex-center" v-if="!dataSource.purchased">
          <strong class="xt-text-green xt-font-size-xl" v-money="dataSource.courseFullPrice"></strong>
          <span class="xt-cid-header-text">共{{dataSource.classHourCount}}课</span>
          <span class="xt-cid-header-text" v-text="dataSource.statusName"></span>
        </div>
      </a-col>
      <a-col :span="12">
        <!-- 购买课程 -->
        <template v-if="!dataSource.purchased">
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
    <!-- 测试使用导航按钮 -->
    <a-space size="large" v-if="dev">
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
  get dev() {
    return this.$store.$global.NODE_ENV === "development";
  }
  mounted() {
    // console.log("LENG: PageView -> mounted -> this.PageStore", this.PageStore);
  }
  onText() {
    this.PageStore.onUpdate(() => ({ courseName: "更改名字" + Date.now() }));
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
    line-height: 26px;
    text-align: center;
    color: white;
    background: @xt-yellow-6;
    font-weight: 400px;
    font-size: 16px;
    border: none;
  }
  &-text {
    color: @xt-grey-6;
    margin-left: 15px;
    font-size: 14px;
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
    position: relative;
  }
  .xt-title-h6 {
    height: 24px;
  }
}
</style>