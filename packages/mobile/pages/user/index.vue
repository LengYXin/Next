/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:17:41
 * @modify date 2020-08-05 14:17:41
 * @desc [description]
 */
<template>
  <xt-inspect inspect="false">
    <div>
      <van-nav-bar title="暄桐文房" />
      <van-image
        round
        fit="cover"
        width="90"
        height="90"
        :src="PageStore.UserInfo.headThumbnailUri"
      />
      <div v-text="PageStore.UserInfo.nickName">点击登录</div>
    </div>
    <div slot="not" @click="onInspectUser">
      <van-image round fit="cover" width="90" height="90" />
      <div>点击登录</div>
    </div>
  </xt-inspect>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import { Observer } from "mobx-vue";
@Observer
@Component({
  components: {},
})
export default class Page extends Vue {
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
</script>
<style lang="less" scoped>
</style>
