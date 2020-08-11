<template>
  <a-spin :spinning="loading">
    <a-row :gutter="16">
      <transition-group name="opacity">
        <a-col v-for="item in dataSource" :key="item.id" v-bind="bindCol">
          <a-card class="xt-video-card" :bordered="false">
            <xt-hover>
              <img class="xt-video-img" v-lazy="item.videoCoverThumbUrl" />
              <div slot="footer">
                <span v-text="item.title"></span>
                <span v-text="item.viewCount"></span>
                <span v-text="item.likeCount"></span>
              </div>
              <template #hover>
                <nuxt-link :to="`/video/${item.id}`">
                  <div>GO</div>
                </nuxt-link>
              </template>
            </xt-hover>
          </a-card>
        </a-col>
      </transition-group>
    </a-row>
  </a-spin>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch, Provide } from "vue-property-decorator";
import { Context } from "@nuxt/types";
import { Observer } from "mobx-vue";
import lodash from "lodash";
@Component({
  components: {},
})
export default class PageView extends Vue {
  @Prop({ default: true }) loading;
  @Prop({ default: [] }) dataSource;
  bindCol = {
    lg: 8,
    sm: 12,
    xs: 24,
  };
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" >
.xt-video {
  &-card {
    .ant-card-body {
      padding: 20px 0;
    }
  }
  &-img {
    width: 320px;
    height: 180px;
    display: block;
    margin: auto;
  }
}
</style>
