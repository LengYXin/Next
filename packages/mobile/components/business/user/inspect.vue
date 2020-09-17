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
    <div v-if="PageStore.loggedIn" :key="inspectKey">
      <slot></slot>
    </div>
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
  /**
   * 用于刷新认证的key
   */
  inspectKey = Date.now();
  inspectName = this.$route.name;
  get isInspect() {
    return lodash.includes(["", "true", true], this.inspect);
  }
  get PageStore() {
    return this.$store.$storeUser;
  }
  onInspectUser() {
    try {
      const user = this.$InspectUser(this.isInspect);
      console.warn("LENG: User", user);
    } catch (error) {
      console.error("LENG: extends -> error", error);
    }
  }
  created() {
  }
  @Watch("$route")
  RouteUpdate(to, from, next) {
    if (lodash.eq(this.$route.name, this.inspectName)) {
      // this.inspectKey = Date.now();
      this.onInspectUser();
    }
  }
  mounted() {
    this.onInspectUser();
  }
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
