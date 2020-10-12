<template>
  <a-list class="xt-content" item-layout="vertical" :data-source="dataSource">
    <a-list-item slot="renderItem" slot-scope="item">
      <h3 v-text="item.classhourName + item.homeworkTitle"></h3>
      <a-row type="flex" justify="space-around" align="middle">
        <a-col :span="20">
          来自
          <nuxt-link :to="`/course/${item.courseId}`">
            《<span v-text="item.courseName"></span>》
          </nuxt-link></a-col
        >
        <a-col :span="4" class="xt-text-align-right">
          <a-button
            type="primary"
            v-if="item.suned == 0"
            class="ant-btn-yellow ant-button-round"
            @click="onSunWork(item)"
          >
            晒作业
          </a-button>
          <a-button
            type="primary"
            v-else
            class="ant-btn-line-yellow ant-button-round"
            >已晒过</a-button
          >
        </a-col>
      </a-row>
      <div v-html="formatFace(item.content)"></div>
      <xt-nine
        size="120"
        thumb="waterThumbUrl"
        :dataSource="item.picList || []"
      />
      <div v-if="getPicLength(item.picList) > 0" class="xt-font-size-sm">
        共<span v-text="getPicLength(item.picList)"></span>张
      </div>
      <a-row type="flex" justify="space-around" align="middle">
        <a-col :span="14">
          <time
            v-dateFormat="item.createTime"
            format="YYYY-MM-DD HH:mm"
            fromNow
          />
        </a-col>
        <a-col :span="10" class="xt-text-align-right" v-if="item.reviewed == 1">
          <span v-text="item.reviewUserName"></span>助教已评阅作业
          <Reply @sun="onSunWork" :dataSource="item" />
        </a-col>
        <a-col :span="10" class="xt-text-align-right" v-else>
          <a-popconfirm
            title="作业确定删除吗？"
            ok-text="确认"
            cancel-text="取消"
            @confirm="onDelWork(item)"
          >
            <a-button type="link" icon="delete">删除作业</a-button>
          </a-popconfirm>
        </a-col>
      </a-row>
    </a-list-item>
  </a-list>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import lodash from "lodash";
import { Observer } from "mobx-vue";
import { Context } from "@nuxt/types";
import Reply from "./reply.vue";

@Component({
  components: { Reply },
})
export default class PageView extends Vue {
  @Prop({ default: true }) loading;
  @Prop({ default: [] }) dataSource;
  @Prop({ default: "key" }) rowKey;

  // 获取图片个数
  getPicLength(item) {
    if (lodash.isEmpty(item)) return 0;
    return item.length;
  }

  /**
   * 晒作业
   */
  async onSunWork(item) {
    this.$emit("sun", item);
  }

  /**
   * 删除作业
   */
  async onDelWork(item) {
    this.$emit("del", item);
  }

  mounted() {}
  updated() {}
  destroyed() {}
}
</script>