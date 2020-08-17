
<template>
  <a-button @click.prevent.stop="onSignup" slot="actions" type="primary">
    <span v-t="text"></span>
    <a-modal  :visible="visible" @ok="onOk" @cancel="onCancel">
      <div v-text="id"></div>
    </a-modal>
  </a-button>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import lodash from "lodash";
import { Observer } from "mobx-vue";
import { Context } from "@nuxt/types";
@Observer
@Component({
  components: {},
})
export default class PageView extends Vue {
  @Prop({ default: false }) give;
  @Prop({ required: true }) id;
  visible = false;
  get text() {
    if (this.give) {
      return "give";
    }
    return "signup";
  }
  get Pagination() {
    return this.$store.$storeCourse.Pagination;
  }
  get PageStore() {
    return this.$store.$storeCourse;
  }
  onSignup() {
    this.visible = true;
    console.log("LENG: PageView -> onSignup -> this", this);
  }
  onOk() {
    this.visible = false;
  }
  onCancel() {
    this.visible = false;
  }
  created() {}
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scoped>
</style>
<i18n>
{
  "en": {
    "give": "Give to others",
    "signup": "Sign up now"
  },
  "zh": {
    "give": "赠课给他人",
    "signup": "立即报名"
  }
}
</i18n>