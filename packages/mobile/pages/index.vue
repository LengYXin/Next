/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:17:41
 * @modify date 2020-08-05 14:17:41
 * @desc [description]
 */
<template>
  <div class="xt-home">
    <van-button class="van-button" type="primary">主要按钮</van-button>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import { Observer } from "mobx-vue";
@Observer
@Component({
  name: "PageIndex",
  components: {
  },
})
export default class PageIndex extends Vue {
  created() {}
  mounted() {
    console.log("LENG: PageView -> mounted -> this", this);
  }
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scoped>
.van-button{
  // background: @red;
}
</style>
