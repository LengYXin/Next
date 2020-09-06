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
    :items="Pagination.dataSource"
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
    return this.$rootStore.$storeHomework;
  }
  get Pagination() {
    return this.PageStore.SunDrying;
  }
  get id() {
    return 28; //this.$route.params.id;
  }
  get Scroller(): any {
    return this.$refs.Scroller;
  }
  created() {
    this.Pagination.onReset({ direction: "top", defaultPageSize: 30 });
  }
  async onLoading(event?) {
    // await this.Pagination.onLoading({ singleCourseId: this.id }, {}, event);
    // if (this.Pagination.current === 2) {
    //   this.scrollToBottom();
    // }
  }
  getComment(item) {
    return item;
  }
  // @Debounce(50)
  scrollToBottom() {
    // lodash.delay(() => this.Scroller.scrollToBottom(), 100);
    this.Scroller.scrollToBottom();
  }
  mounted() {
    console.log(
      "LENG: extends -> scrollToBottom -> this.Scroller",
      this.Scroller
    );
    this.onText();
  }
  onText() {
    const int = interval(100)
      .pipe(
        map((x) => {
          if (x > 50) {
            int.unsubscribe();
          }
          return {
            id: x,
            author: lodash.sample(["林一", "张三", "李四四"]),
            time: Date.now(),
            avatar: lodash.sample([
              "https://oss-free.xuantong.cn/picturePath/b8938fb359b16ce19be6419160b428f5.blob",
              "https://oss-free.xuantong.cn/picturePath/a1815d5ecbf18fad30e48998f00b4a0e.blob",
            ]),
            content: lodash.sample([
              `各位好，这字帖好漂亮，好像珍藏一份。
老师今天好漂亮。各位好，这字帖好漂亮，好像珍藏一份。
老师今天好漂亮。各位好，这字帖好漂亮，好像珍藏一份。
老师今天好漂亮。`,
              `[失望][泪][允悲][晕][害羞][右哼哼][抓狂][打脸]`,
              '[失望][泪][允悲][晕][害羞][右哼哼][抓狂][打脸][失望][泪][允悲][晕][害羞][右哼哼][抓狂][打脸][失望][泪][允悲][晕][害羞][右哼哼][抓狂][打脸][失望][泪][允悲][晕][害羞][右哼哼][抓狂][打脸]'
            ]),
            jushou: lodash.sample([true, false]),
          };
        })
      )
      .subscribe((obs) => {
        this.Pagination.onPush(obs);
        this.scrollToBottom();
      });
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
