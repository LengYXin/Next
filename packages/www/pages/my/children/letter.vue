<!--
 * @Author: Erlin
 * @CreateTime: 2020-08-06 20:52:17
 * @LastEditors: Erlin
 * @LastEditTime: 2020-09-28 18:13:11
 * @Description: 站内信
-->

<template>
  <div class="xt-content xt-my-letter xt-font-family-FZLTHJW">
    <a-row>
      <a-col :span="8">
        <div ref="tab" class="xt-my-letter-tab-warp">
          <a-affix :target="() => this.$refs.tab">
            <div class="xt-my-letter-tab-search">
              <a-input-search
                placeholder="通过昵称快速查找"
                @search="onSearch"
              />
            </div>
          </a-affix>
          <a-tabs
            class="xt-my-letter-tabs"
            tab-position="left"
            :default-active-key="defaultActiveKey"
            @change="tabsChange"
          >
            <a-tab-pane v-for="i in 24" :key="i">
              <div class="xt-my-letter-tab-item" slot="tab">
                <a-avatar
                  :size="45"
                  src="https://lhyu-bucket.oss-cn-beijing.aliyuncs.com/picturePath/bbd969c9672d4042f965ec66506a85ce.png?Expires=1881910985&OSSAccessKeyId=LTAIjk4PD9x8QhJk&Signature=z1Foo04oi9zT4ALgKcqK5E%2FLR3Q%3D"
                />
                <div
                  class="xt-flex-column xt-justify-between xt-margin-left-sm"
                >
                  <div class="xt-flex xt-justify-between xt-align-center">
                    <div class="xt-text-bold">教室通知{{ i }}</div>
                    <div class="xt-font-size-sm">20/04/30</div>
                  </div>
                  <div
                    class="xt-font-size-sm xt-text-grey xt-text-ellipsis"
                    style="width: 132px"
                  >
                    记得今晚的直播聊天儿聊天儿聊天儿聊天儿聊天儿聊天儿聊天儿聊天儿聊天儿
                  </div>
                </div>
              </div>
            </a-tab-pane>
          </a-tabs>
        </div>

        <!-- <div ref="tab" class="xt-my-letter-tab">
          <a-affix :target="() => this.$refs.tab">
            <div class="xt-my-letter-tab-item">
              <a-input-search
                placeholder="通过昵称快速查找"
                @search="onSearch"
              />
            </div>
          </a-affix>

          <div class="xt-my-letter-tab-item xt-my-letter-tab-active">
            <a-avatar :size="45" icon="user" />
            <div class="xt-flex-column xt-justify-between xt-margin-left-sm">
              <div class="xt-flex xt-justify-between xt-align-center">
                <div class="xt-text-bold">教室通知</div>
                <div class="xt-font-size-sm">20/04/30</div>
              </div>
              <div
                class="xt-font-size-sm xt-text-grey xt-text-ellipsis"
                style="width: 132px"
              >
                记得今晚的直播聊天儿聊天儿聊天儿聊天儿聊天儿聊天儿聊天儿聊天儿聊天儿
              </div>
            </div>
          </div>

          <div class="xt-my-letter-tab-item" v-for="i in 12" :key="i">
            <a-avatar :size="45" icon="user" />
            <div class="xt-flex-column xt-justify-between xt-margin-left-sm">
              <div class="xt-flex xt-justify-between xt-align-center">
                <div class="xt-text-bold">系统消息</div>
                <div class="xt-font-size-sm">20/04/30</div>
              </div>
              <div
                class="xt-font-size-sm xt-text-grey xt-text-ellipsis"
                style="width: 132px"
              >
                同学好，明天要上课啦，《新二阶|楷书精进课程》课程的第13节直播课，《第13课
                《雁塔圣教序》练习③》上课时间xxx
              </div>
            </div>
          </div>
        </div> -->
      </a-col>
      <a-col :span="16">
        <div class="xt-my-letter-main" ref="main">
          <a-affix :target="() => this.$refs.main">
            <div class="xt-my-letter-main-title">
              <h6 class="xt-title-h6 xt-text-yellow xt-text-bold">教室通知</h6>
            </div>
          </a-affix>
          <a-list
            class="comment-list xt-padding-lr-lg"
            item-layout="horizontal"
            :data-source="data"
            v-if="activeKey % 2 == 0"
          >
            <a-list-item
              slot="renderItem"
              slot-scope="item, index"
              class="xt-flex-column"
            >
              <div>2019/12/01 [通知样式]</div>
              <a-comment style="width: 100%">
                <span
                  class="xt-text-bold xt-font-size-base"
                  slot="author"
                  v-text="item.title"
                ></span>
                <span slot="actions" v-text="item.sendTime"></span>
                <span
                  slot="content"
                  class="xt-text-grey"
                  v-html="item.message"
                ></span>
              </a-comment>
            </a-list-item>
          </a-list>

          <div v-else>
            <!-- 右侧 -->
            <div class="xt-text-align-center">2019/12/01 [私信样式]</div>
            <div
              class="xt-flex xt-justify-end xt-align-center xt-margin-tb-lg"
              v-for="i in 5"
              :key="'right' + i"
            >
              <div class="xt-font-size-sm xt-text-grey">17:26</div>
              <div class="xt-flex xt-align-top">
                <div class="xt-margin-left-lg xt-my-letter-popover">
                  <div class="ant-popover ant-popover-placement-leftTop">
                    <div class="ant-popover-content">
                      <div class="ant-popover-arrow"></div>
                      <div class="ant-popover-inner">
                        <div class="ant-popover-inner-content">
                          <span>测试测试测试测试测试</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="xt-margin-right-lg">
                  <a-avatar :size="30" icon="user" />
                </div>
              </div>
            </div>

            <!-- 左侧 -->
            <div class="xt-text-align-center">2019/12/01 [私信样式]</div>
            <div
              class="xt-flex xt-justify-start xt-align-center xt-margin-tb-lg"
              v-for="i in 1"
              :key="'left' + i"
            >
              <div class="xt-flex xt-align-top">
                <div class="xt-margin-left-lg">
                  <a-avatar :size="30" icon="user" />
                </div>
                <div class="xt-margin-right-lg xt-my-letter-popover">
                  <div class="ant-popover ant-popover-placement-rightTop">
                    <div class="ant-popover-content">
                      <div class="ant-popover-arrow"></div>
                      <div class="ant-popover-inner">
                        <div class="ant-popover-inner-content">
                          <span
                            >测试测试测试测试测试测试测试测试测试测试测试测试测试</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="xt-font-size-sm xt-text-grey">17:26</div>
            </div>

            <!-- 编辑框 -->
            <a-affix :offset-bottom="0" :target="() => this.$refs.main">
              <div class="xt-my-letter-main-bottom">
                <xt-editor
                  @submit="onSubmit"
                  class="xt-my-letter-editor"
                  buttonText="发送"
                  :editorOptions="editorSettings"
                />
              </div>
            </a-affix>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import { Modal } from "ant-design-vue";
