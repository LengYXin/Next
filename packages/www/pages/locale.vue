
<template>
  <div class="xt-content">
    <a-list class="test-list" item-layout="horizontal" :data-source="dataSource">
      <a-list-item slot="renderItem" slot-scope="item">
        <a-list-item-meta>
          <h1 slot="title">
            <span v-text="item"></span>
          </h1>
          <h2 slot="description">
            <span v-t="item"></span>
          </h2>
        </a-list-item-meta>
      </a-list-item>
    </a-list>
    <xt-editor :editorOptions="editorSettings" />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import { Observer } from "mobx-vue";
import lodash from "lodash";
import { Context } from "@nuxt/types";
@Observer
@Component({
  components: {},
})
export default class PageView extends Vue {
  dataSource = [
    "give",
    "signup",
    ...lodash.keys(this.$store.$locale.localeMessages.zh),
  ];
  editorSettings = {
    modules: {
      // imageDrop: true,
      // clipboard: {
      //   matchers: [[Node.ELEMENT_NODE, customMatcherA]],
      // },
    },
  };
  created() {}
  mounted() {
    console.log(this.dataSource);
  }
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scoped>
.test-list {
  max-height: 60vh;
  overflow: auto;
}
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