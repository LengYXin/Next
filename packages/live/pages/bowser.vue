
<template>
  <div class="xt-content">
    <a-result status="warning" title="浏览器版本过低" sub-title="请使用以下浏览器">
      <template #extra>
        <a-row>
          <a-col :span="6" v-for="item in bowsers" :key="item.title">
            <a class="xt-font-size-xl" :href="item.url" target="__blank">
              <img class="bow-logo" :src="item.logo" />
              <div v-text="item.title">Chrome</div>
            </a>
          </a-col>
        </a-row>
      </template>
    </a-result>
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
  bowsers = [
    {
      title: "Chrome",
      url: "https://www.google.cn/chrome",
      logo: "https://www.google.cn/chrome/static/images/chrome-logo.svg",
    },
    {
      title: "Firefox",
      url: "http://www.firefox.com.cn/",
      logo:
        "https://www.firefox.com.cn/media/protocol/img/logos/firefox/browser/logo-lg.3d9087ac44e8.png",
    },
    {
      title: "360",
      url: "https://browser.360.cn/ee/",
      logo: "https://p0.ssl.qhmsg.com/t0183d516d5cc2b569c.png",
    },
    {
      title: "Edge",
      url: "https://www.microsoft.com/zh-cn/edge",
      logo:
        "https://dss2.bdstatic.com/6Ot1bjeh1BF3odCf/it/u=3915001226,2908983139&fm=74&app=80&f=PNG&size=f121,121?sec=1880279984&t=869e19cff9c0e4492bf39b26d02427bd",
    },
  ];
  created() {}
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scoped>
.xt-content {
  padding-top: 200px;
}
.bow-logo {
  width: 120px;
  height: 120px;
}
</style>