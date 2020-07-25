<template>
  <div class="xt-content">
    <a-row :gutter="16">
      <a-col v-for="item in 12" :key="item" :span="8">
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
