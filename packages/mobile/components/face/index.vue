/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:16:12
 * @modify date 2020-08-05 14:16:12
 * @desc 表情
 */
<template>
  <div class="xt-text-center">
    <van-image
      class="xt-face"
      v-for="face in faces"
      :key="face.value"
      :src="face.icon"
      @click="onFace(face)"
    />
  </div>
</template>

<script lang="ts">
import dplayer from "dplayer";
import lodash from "lodash";
import faces from "./face.json";
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
// Vue.filter("face", function (value) {
//   console.log("LENG: value", value);
//   if (!value) return "";
//   return value;
// });
/**
 * 转换 表情
 */
Vue.prototype.formatFace = function (html: string) {
  if (html) {
    const fas = lodash.uniq(html.match(/\[([\s\S]+?)\]/g));
    fas.map((value) => {
      const face = lodash.find(faces, ["value", value]);
      if (face) {
        const reg = new RegExp(`(\\${value})`, "g");
        html = lodash.replace(
          html,
          reg,
          `<span class="van-image--round xt-face"><img src="${face.icon}"></span>`
        );
      }
    });
  }
  return html;
};
@Component({
  components: {},
})
export default class extends Vue {
  faces = faces;
  @Emit("select")
  onFace(face) {
    return face;
  }
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>

<style>
.xt-face.van-image {
  width: 24px !important;
  height: 24px !important;
  margin: 0 3px !important;
}
.xt-face,
p>img[src^='//img.t.sinajs.cn/'],
p>img[src^='http://img.t.sinajs.cn/'],
p>img[src^='https://img.t.sinajs.cn/']
{
  display: inline-block;
  width: 18px !important;
  height: 18px !important;
  margin: 0 2px !important;
  transform: translateY(3px);
}
</style>