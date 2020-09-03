/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:16:12
 * @modify date 2020-08-05 14:16:12
 * @desc 视频
 */
<template>
  <DynamicScroller class="lyx-message-scroller" :items="Pagination.dataSource" :min-item-size="24">
    <template #before>
      <lyx-infinite-loading direction="top" @loading="onLoading" />
    </template>
    <template v-slot="{ item, index, active }">
      <DynamicScrollerItem :item="item" :active="active" :data-index="index">
        <lyx-comment :comment="getComment(item)">
          <template slot="actions">
            <!-- <xt-action
              @click="onLikes(item)"
              :statistics="item.likeCount"
              :action="item.likeRecord"
            />
            <xt-action :statistics="item.commentCount" title="回复" />-->
          </template>
          <template slot="overlay">
            <a-menu>
              <a-menu-item>
                <span>私信</span>
              </a-menu-item>
            </a-menu>
          </template>
        </lyx-comment>
      </DynamicScrollerItem>
    </template>
  </DynamicScroller>
</template>
<script lang="ts">
import lodash from "lodash";
import { Component, Prop, Vue, Provide, Emit } from "vue-property-decorator";
import { Observer } from "mobx-vue";
@Observer
@Component({
  components: {},
})
export default class extends Vue {
  get PageStore() {
    return this.$rootStore.$storeHomework;
  }
  get Pagination() {
    return this.PageStore.SunDrying;
  }
  get id() {
    return 28; //this.$route.params.id;
  }
  created() {
    this.Pagination.onReset({ direction: "top" });
  }
  onLoading(event?) {
    this.Pagination.onLoading({ singleCourseId: this.id }, {}, event);
  }
  getComment(item) {
    return {
      content: item.content,
      avatar: item.userHeader,
      author: item.userNickname,
      time: item.createTime,
      bishan: item.bishanNum,
    };
  }
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scoped>
.lyx-message {
  &-scroller {
    height: 100%;

    &::-webkit-scrollbar {
      width: 0.5rem;
      height: 0.5rem;
      background: #fff;
    }

    &::-webkit-scrollbar-track {
      border-radius: 0;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 0.5rem;
      background-color: #ccc;
      -webkit-transition: background-color 0.15s;
      transition: background-color 0.15s;
    }

    &::-webkit-scrollbar-thumb:hover {
      background-color: #999;
    }
  }
}
</style>
