<template>
  <div class="xt-homework-reply">
    <a-button type="link" @click="onVisible(true)">去看看 ></a-button>
    <a-modal
      v-model="visible"
      title="助教老师说"
      :centered="true"
      :width="730"
      class="xt-homework-reply-modal"
    >
      <a-spin :spinning="PageStore.loading">
        <div class="xt-homework-reply-main">
          <h3 v-text="PageStore.dataSource.homeworkTaskTitle"></h3>
          <a-row type="flex" justify="space-around" align="middle">
            <a-col :span="20">
              来自
              <nuxt-link :to="`/course/${PageStore.dataSource.courseId}`">
                《<span v-text="PageStore.dataSource.courseName"></span>》
              </nuxt-link></a-col
            >
            <a-col :span="4" class="xt-text-align-right">
              <a-button
                type="primary"
                v-if="PageStore.dataSource.suned == 0"
                class="ant-btn-yellow ant-button-round"
                @click="onSunWork(PageStore.dataSource)"
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
          <div v-html="formatFace(PageStore.dataSource.content)"></div>
          <xt-nine
            size="120"
            thumb="waterThumbUrl"
            :dataSource="PageStore.dataSource.homeworkPicList || []"
          />
          <div class="xt-font-size-sm">
            共<span
              v-text="getPicLength(PageStore.dataSource.homeworkPicList)"
            ></span
            >张
          </div>
          <div>
            <time
              v-dateFormat="PageStore.dataSource.createTime"
              format="YYYY-MM-DD HH:mm"
              fromNow
            />
          </div>
        </div>

        <div v-for="item in PageStore.dataSource.commentList" :key="item.id">
          <div v-if="item.userType == 2">
            <a-row type="flex" justify="start" align="middle" :gutter="[12, 0]">
              <a-col flex="40px">
                <a-avatar size="large" icon="user" />
              </a-col>
              <a-col flex="auto">
                <div v-text="item.userNickname + '助教'"></div>
                <div>
                  <time
                    v-dateFormat="item.createTime"
                    format="YYYY-MM-DD HH:mm"
                    fromNow
                  />
                </div>
              </a-col>
            </a-row>
            <div class="xt-homework-reply-content" v-html="item.content"></div>
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
                <a-avatar
                  size="large"
                  :src="item.userHeader"
                  alt="userHeader"
                />
              </a-col>
            </a-row>
            <div class="xt-text-align-right">
              <div
                class="xt-homework-reply-content"
                v-html="item.content"
              ></div>
            </div>
          </div>
        </div>
      </a-spin>

      <template slot="footer">
        <div class="xt-homework-reply-bottom">
          <xt-editor
            @submit="onSubmit"
            class="xt-editor-single"
            buttonText="回复"
          />
        </div>
      </template>
    </a-modal>
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
  get MyWork() {
    return this.$store.$my.MyWork;
  }
  get PageStore() {
    return this.MyWork.Details;
  }
  visible = false;
  formInline: any = {};
  onVisible(visible) {
    this.visible = visible;
    this.onReset();
    if (visible) {
      this.onLoading();
    }
  }
  onReset() {
    this.PageStore.onReset();
  }

  onLoading() {
    this.PageStore.onLoading({ id: this.dataSource.homeworkFinishId });
  }

  // 获取图片个数
  getPicLength(item) {
    if (lodash.isEmpty(item)) return 0;
    return item.length;
  }

  /**
   * 晒作业
   */
  async onSunWork(item) {
    try {
      await this.MyWork.onSunWork(item, false);
      await this.$emit("sun", this.dataSource);
      this.$message.success({
        content: "晒作业成功",
        key: "sunHomeworkSuccess",
      });
    } catch (error) {
      this.$message.warning({ content: error, key: "sunHomeworkErr" });
    }
  }

  /**
   * 回复助教
   */
  async onSubmit(event) {
    try {
      let { singleCourseId, id } = this.PageStore.dataSource;
      await this.MyWork.onReply({
        homeworkId: id,
        courseId: singleCourseId,
        replyContent: event.html,
        replyContentNum: event.length,
      });
      event.onReset();
      this.onLoading();
    } catch (error) {
      this.$message.warning({ content: error, key: "onReply" });
    }
  }
  mounted() {}
}
</script>
<style lang="less">
.xt-homework-reply-modal {
  .ant-modal-content {
    background-color: #fdfcfa;
  }
  .ant-modal-body {
    max-height: calc(85vh - 400px);
    overflow-y: auto;
  }
}
.xt-homework-reply-bottom {
  .ant-row.ant-form-item {
    margin: 0;
  }
}
</style>
<style lang="less" scope>
.xt-homework-reply {
  display: inline;
  //   &-warp {
  //     box-sizing: border-box;
  //     max-height: 700px;
  //     overflow-y: auto;
  //   }
  &-main {
    margin-bottom: 20px;
  }
  &-content {
    margin: 0 20px;
    display: inline-block;
    padding: 20px;
    background-color: #ffffff;
  }
  &-bottom {
    width: 100%;
  }
}
</style>