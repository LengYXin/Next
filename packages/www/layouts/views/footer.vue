<template>
  <a-row class="xt-footer" type="flex">
    <a-col :span="9">
      <a-descriptions class="xt-footer-descriptions" layout="vertical" :column="2">
        <a-descriptions-item>
          <span slot="label" v-t="locale.des_officialAccount"></span>
          <img v-lazy class="xt-footer-orcode" />
        </a-descriptions-item>
        <a-descriptions-item>
          <span slot="label" v-t="locale.des_sinaWeibo"></span>
          <img v-lazy class="xt-footer-orcode" />
        </a-descriptions-item>
      </a-descriptions>
    </a-col>
    <a-col :span="15">
      <a-descriptions class="xt-footer-descriptions" layout="vertical">
        <a-descriptions-item>
          <span slot="label" v-t="locale.des_xt"></span>
        </a-descriptions-item>
        <a-descriptions-item>
          <span slot="label" v-t="locale.des_contactUs"></span>
        </a-descriptions-item>
        <a-descriptions-item>
          <span slot="label" v-t="locale.des_copyright"></span>
        </a-descriptions-item>
      </a-descriptions>
    </a-col>
  </a-row>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
@Component({
  components: {},
})
export default class extends Vue {
  get locale() {
    return this.$EnumLocaleDescriptions;
  }
  onSubmit() {}
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scoped>
.xt-footer {
  // height: 250px;
}
.xt-footer-orcode {
  width: 80px;
  height: 80px;
}
</style>
<style lang="less" >
.xt-footer-descriptions {
  .ant-descriptions-item {
    text-align: center;
  }
  .ant-descriptions-item-colon::after {
    display: none;
  }
}
</style>

