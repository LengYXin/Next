
<template>
  <div class="xt-content">
    <a-list class="test-list" item-layout="horizontal" :data-source="dataSource">
      <a-list-item slot="renderItem" slot-scope="item">
        <a-list-item-meta>
          <h1 slot="title">
            <span v-text="item"></span>
          </h1>
          <h2 slot="description">
            <span v-t="item"></span>
          </h2>
        </a-list-item-meta>
      </a-list-item>
    </a-list>
    <xt-dplayer :options="dplayer" />
    <xt-editor v-model="editor" :editorOptions="editorSettings" />
    <xt-editor class="xt-editor-single" v-model="editor" :editorOptions="editorSettings" />
    <div>
      <h1>评论</h1>
      <xt-comment :comment="{content:editor}">
        <template slot="actions">
          <xt-action @click="onLike" />
          <xt-action title="回复" />
        </template>
        <template slot="overlay">
          <a-menu>
            <a-menu-item>
              <a href="javascript:;">1st menu item</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">2nd menu item</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">3rd menu item</a>
            </a-menu-item>
          </a-menu>
        </template>
        <!-- <xt-editor /> -->
      </xt-comment>
    </div>
    <ul>
      <li>
        <h1>
          时间
          <time v-dateFormat="dataTime" format="YYYY年MM月DD日" />
          <a-button @click="onUpdateTime">更改</a-button>
        </h1>
      </li>
      <li>
        <time v-dateFormat="dataTime" format="YYYY-MM-DD HH:mm:ss" fromNow interval/>
      </li>
      <li>
        <time v-dateFormat="dataTime" format="YYYY-MM-DD HH:mm:ss" />
      </li>
      <li>
        <!-- interval 表示 开启倒计时 -->
        <time v-dateFormat="dataTime" format="YYYY-MM-DD HH:mm:ss" interval />
      </li>
      <li></li>
    </ul>
    <xt-qrcode options="https://www.baidu.com/?tn=64075107_1_dg" />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import { Observer } from "mobx-vue";
import lodash from "lodash";
import { Context } from "@nuxt/types";
@Observer
@Component({
  components: {},
})
export default class PageView extends Vue {
  editor = "[骷髅][右哼哼][抓狂][喵喵][doge][吃瓜]";
  dataSource = [
    "give",
    "signup",
    ...lodash.keys(this.$store.$locale.localeMessages.zh),
  ];
  editorSettings = {
    modules: {
      // imageDrop: true,
      // clipboard: {
      //   matchers: [[Node.ELEMENT_NODE, customMatcherA]],
      // },
    },
  };
  dplayer = {
    video: {
      url:
        "https://api.dogecloud.com/player/get.mp4?vcode=5ac682e6f8231991&userId=17&ext=.mp4",
      pic: "https://i.loli.net/2019/06/06/5cf8c5d9c57b510947.png",
      thumbnails: "https://i.loli.net/2019/06/06/5cf8c5d9c57b510947.png",
    },
  };
  dataTime = Date.now();
  onUpdateTime() {
    this.dataTime = Date.now();
  }
  onLike() {}
  created() {}
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scoped>
.test-list {
  max-height: 400px;
  overflow: auto;
}
</style>
<i18n>
{
  "en": {
    "give": "Give to others",
    "signup": "Sign up now"
  },
  "zh": {
    "give": "赠课给他人",
    "signup": "立即报名"
  }
}
</i18n>