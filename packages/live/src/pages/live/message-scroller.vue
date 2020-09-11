/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:16:12
 * @modify date 2020-08-05 14:16:12
 * @desc 视频
 */
<template>
  <DynamicScroller
    ref="Scroller"
    class="lyx-message-scroller"
    keyField="msgId"
    :items="PageStore.dataSource"
    :min-item-size="24"
  >
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
import { Debounce } from "lodash-decorators";
import { Component, Prop, Vue, Provide, Emit } from "vue-property-decorator";
import { Observer } from "mobx-vue";
import { map } from "rxjs/operators";
import { interval } from "rxjs";
@Observer
@Component({
  components: {},
})
export default class extends Vue {
  get PageStore() {
    return this.$rootStore.$socketMessage.MessageQueue;
  }
  get socketMessage() {
    return this.$rootStore.$socketMessage;
  }
  get id() {
    return "123"; //this.$route.params.id;
  }
  get Scroller(): any {
    return this.$refs.Scroller;
  }
  created() {
    // this.Pagination.onReset({ direction: "top", defaultPageSize: 30 });
  }
  async onLoading(event?) {
    // await this.Pagination.onLoading({ singleCourseId: this.id }, {}, event);
    // if (this.Pagination.current === 2) {
    //   this.scrollToBottom();
    // }
  }
  getComment(item) {
    return {
      content: item.content.content,
      avatar: item.header,
      author: item.nickName,
      time: item.time,
    };
  }
  // @Debounce(50)
  scrollToBottom() {
    // lodash.delay(() => this.Scroller.scrollToBottom(), 100);
    requestAnimationFrame(this.Scroller.scrollToBottom);
  }
  async onLink() {
    await this.socketMessage.onLink(this.id);
    this.socketMessage.WebSocketSubject.subscribe((msg) => {
      this.scrollToBottom();
    });
  }
  mounted() {
    this.onLink();
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
