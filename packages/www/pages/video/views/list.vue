<template>
  <a-spin :spinning="loading">
    <a-row :gutter="16">
      <transition-group name="opacity">
        <a-col v-for="item in dataSource" :key="item.id" v-bind="bindCol">
          <a-card class="xt-video-card" :bordered="false">
            <xt-hover>
              <img class="xt-video-img" v-lazy="item.videoCoverThumbUrl" />
              <div class="xt-video-card-footer" slot="footer">
                <a-row type="flex">
                  <a-col :span="16" class="xt-text-ellipsis">
                    <span v-text="item.title"></span>
                  </a-col>
                  <a-col :span="8" class="xt-text-align-right">
                    <VeView :item="item" />
                    <VeLike :item="item" />
                  </a-col>
                </a-row>
              </div>
              <template #hover>
                <nuxt-link class="xt-flex-center" :to="`/video/${item.id}`">
                  <a-icon class="xt-video-play" type="play-circle" />
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
import VeLike from "./like.vue";
import VeView from "./view.vue";
@Component({
  components: { VeView, VeLike },
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
  &-card-footer {
  }
  &-play {
    color: @white !important;
    font-size: 50px;
  }
}
</style>
