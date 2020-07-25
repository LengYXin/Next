<template>
  <div class="xt-content">
    <a-tabs default-active-key="1">
      <a-tab-pane key="1">
        <span slot="tab">
          <a-icon type="loading" />
          <span>邮箱</span>
        </span>
      </a-tab-pane>
      <a-tab-pane key="2">
        <span slot="tab">
          <a-icon type="loading" />
          <span>手机号</span>
        </span>
      </a-tab-pane>
    </a-tabs>
    <a-row :gutter="16">
      <a-col v-for="item in 12" :key="item" :span="6">
        <a-card :bordered="false">
          <img v-lazy />
        </a-card>
      </a-col>
    </a-row>
    <a-pagination :default-current="6" :total="500" />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import { Modal } from "ant-design-vue";
@Component({
  components: {},
})
export default class PageView extends Vue {
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style>
</style>