import moment from "moment";

@Component({
  scrollToTop: true,
  components: {},
})
export default class PageView extends Vue {
  defaultActiveKey = 1;
  activeKey = 1;
  editorSettings = {
    modules: {},
  };

  data = [
    {
      title: "欢迎来到暄桐教室",
      message:
        "暄桐教室基于中式文人审美，教授以书法为主的传统文化与技艺，开设与中国传统文化相关的美育课程，推崇非功利的学习态度，教授零基础的成年人研习书法与传统，完成写下第一笔到到篆、隶、真、行、草各个书体的系统学习。教室认为写字是一种生活方式，师生共同以书法为原点延展深入传统与艺术的种种乐趣，探索着心手相应，知行合一的可能。",
      sendTime: "14:47",
    },
    {
      title: "您已注册成功",
      message: "您已注册成功，希望在暄桐玩儿的开心哦~",
      sendTime: "2019-12-01T14:47:27.000+0000",
    },
    {
      title: "同学好，快要上课啦~",
      message:
        '<p><span><span style="font-size:14px"><span style="color:#999999">同学好，快要上课啦，《</span><span style="color:#b49876">入门课|写字旅行攻略</span><span style="color:#999999">》课程的第</span><span style="color:#b49876">临时课程</span><span style="color:#999999">节直播课，《</span><span style="color:#b49876">开学见面</span><span style="color:#999999">》上课时间为：</span><span style="color:#b49876">2019-12-03 19:45:00</span><span style="color:#999999">，调好闹钟，我们课上见：）</span></span></span></p>',
      sendTime: "2019-12-03T18:11:01.000+0000",
    },
  ];
  tabsChange(activeKey) {
    this.activeKey = activeKey;
  }
  onSearch() {}
  onSubmit() {}
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less">
@pageclass: .xt-my-letter;
@height: 538px;
@{pageclass} {
  &-tabs.ant-tabs {
    height: @height;
    background-color: #fafafa;
    .ant-tabs-bar.ant-tabs-left-bar {
      margin: 0;
      width: 100%;
      .ant-tabs-tab {
        padding: 0;
        margin: 0;
      }
      .ant-tabs-tab.ant-tabs-tab-active {
        background-color: #f5f2ee;
      }
    }
  }
  &-tab-search {
    padding: 10px 20px;
    background-color: #fafafa;
  }
  &-tab-item {
    display: flex;
    padding: 10px 20px;
  }
  &-popover {
    .ant-popover {
      position: relative;
      z-index: auto;
    }
    .ant-popover-content {
      .ant-popover-arrow {
        border-color: #eee6db !important;
        box-shadow: none !important;
      }
      .ant-popover-inner {
        background-color: #eee6db;
        box-shadow: none;
        max-width: 260px;
      }
    }
  }
}
</style>
<style lang="less" scoped>
@height: 590px;
@pageclass: .xt-my-letter;
@{pageclass} {
  &-tab-warp {
    height: @height;
  }
  &-tab {
    position: relative;
    height: @height;
    overflow-y: scroll;
    background-color: #fafafa;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  &-tab-pane {
    padding: 0;
    border: 1px solid red;
  }
  &-tab-item {
    display: flex;
    padding: 10px 20px;
  }
  &-tab-active {
    background-color: #f5f2ee;
  }
  &-main {
    position: relative;
    height: @height;
    overflow-y: scroll;
    overflow-x: hidden;
    background-color: #f9f6f2;
  }
  &-main-title {
    padding: 14px 20px;
    background-color: #f9f6f2;
    // border: 1px solid red;
  }
  &-main-bottom {
    width: 100%;
    box-sizing: border-box;
    background-color: #f9f6f2;
  }
  // &-editor {
  // }
}
</style>
