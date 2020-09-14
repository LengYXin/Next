/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:16:32
 * @modify date 2020-08-05 14:16:32
 * @desc 检查登录状态
 */
<template>
  <div>
    <!-- 已经登录 -->
    <slot v-if="PageStore.loggedIn"></slot>
    <!-- 没有登录 -->
    <slot v-else name="not">
      <div class="xt-inspect-center">
        <van-button type="primary" @click="PageStore.onToggleVisible(true)">请登录</van-button>
      </div>
    </slot>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import lodash from "lodash";
import { Observer } from "mobx-vue";
@Observer
@Component({
  components: {},
})
export default class extends Vue {
  /**
   * 检查用户 不通过 唤起 登录窗口
   */
  @Prop({ default: false }) inspect: any;
  get isInspect() {
    return lodash.includes(["", "true", true], this.inspect);
  }
  get PageStore() {
    return this.$store.$storeUser;
  }
  created() {
    try {
      console.log("LENG: extends -> created -> this.isInspect", this.isInspect)
      this.$InspectUser(this.isInspect);
    } catch (error) {
      console.error("LENG: extends -> error", error);
    }
  }
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scoped>
.xt-inspect-center {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  min-height: 50vh;
}
</style>
