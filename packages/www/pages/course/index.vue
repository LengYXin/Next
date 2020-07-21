<template>
  <a-list item-layout="horizontal" :data-source="data">
    <a-list-item slot="renderItem" slot-scope="item">
      <nuxt-link :to="`/course/${item.key}`">
        <a-list-item-meta
          description="Ant Design, a design language for background applications, is refined by Ant UED Team"
        >
          <a slot="title" href="https://www.antdv.com/">{{ item.title }}</a>
          <a-avatar
            slot="avatar"
            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
          />
        </a-list-item-meta>
      </nuxt-link>
    </a-list-item>
  </a-list>
</template>
<script lang="ts">
import Logo from "~/components/Logo.vue";
import dplayer from "~/components/dplayer/index.vue";
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import { Modal } from "ant-design-vue";
import PageStore from "./store";
@Component({
  components: { Logo, dplayer }
})
export default class PageView extends Vue {
  PageStore = new PageStore();
  data = [
    {
      key: 1,
      title: "Ant Design Title 1"
    },
    {
      key: 2,

      title: "Ant Design Title 2"
    },
    {
      key: 3,

      title: "Ant Design Title 3"
    },
    {
      key: 4,

      title: "Ant Design Title 4"
    }
  ];
  mounted() {
    console.log(this);
    this.PageStore.onText();
  }
  onTest() {
    Modal.confirm({ title: "测试" });
    this.$message.success("test");
  }
  updated() {}
  destroyed() {}
}
</script>
<style>
</style>
