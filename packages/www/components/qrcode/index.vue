/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:16:32
 * @modify date 2020-08-05 14:16:32
 * @desc 二维码
 */
<template>
  <div class="xt-qrcode">
    <img class="xt-qrcode-img" :src="src" />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import lodash from "lodash";
import qrcode from "qrcode";
@Component({
  components: {},
})
export default class extends Vue {
  // https://www.npmjs.com/package/qrcode#qr-code-options
  @Prop({ required: true }) options;
  src = null;
  onCreate() {
    if (this.options) {
      qrcode.toDataURL(this.options, (err, src) => {
        this.src = src;
      });
    }
  }
  created() {
    
  }
  @Watch("options")
  onWatch() {
    this.onCreate();
  }
  mounted() {
    this.onCreate();
  }
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scoped>
.xt-qrcode {
  &-img {
    width: 100%;
    height: 100%;
  }
}
</style>
