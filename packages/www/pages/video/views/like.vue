<template>
  <xt-action
    @click="onClick"
    title="0"
    icon="heart"
    :action="item.isLiked"
    :statistics="item.likeCount"
  />
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch, Inject } from "vue-property-decorator";
import { ControllerVideo } from "@xt/client";
import { Context } from "@nuxt/types";
import { Observer } from "mobx-vue";
import lodash from "lodash";
@Observer
@Component({
  components: {},
})
export default class PageView extends Vue {
  @Prop({ default: {} }) item;
  @Inject("VideoStore")
  PageStore: ControllerVideo;
  onClick() {
    try {
      this.$InspectUser();
      this.PageStore.onLikes(this.item);
    } catch (error) {
      this.$message.warn({ content: error, key: error });
    }
  }
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
