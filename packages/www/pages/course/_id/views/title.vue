<template>
  <div>
    <h1 v-text="PageStore.details.courseName"></h1>
    <Signup :give="true" :id="PageStore.details.courseId" />
    <Signup :id="PageStore.details.courseId" />
    <nuxt-link to="/homework">
      <span>交作业</span>
    </nuxt-link>
    <nuxt-link to="/payment">
      <span>支付</span>
    </nuxt-link>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import { Observer } from "mobx-vue";
import Signup from "../../views/signup.vue";
import { computed } from "mobx";
@Observer
@Component({
  components: { Signup },
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