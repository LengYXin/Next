<template>
  <div class="xt-cid-header">
    <van-image lazy-load :src="PageStore.dataSource.coursePictureUri" />
    <div class="xt-content">
      <h1 class="xt-title-h6 xt-flex-center">
        <div class="xt-cid-header-tag">直播课</div>
        <span v-text="dataSource.courseName"></span>
      </h1>
      <h2 class="xt-title-h6">
        <span v-text="dataSource.courseSubtitle"></span>
      </h2>
      <div class="xt-flex-center" v-if="!dataSource.purchased">
        <strong
          class="xt-text-green xt-font-size-xl"
          v-money="dataSource.courseFullPrice"
        ></strong>
        <span class="xt-cid-header-text"
          >共{{ dataSource.classHourCount }}课</span
        >
        <span class="xt-cid-header-text" v-text="dataSource.statusName"></span>
      </div>
      <van-divider />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import { Observer } from "mobx-vue";
@Observer
@Component({
  components: {},
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
    width: 48px;
    height: 20px;
    line-height: 20px;
    border-radius: 3px;
    text-align: center;
    color: white;
    background: @xt-yellow-6;
    font-weight: 400px;
    font-size: 12px;
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