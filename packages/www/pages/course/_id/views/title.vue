<template>
  <div>
    <h1 v-text="PageStore.details.courseName"></h1>
    <a-button slot="actions" type="primary" v-t="'give'">Primary</a-button>
    <a-button slot="actions" type="primary" v-t="'signup'">Primary</a-button>
    <nuxt-link to="/homework">
      <span>交作业</span>
    </nuxt-link>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import { Observer } from "mobx-vue";
import { computed } from "mobx";
@Observer
@Component({
  components: {},
})
export default class PageView extends Vue {
  get PageStore() {
    return this.$store.$storeCourse;
  }
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style>
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