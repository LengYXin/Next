/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:16:32
 * @modify date 2020-08-05 14:16:32
 * @desc 富文本按钮
 */
<template>
  <a-row class="lyx-editor-toolbar" type="flex" :gutter="4">
    <a-col>
      <!-- 表情 -->
      <a-popover placement="rightTop" trigger="click">
        <template slot="content">
          <face @select="onAddFace" />
        </template>
        <span class="lyx-editor-span">
          <a-icon class="lyx-editor-icon" type="smile" />
          <span class="lyx-editor-icon-text">表情</span>
        </span>
      </a-popover>
      <a-divider type="vertical"></a-divider>
      <!-- 图片 -->
      <a-popover placement="rightTop" trigger="click">
        <template slot="content">
          <div class="lyx-editor-upload">
            <a-upload
              v-bind="uploadProps"
              :file-list="fileList"
              @change="onUploadChange"
              @remove="onRemove"
            >
              <div v-if="showUpload">
                <a-icon type="plus" />
              </div>
            </a-upload>
          </div>
        </template>
        <span class="lyx-editor-span lyx-editor-upload-span">
          <a-icon class="lyx-editor-icon" type="picture" />
          <span class="lyx-editor-icon-text">
            图片 (
            <span v-text="fileList.length"></span>/
            <span v-text="maxFile"></span>)
          </span>
        </span>
      </a-popover>
    </a-col>
    <a-col flex="1" class="lyx-editor-btns">
      <!-- 默认插槽位置 -->
      <slot v-bind:quill="quill"></slot>
      <a-divider type="vertical"></a-divider>
      <!-- 按钮插槽 -->
      <slot name="submit" v-bind:quill="quill">
        <a-button type="primary" v-text="buttonText" @click="onSubmitRules"></a-button>
      </slot>
    </a-col>
  </a-row>
</template>
<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import lodash from "lodash";
import face from "../face/index.vue";
@Component({
  components: {
    face,
  },
})
export default class extends Vue {
  // 富文本
  @Prop() quill;
  // 按钮文案
  @Prop({ default: "发布" }) buttonText;
  // 校验规则
  @Prop({}) rules;
  // 最大文件数量
  @Prop({ default: 9 }) maxFile;
  // 显示 上传按钮
  get showUpload() {
    return this.fileList.length < this.maxFile;
  }
  uploadProps = {
    action: "",
    listType: "picture-card",
    multiple: true,
    showUploadList: { showPreviewIcon: false, showRemoveIcon: true },
  };
  onAddFace(face) {
    this.quill.insertText(
      this.quill.getSelection() || this.quill.getLength() - 1,
      face.value
    );
  }
  onSubmitRules() {
    try {
      // 必填内容
      const required = lodash.get(this.rules, "required", false);
      //  必填文件
      const requiredFile = lodash.get(this.rules, "requiredFile", false);
      // 最大数
      const max = lodash.get(this.rules, "max", Number.MAX_SAFE_INTEGER);
      // 自定义校验 函数
      const validator = lodash.get(this.rules, "validator", () => true);

      const data = {
        fileList: lodash.cloneDeep(this.fileList),
        text: this.quill.getText(),
        html: this.quill.getHTML(),
        length: this.quill.getLength(),
        quill: this.quill,
        /** 重置内容 */
        onReset: () => {
          this.quill.root.innerHTML = "";
          this.fileList = [];
        },
      };
      if (required) {
        if (!/^[\s\S]*.*[^\s][\s\S]*$/.test(data.text)) {
          throw "内容必填";
        }
      }
      if (requiredFile) {
        if (data.fileList.length === 0) {
          throw "文件必填";
        }
      }
      if (max != Number.MAX_SAFE_INTEGER) {
        if (data.length > max) {
          throw "超过最大长度";
        }
      }
      if (validator(data, this.rules)) {
        this.onSubmit(data);
      }
    } catch (error) {
      this.$message.warning({ content: error, key: "quill_rules" });
    }
  }
  @Emit("submit")
  onSubmit(event) {
    return event;
  }
  onUploadChange({ fileList }) {
    this.fileList = fileList;
    if (!this.showUpload) {
      this.fileList.length = 9;
    }
  }
  onRemove() {}
  fileList = [];
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" >
// 单行样式
.lyx-editor-single.quillWrapper {
  position: relative;
  padding-right: 110px;
  .ql-editor {
    min-height: 44px;
    max-height: 66px;
    padding-right: 44px;
  }
  .lyx-editor-toolbar {
    position: absolute;
    right: 16px;
    bottom: 50%;
    // margin-bottom: 50%;
    transform: translateY(50%);
    padding: 0;
  }
  .lyx-editor-icon {
    margin-top: 4px;
  }
  .ant-divider,
  .lyx-editor-upload-span,
  .lyx-editor-icon-text {
    display: none;
  }
}
.lyx-editor-upload-hide {
  .lyx-editor-upload-span {
    display: none !important;
  }
}
// 图片上传
.lyx-editor-upload {
  width: 336px;
  max-height: 336px;
  overflow: hidden;
  .ant-upload-list-picture .ant-upload-list-item,
  .ant-upload-list-picture-card .ant-upload-list-item {
    padding: 0;
  }
  .anticon-plus {
    font-size: 60px;
  }
}
.lyx-editor-toolbar {
  padding-top: 16px;
  .lyx-editor-span {
    display: inline-block;
    cursor: pointer;
  }
  .lyx-editor-icon-text {
    display: inline-block;
    transform: translateY(-25%);
  }
  .ant-divider {
    background: transparent;
  }
  .lyx-editor-btns {
    text-align: right;
  }
}
</style>