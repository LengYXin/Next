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
        <div v-text="PageStore.UserInfo.nickName">点击登录</div>
      </div>
      <div slot="not" class="xt-flex-center" @click="onInspectUser">
        <van-image round fit="cover" width="90" height="90" />
        <div>点击登录</div>
      </div>
    </xt-inspect>
    <van-cell title="我的作业" is-link to="homework" />
    <van-cell title="我晒出的作业" is-link to="/homework/sundrying" />
    <van-cell title="我的订单" is-link />
    <van-cell title="宣统客服" is-link />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import { Observer } from "mobx-vue";
@Observer
@Component({
  components: {},
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
</script>
<style lang="less" scoped>
</style>
