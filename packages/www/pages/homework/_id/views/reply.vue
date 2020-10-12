<!--
 * @Author: Erlin
 * @CreateTime: 2020-10-12 11:12:19
 * @LastEditors: Erlin
 * @LastEditTime: 2020-10-12 11:53:31
 * @Description: 
-->
<template>
  <div class="xt-homework-id-reply">
    <div v-for="item in dataSource.commentResultList" :key="item.id">
      <div v-if="item.userType == 2">
        <a-row type="flex" justify="start" align="middle" :gutter="[12, 0]">
          <a-col flex="40px">
            <a-avatar size="large" icon="user" />
          </a-col>
          <a-col flex="auto">
            <div><span v-text="item.userNickname"></span>助教</div>
            <div>
              <time
                v-dateFormat="item.createTime"
                format="YYYY-MM-DD HH:mm"
                fromNow
              />
            </div>
          </a-col>
        </a-row>
        <div class="xt-homework-id-reply-content" v-html="item.content"></div>
      </div>
      <div v-else>
        <a-row type="flex" justify="end" align="middle" :gutter="[12, 0]">
          <a-col flex="auto" class="xt-text-align-right">
            <div v-text="item.userNickname"></div>
            <div>
              <time
                v-dateFormat="item.createTime"
                format="YYYY-MM-DD HH:mm"
                fromNow
              />
            </div>
          </a-col>
          <a-col flex="40px">
            <a-avatar size="large" :src="item.userHeader" alt="userHeader" />
          </a-col>
        </a-row>
        <div class="xt-text-align-right">
          <div class="xt-homework-id-reply-content" v-html="item.content"></div>
        </div>
      </div>
    </div>

    <div class="xt-homework-id-reply-bottom">
      <xt-editor
        @submit="onSubmit"
        class="xt-editor-single"
        buttonText="回复"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Ref } from "vue-property-decorator";
import { Context } from "@nuxt/types";
import { Observer } from "mobx-vue";
import lodash from "lodash";

@Observer
@Component({
  components: {},
})
export default class PageView extends Vue {
  @Prop({ default: {} }) dataSource;
  /**
   * 回复助教
   */
  async onSubmit(event) {
    let { courseId, homeworkFinishId } = this.dataSource;
    this.$emit("reply", { event, courseId, homeworkFinishId });
  }
  mounted() {}
}
</script>

<style lang="less">
.xt-homework-id-reply {
  display: inline;
  &-main {
    margin-bottom: 20px;
  }
  &-content {
    margin: 0 20px;
    display: inline-block;
    padding: 20px;
    background-color: #ffffff;
    p {
      margin-bottom: 0;
    }
  }
}
</style>