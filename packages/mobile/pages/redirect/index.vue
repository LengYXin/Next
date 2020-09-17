/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:17:41
 * @modify date 2020-08-05 14:17:41
 * @desc [description]
 */
<template>
  <div></div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import lodash from "lodash";
@Component({
  components: {},
})
export default class PageRedirect extends Vue {
  get toPath() {
    return lodash.trimStart(
      lodash.get(this.$route.query as any, "redirect"),
      lodash.get(window, "__xt__env.base", process.env.base)
    );
  }
  created() {
    console.log("LENG: PageRedirect -> ", this);
    if (this.toPath) {
      this.$router.replace(`/${this.toPath}`);
    } else {
      this.$router.replace({ name: "index" });
    }
  }
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>

