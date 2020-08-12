/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:16:32
 * @modify date 2020-08-05 14:16:32
 * @desc [description]
 */
<template>
  <div>
    <a-popover placement="rightTop" trigger="click">
      <template slot="content">
        <xt-face @select="onAddFace" />
      </template>
      <a-icon type="smile" />
    </a-popover>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import lodash from "lodash";
@Component({
  components: {},
})
export default class extends Vue {
  // 富文本
  @Prop() quill;
  onAddFace(face) {
    this.quill.insertText(
      this.quill.getSelection() || this.quill.getLength() - 1,
      face.value
    );
  }
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scoped>
</style>
