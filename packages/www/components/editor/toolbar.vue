/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:16:32
 * @modify date 2020-08-05 14:16:32
 * @desc 富文本按钮
 */
<template>
  <a-row class="xt-editor-toolbar" type="flex" :gutter="4">
    <!-- <div ref="popover"></div> -->
    <a-col class="xt-flex xt-align-center">
      <!-- 表情 -->
      <a-popover placement="bottom" trigger="click">
        <template slot="content">
          <xt-face @select="onAddFace" />
        </template>
        <span class="xt-editor-span">
          <a-icon class="xt-editor-icon" type="smile" />
          <span class="xt-editor-icon-text">表情</span>
        </span>
      </a-popover>
      <a-divider type="vertical"></a-divider>
      <!-- 图片 -->
      <a-popover
        placement="bottom"
        trigger="click"
        overlayClassName="xt-editor-upload-popover"
      >
        <template slot="content">
          <div class="xt-editor-upload">
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
        <span class="xt-editor-span xt-editor-upload-span">
          <a-icon class="xt-editor-icon" type="picture" />
          <span class="xt-editor-icon-text">
            <span>图片 (</span><span v-text="fileList.length"></span>/<span
              v-text="maxFile"
            ></span
            >)
          </span>
        </span>
      </a-popover>
    </a-col>
    <a-col flex="1" class="xt-editor-btn-warp">
      <!-- 默认插槽位置 -->
      <slot v-bind:quill="quill"></slot>
      <!-- <a-divider type="vertical"></a-divider> -->
      <!-- 按钮插槽 -->
      <slot name="submit" v-bind:quill="quill">
        <a-button
          class="xt-editor-btn"
          type="yellow"
          v-text="buttonText"
          @click="onSubmitRules"
        ></a-button>
      </slot>
    </a-col>
  </a-row>
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
  getPopupContainer() {
    return this.$refs.popover;
  }
  uploadProps = {
    accept: "image/*",
    action: this.$store.$global.target + this.$EnumApiCurrency.UploadImg,
    listType: "picture-card",
    multiple: true,
    showUploadList: { showPreviewIcon: false, showRemoveIcon: true },
    name: "profile",
    // 上传开始前 计算 水印
    beforeUpload: (file) => {
      return new Promise((res, rej) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
          const img = new Image();
          img.src = event.target.result as any;
          img.onload = () => {
            const picWidth = Math.ceil((img.width / 1600) * 15);
            const picLong = Math.ceil((img.height / 1200) * 12);
            let wordSize = Math.ceil((img.height / 1200) * 18);
            if (wordSize <= 13) {
              wordSize = 13;
            }
            file.imgSize = {
              picWidth,
              picLong,
              wordSize,
            };
            res(file);
          };
        };
      });
    },
    data: (file) => {
      try {
        const user: any = this.$InspectUser(false);
        return {
          ...file.imgSize,
          isLocalThumb: true,
          nickName: user.nickName,
        };
      } catch (error) {}
    },
  };
  onAddFace(face) {
    this.quill.insertText(
      this.quill.getSelection() || this.quill.getLength() - 1,
      face.value
    );
    this.quill.scrollIntoView();
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
      const fileList = lodash.cloneDeep(this.fileList);
      const data = {
        fileList: fileList,
        fileResult: lodash.map(fileList, "response.result"),
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
      console.log("LENG: extends -> onSubmitRules -> data", data);
      if (required) {
        if (!/^[\s\S]*.*[^\s][\s\S]*$/.test(data.text)) {
          throw "内容必填";
        }
      }
      if (max != Number.MAX_SAFE_INTEGER) {
        if (data.length > max) {
          throw "超过最大长度";
        }
      }
      if (requiredFile) {
        if (data.fileList.length === 0) {
          throw "文件必填";
        }
      }
      if (lodash.some(data.fileList, ["status", "uploading"])) {
        throw "文件还在上传中";
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
.xt-editor-single.quillWrapper {
  position: relative;
  padding-right: 80px;
  .ql-editor {
    min-height: 44px;
    max-height: 66px;
    padding-right: 44px;
  }
  .xt-editor-toolbar {
    position: absolute;
    right: 16px;
    bottom: 50%;
    // margin-bottom: 50%;
    transform: translateY(50%);
    padding: 0;
  }
  .xt-editor-icon {
    margin-top: 4px;
    margin-right: 12px;
  }
  .ant-divider,
  .xt-editor-upload-span,
  .xt-editor-icon-text {
    display: none;
  }
}
.xt-editor-upload-hide {
  .xt-editor-upload-span {
    display: none !important;
  }
}
// 图片上传
.xt-editor-upload {
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

  .ant-upload-list-item-uploading-text {
    text-align: center;
  }
}
.xt-editor-upload-popover {
  .ant-popover-inner-content {
    padding-bottom: 0;
  }
}
.xt-editor-toolbar {
  padding-top: 12px;
  .xt-editor-span {
    font-size: 12px;
    // display: inline-block;
    cursor: pointer;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    line-height: 1;
  }
  .xt-editor-icon {
    color: @xt-yellow-6;
  }
  .xt-editor-icon-text {
    margin-left: 4px;
    display: inline-block;
    // transform: translateY(-25%);
  }
  .ant-divider {
    background: transparent;
  }
  .xt-editor-btn-warp {
    text-align: right;
  }
  // .xt-editor-btn {
  //   min-width: 90px;
  // }
}
</style>