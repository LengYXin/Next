<template>
  <div>
    <a-result :status="status" :title="error.message">
      <template #extra>
        <nuxt-link to="/" replace>
          <a-button type="primary">Back Home</a-button>
        </nuxt-link>
      </template>
    </a-result>
    <div v-show="redirect" class="xt-redirect">
      <a-spin class="xt-redirect-spin" size="large" />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import lodash from "lodash";
@Component({
  components: {},
})
export default class extends Vue {
  @Prop() error;
  get status() {
    if (this.error.statusCode === 200) {
      return "500";
    }
    return String(this.error.statusCode);
  }
  get path() {
    return this.$route.path;
  }
  get query() {
    return this.$route.query;
  }
  redirect = false;
  created() {
    console.log("LENG: extends -> created -> this", this);
    if (this.status === "404") {
      if (lodash.has(this.query, "redirect")) {
        return;
      }
      if (lodash.includes(this.path, "/mobile/")) {
        this.toPage("/mobile/");
      }
    }
  }
  toPage(name) {
    this.redirect = true;
    const router = this.$router.resolve({
      path: `${name}redirect`,
      query: {
        redirect: this.$route.fullPath,
      },
    });
    window.location.replace(router.href);
    // const html = await this.$ajax
    //   .request<string>(
    //     {
    //       url: "/mobile/index.html",
    //       body: { t: Date.now() },
    //       headers: { "Content-Type": "text/html" },
    //       responseType: "text",
    //     },
    //     { target: "/" }
    //   )
    //   .toPromise();
    // const head = lodash.head(/<head(\s*)>(.|\r|\n)*<\/head>/.exec(html));
    // const body = lodash.head(/<body(\s*)>(.|\r|\n)*<\/body>/.exec(html));
    // // lodash.unset(window, "$nuxt");
    // // lodash.unset(window, "$xt");
    // if (head && body) {
    //   this.$router.replace({
    //     query: { redirect: "true" },
    //   });
    //   document.head.innerHTML = head;
    //   document.body.innerHTML = body;
    // }
  }
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scoped>
.xt-redirect {
  background: white;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2000;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
