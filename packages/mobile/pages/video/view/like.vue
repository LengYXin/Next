<template>
  <van-grid-item :icon="icon" :text="String(item.likeCount)" @click.prevent.stop="onClick" />
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch, Inject } from "vue-property-decorator";
import { ControllerVideo } from "@xt/client";
import { Observer } from "mobx-vue";
import lodash from "lodash";
@Observer
@Component({
  components: {},
})
export default class PageView extends Vue {
  @Prop({ default: {} }) item;
  @Prop({ default: true }) list;
  get icon() {
    return this.item.isLiked ? "like" : "like-o";
  }
  get PageStore() {
    return this.$store.$storeVideo;
  }
  onClick() {
    try {
      try {
        this.$InspectUser();
      } catch (error) {
        return;
      }
      this.PageStore.onLikes(this.item, this.list);
    } catch (error) {
      this.$toast(error);
    }
  }
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
