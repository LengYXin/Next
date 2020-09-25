/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:16:12
 * @modify date 2020-08-05 14:16:12
 * @desc 管理
 */
<template>
  <a-list class="lyx-manage" :data-source="dataSource">
    <a-list-item slot="renderItem" slot-scope="item">
      <a slot="actions">
        <i
          class="lyx-manage-static"
          :class="{ 'lyx-manage-static-true': item.static }"
        />
      </a>
      <a-list-item-meta description="管理员介绍">
        <a slot="title" v-text="item.name"></a>
        <a-avatar
          slot="avatar"
          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        />
      </a-list-item-meta>
    </a-list-item>
    <a-row slot="header">
      <a-col :span="16"> 管理员 </a-col>
      <a-col :span="8">
        <a-space size="large">
          <div>
            <i class="lyx-manage-static lyx-manage-static-true" />
            9人
          </div>
          <div>
            <i class="lyx-manage-static" />
            6人
          </div>
        </a-space>
      </a-col>
    </a-row>
  </a-list>
</template>
<script lang="ts">
import lodash from "lodash";
import { Component, Prop, Vue, Provide, Emit } from "vue-property-decorator";
import { Observer } from "mobx-vue";
@Observer
@Component({
  components: {},
})
export default class extends Vue {
  dataSource = [
    { key: 1, name: "书童", static: true },
    { key: 2, name: "书童", static: false },
    { key: 3, name: "书童", static: true },
    { key: 4, name: "书童", static: false },
    { key: 5, name: "书童", static: true },
  ];
  mounted() {}
  created() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" >
.lyx-manage {
  background: #fff;
  .ant-spin-container {
    max-height: 250px;
    overflow: auto;
  }
  &-static {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 10px;
    &-true {
      background: #6dd400;
    }
    background: #fa6400;
  }
}
</style>