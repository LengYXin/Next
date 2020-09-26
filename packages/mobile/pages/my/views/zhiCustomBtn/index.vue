/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:17:41
 * @modify date 2020-08-05 14:17:41
 * @desc [description]
 */
<template>
  <van-cell title="宣统客服" is-link class="zhiCustomBtn" />
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import { Observer } from "mobx-vue";
declare var zc: any;
@Component({
  components: {},
})
export default class Page extends Vue {
  created() {
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
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scoped>
</style>
