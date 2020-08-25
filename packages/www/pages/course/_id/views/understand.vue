/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:02:27
 * @modify date 2020-08-05 14:02:27
 * @desc 开课了解
 */
<template>
  <div>
    <a-button type="link" @click="onVisible(true)" v-t="locale.link">开课前需要了解什么</a-button>
    <a-modal :visible="visible" @cancel="onVisible(false)" :footer="null" width="700px">
      <div>开课前请了解</div>
    </a-modal>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import { Modal } from "ant-design-vue";
@Component({
  components: {},
})
export default class PageView extends Vue {
  get PageStore() {
    return this.$store.$storeCourse.Details;
  }
  visible = false;
  onVisible(visible) {
    this.visible = visible;
  }
  get locale() {
    return {
      link: "link",
    };
  }
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scoped>
</style>
<i18n lang="json">
{
  "en": {
    "link": "What do you need to know before class"
  },
  "zh": {
    "link": "开课前需要了解什么"
  }
}
</i18n>