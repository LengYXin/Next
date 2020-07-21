<template>
  <div class="xt-header-user">
    <span>搜索</span>
    <span>消息</span>
    <userModal text="登录" />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import userModal from "./userModal.vue";
@Component({
  components: { userModal }
})
export default class extends Vue {
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scoped>
.xt-header-user {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
}
</style>

