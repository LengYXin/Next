/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:17:41
 * @modify date 2020-08-05 14:17:41
 * @desc [description]
 */
<template>
  <div>
    <xt-wechat-bowser>
      <van-nav-bar title="我的">
        <template #left>
          <van-icon name="search" size="18" />
        </template>
        <template #right>
          <van-icon name="search" size="18" />
        </template>
      </van-nav-bar>
      <van-cell slot="yes" title=" ">
        <template #icon>
          <van-icon name="search" size="18" />
        </template>
        <template #right-icon>
          <van-icon name="search" size="18" />
        </template>
      </van-cell>
    </xt-wechat-bowser>

    <xt-inspect inspect="false">
      <div class="xt-flex-center">
        <van-image
          round
          fit="cover"
          width="90"
          height="90"
          :src="PageStore.UserInfo.headThumbnailUri"
        />
        <div v-text="PageStore.UserInfo.nickName">姓名</div>
      </div>
      <van-cell title="我的作业" is-link :to="{ name: 'my-homework' }" />
      <van-cell
        title="我晒出的作业"
        is-link
        :to="{ name: 'my-sundrying' }"
      />
      <van-cell title="我的订单" is-link :to="{ name: 'my-order' }" />
      <!-- 未登录 -->
      <div slot="not">
        <div class="xt-flex-center" @click="onInspectUser">
          <van-image round fit="cover" width="90" height="90" />
          <div>点击登录</div>
        </div>
        <van-cell title="我的作业" is-link @click="onInspectUser" />
        <van-cell title="我晒出的作业" is-link @click="onInspectUser" />
        <van-cell title="我的订单" is-link @click="onInspectUser" />
      </div>
    </xt-inspect>
    <!-- 客服 -->
    <ZhiCustomBtn />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import { Observer } from "mobx-vue";
import ZhiCustomBtn from "./views/zhiCustomBtn/index.vue";
@Observer
@Component({
  name: "PageMy",
  asyncData(ctx) {
    if (ctx.store.$storeUser.loggedIn) {
      readyCustomer(ctx);
    }
  },
  components: { ZhiCustomBtn },
})
export default class Page extends Vue {
  get WechatBowser() {
    return this.$store.$global.WechatBowser;
  }
  get PageStore() {
    return this.$store.$storeUser;
  }
  onInspectUser() {
    try {
      this.$InspectUser();
    } catch (error) {}
  }
  created() {}
  mounted() {}
  updated() {}
  destroyed() {}
}
declare var zc: any;
// 客服接入
function readyCustomer(ctx) {
  (function (w: any, d, e, x?: HTMLScriptElement) {
    if (w[e]) {
      return;
    }
    w[e] = function () {
      w.cbk = w.cbk || [];
      w.cbk.push(arguments);
    };
    x = d.createElement("script");
    x.async = true;
    x.id = "zhichiScript";
    x.className = "zhiCustomBtn"; //该class绑定到自定义按钮上 第一步
    // ***为您的自定义域名
    x.src =
      "https://www.sobot.com/chat/frame/v2/entrance.js?sysnum=f2c2e254039745dfb3413702ef22c324";
    d.body.appendChild(x);
    x.addEventListener("load", (event) => {
      zc("config", {
        color: "009487",
        // custom_title: "暄桐客服",
        // manual: true, //设置成手动初始化
        custom: true,
      });
      zc("dynamic_ready");
    });
  })(window, document, "zc");
}
</script>
<style lang="less" scoped>
</style>
