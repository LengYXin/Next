/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:17:41
 * @modify date 2020-08-05 14:17:41
 * @desc [description]
 */
<template>
  <van-form v-if="active" @submit="onSubmit">
    <template v-if="isPhone">
      <van-field
        name="phone"
        label="手机号"
        placeholder="手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
      />
      <van-field
        name="code"
        label="验证码"
        placeholder="验证码"
        :rules="[{ required: true, message: '请填写验证码' }]"
      >
        <template #button>
          <van-button size="small" type="primary">发送验证码</van-button>
        </template>
      </van-field>
    </template>
    <template v-else>
      <van-field
        name="email"
        label="邮箱"
        placeholder="邮箱"
        :rules="[{ required: true, message: '请填写邮箱' }]"
      />
      <van-field
        name="code"
        label="验证码"
        placeholder="验证码"
        :rules="[{ required: true, message: '请填写验证码' }]"
      />
    </template>

    <div>
      <van-button round block type="info" native-type="submit">提交</van-button>
    </div>
  </van-form>
  <div v-else>
    <van-button block type="info" @click="onActive('phone')">大陆手机号</van-button>
    <van-divider />
    <van-button block type="info" @click="onActive('email')">海外邮箱</van-button>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Watch } from "vue-property-decorator";
import { Observer } from "mobx-vue";
import lodash from "lodash";
@Observer
@Component({
  name: "PageSignin",
  components: {},
})
export default class extends Vue {
  active = lodash.get(this.$route.query, "active", 0);
  get isPhone() {
    return lodash.eq(this.active, "phone");
  }
  async onSubmit(values) {
    try {
      // 验证账号密码
      await this.$store.$storeUser.onLogin(values.username, values.password);
      // 刷新页面
      window.location.reload();
    } catch (error) {}
  }
  onActive(active) {
    this.$router.push({ query: { active } });
  }
  @Watch("$route.query.active")
  updateActive() {
    this.active = lodash.get(this.$route.query, "active", 0);
  }
  created() {}
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scoped>
.xt-login-wx {
  height: calc(100vh - @tabbar-height);
}
</style>
