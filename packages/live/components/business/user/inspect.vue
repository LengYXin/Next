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
      <div class="xt-flex-center">
        <a-button type="primary" @click="PageStore.onToggleVisible(true)">
          <span>请先登录暄桐官网</span>
        </a-button>
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
.xt-flex-center{
  height: 100vh;
}
</style>
