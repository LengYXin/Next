/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:17:52
 * @modify date 2020-08-05 14:17:52
 * @desc [description]
 */
<template>
  <a-list
    :loading="loading"
    class="xt-content"
    item-layout="horizontal"
    :data-source="dataSource"
    :rowKey="rowKey"
  >
    <a slot="renderItem" slot-scope="item" target="_blank" :href="item.articleUrl">
      <a-list-item>
        <a-list-item-meta>
          <h1 slot="title" v-text="item.articleTitle">名称</h1>
          <div slot="description">
            <div v-text="item.articleIntroduction"></div>
          </div>
          <a-badge class="xt-badge-left" slot="avatar">
            <div class="xt-badge-text" slot="count">
              <div v-text="item.publishTime">直播</div>
            </div>
            <img width="480" height="270" alt="logo" v-lazy="item.thumbUrl" />
          </a-badge>
        </a-list-item-meta>
      </a-list-item>
    </a>
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
.xt-about {
  &-card {
    .ant-card-body {
      padding: 20px 0;
    }
  }
  &-img {
    width: 230px;
    height: 230px;
    display: block;
    margin: auto;
  }
}
</style>
