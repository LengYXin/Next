/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:17:41
 * @modify date 2020-08-05 14:17:41
 * @desc [description]
 */
<template>
  <van-form @submit="onSubmit">
    <van-field
      v-model="username"
      name="username"
      label="用户名"
      placeholder="用户名"
      :rules="[{ required: true, message: '请填写用户名' }]"
    />
    <van-field
      v-model="password"
      type="password"
      name="password"
      label="密码"
      placeholder="密码"
      :rules="[{ required: true, message: '请填写密码' }]"
    />
    <div style="margin: 16px;">
      <van-button round block type="info" native-type="submit">提交</van-button>
    </div>
  </van-form>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import { Observer } from "mobx-vue";
import lodash from "lodash";
@Observer
@Component({
  components: {},
})
export default class Page extends Vue {
  active = lodash.get(this.$route.query, "active", "phone");
  username = "";
  password = "";
  async onSubmit(values) {
    try {
      await this.$store.$storeUser.onLogin(values.username, values.password);
      // this.$router.back();
      window.location.reload();
      // lodash.delay(() => window.location.reload(), 100);
    } catch (error) {}
  }
  created() {
    // 已登录 返回前一页
    try {
      if (this.$store.$global.NODE_ENV === "development") {
        this.username = "16619998681";
        this.password = "leng147896325";
      }
      this.$InspectUser(false);
      if (window.history.length > 1) {
        this.$router.back();
      }
      this.$router.replace({ name: "index" });
    } catch (error) {}
  }
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scoped>
</style>
