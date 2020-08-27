/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:17:52
 * @modify date 2020-08-05 14:17:52
 * @desc [description]
 */
<template>
  <a-list
    class="xt-about-list"
    item-layout="horizontal"
    :data-source="dataSource"
    :rowKey="rowKey"
  >
    <!-- <a
    
      target="_blank"
      :href="item.articleUrl"
    >-->
    <a-list-item slot="renderItem" class="xt-about-item" slot-scope="item">
      <h1
        class="xt-about-item-title xt-font-size-xx xt-font-family-FZXIYSK"
        v-text="item.articleTitle"
      >
        名称
      </h1>
      <a-list-item-meta>
        <div
          slot="description"
          class="xt-about-item-description xt-font-family-FZLTHJW"
        >
          <div v-text="item.articleIntroduction"></div>
          <div class="xt-about-item-link">
            <a target="_blank" :href="item.articleUrl">查看全文</a>
          </div>
        </div>
        <a-badge
          class="xt-badge xt-badge-left xt-font-family-FZXIYSK"
          slot="avatar"
        >
          <div class="xt-badge-text" slot="count">
            <div v-dateFormat="item.publishTime" format="MM"></div>
            <div v-dateFormat="item.publishTime" format="DD日"></div>
          </div>
          <div>
            <img class="xt-about-item-logo" v-lazy="item.thumbUrl" />
          </div>
        </a-badge>
      </a-list-item-meta>
    </a-list-item>
    <!-- </a> -->
  </a-list>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Context } from "@nuxt/types";
import { Observer } from "mobx-vue";
import lodash from "lodash";
@Component({
  components: {},
})
export default class PageView extends Vue {
  @Prop({ default: true }) loading;
  @Prop({ default: [] }) dataSource;
  @Prop({ default: "key" }) rowKey;
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" >
.xt-about-item {
  &.ant-list-item {
    animation: antFadeIn 0.6s;
    border: none !important;
    display: block;
    padding: 0;
    padding-bottom: 55px;
  }
  &-title {
    font-size: @font-size-lg;
    font-weight: 400;
    margin-bottom: 20px;
  }
  .ant-list-item-meta-avatar {
    margin-right: 68px;
  }
  &-description {
    text-align: justify;
    word-break: break-all;
    line-height: 26px;
  }
  &-link {
    margin-top: 20px;
    a {
      color: @xt-green-6;
      &:hover {
        color: @xt-green-5;
      }
    }
  }
  &-logo {
    width: 410px;
    height: 236px;
    display: block;
    margin: auto;
  }
  .xt-badge-left.ant-badge .ant-scroll-number-custom-component {
    transform: translate(-120%, -110%) !important;
  }
  .xt-badge-text {
    width: 54px !important;
    height: 54px !important;
    background: #f5f5f5 !important;
    color: @xt-grey-6 !important;
    font-size: @font-size-md;
    div {
      line-height: 1.1;
    }
  }
}
</style>
