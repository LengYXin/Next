
<template>
  <div class="xt-content">
    <a-divider>翻译列表</a-divider>
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
    <a-divider>视频</a-divider>
    <xt-dplayer :options="dplayer" />
    <a-divider>富文本</a-divider>
    <xt-editor :rules="{requiredFile:true}"  @submit="onSubmit" v-model="editor" :editorOptions="editorSettings" />
    <a-divider></a-divider>
    <xt-editor
      @submit="onSubmit"
      class="xt-editor-single"
      v-model="editor"
      :editorOptions="editorSettings"
    />
    <a-divider></a-divider>
    <xt-editor @submit="onSubmit" buttonText="晒作业">
      <a-checkbox>分享朋友圈</a-checkbox>
    </xt-editor>
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
    <a-divider>时间显示</a-divider>
    <ul>
      <li>
        <h1>
          时间
          <time v-dateFormat="dataTime" format="YYYY年MM月DD日" />
          <a-button @click="onUpdateTime">更改</a-button>
        </h1>
      </li>
      <li>
        <time v-dateFormat="dataTime" format="YYYY-MM-DD HH:mm:ss" fromNow interval />
      </li>
      <li>
        <time v-dateFormat="dataTime" format="YYYY-MM-DD HH:mm:ss" />
      </li>
      <li>
        <!-- interval 表示 开启倒计时 -->
        <time v-dateFormat="dataTime" format="YYYY-MM-DD HH:mm:ss" interval />
      </li>
      <li>
        <a-statistic-countdown
          title="倒计时"
          :value="deadline"
          format="HH:mm:ss:SSS"
          @finish="onFinish"
        />
      </li>
    </ul>
    <a-divider>二维码</a-divider>

    <xt-qrcode options="https://www.baidu.com/?tn=64075107_1_dg" />
    <a-divider>图片验证</a-divider>
    <xt-img-code />
    <a-divider>图片裁剪</a-divider>
    <xt-img-cropper v-bind="cropper" @realTime="realTime" />
    <!-- <div v-html="cropperView.html"></div> -->
    <!-- <img :src="cropperView.url" style="" alt width="200" height="200" /> -->
    <div
      class="show-preview"
      :style="{'width': previews.w + 'px', 'height': previews.h + 'px',  'overflow': 'hidden',
    'margin': '5px'}"
    >
      <div :style="previews.div">
        <img :src="cropper.img" :style="previews.img" />
      </div>
    </div>
    <a-divider>图片查看</a-divider>
    <a-card v-viewer >
      <a-card-grid
        style="width:33.33%;text-align:center"
        v-for="item in imgs"
        :key="item.key"
      >
        <img alt="example" style="width:100%;" v-lazy="item.src" />
      </a-card-grid>
    </a-card>
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
  imgs = [
    {
      key: 1,
      src:
        "https://oss-free.xuantong.cn/picturePath/dc4e7ca6ddf67eb508d791346290cc36.jpg",
      title: "暄桐教室",
      description: "description",
    },
    {
      key: 2,
      src:
        "https://oss-free.xuantong.cn/picturePath/c1239a907d9a711e77cff133cd7d7a2b.jpg",
      title: "暄桐教室",
      description: "description",
    },
    {
      key: 3,
      src:
        "https://oss-free.xuantong.cn/picturePath/2f6f1cf683b96e28abbbea443136bdde.jpg",
      title: "暄桐教室",
      description: "description",
    },
    {
      key: 4,
      src:
        "https://oss-free.xuantong.cn/picturePath/2179e7d7362922244c5e99288a2465d7.jpg",
      title: "暄桐教室",
      description: "description",
    },
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
  deadline = Date.now() + 1000 * 10;
  onUpdateTime() {
    this.dataTime = Date.now();
  }

  cropper = {
    img: "/images/logo.png",
    size: 1,
    full: false,
    outputType: "png",
    canMove: true,
    fixedBox: false,
    original: false,
    canMoveBox: true,
    autoCrop: true,
    // 只有自动截图开启 宽度高度才生效
    autoCropWidth: 200,
    autoCropHeight: 200,
    centerBox: false,
    high: false,
    cropData: {},
    enlarge: 1,
    mode: "contain",
    maxImgSize: 3000,
    limitMinSize: [100, 100],
  };
  previews = {};
  realTime(data) {
    this.previews = data;
  }
  onFinish() {
    console.log("onFinish");
    this.$message.success("倒计时结束");
  }
  onSubmit(event) {
    console.log("LENG: PageView -> onSubmit -> event", event);
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