/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:16:32
 * @modify date 2020-08-05 14:16:32
 * @desc 富文本按钮
 */
<template>
  <div class="xt-editor-toolbar">
    <div class="xt-editor-toolbar-icon">
      <van-icon name="smile-o" @click="onShowFace" />
    </div>
    <div class="xt-editor-toolbar-btn">
      <van-button block @click="onSubmitRules">
        <span v-text="buttonText"></span>
      </van-button>
    </div>
    <xt-face class="xt-face-hied" :class="{'xt-face-show':showFace}" @select="onAddFace" />
  </div>
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
  showFace = false;
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
  onShowFace() {
    this.showFace = !this.showFace;
  }
  onAddFace(face) {
    this.quill.insertText(
      this.quill.getSelection() || this.quill.getLength() - 1,
      face.value
    );
    // this.quill.scrollIntoView()
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
          this.showFace = false;
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
      // this.$message.warning({ content: error, key: "quill_rules" });
      this.$toast(error);
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
@height: 48px; // 单行样式
.xt-editor-single {
  .quillWrapper {
    box-shadow: 0px 0px 0.5rem 0px rgba(231, 231, 231, 0.72);
    // background: #ccc;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 99;
    // height: @height;
    background: white;
    overflow: hidden;
    .ql-toolbar.ql-snow,
    .ql-container.ql-snow {
      border: none;
    }
    .ql-editor {
      min-height: @height;
      max-height: @height;
      font-size: 16px;
      text-align: justify;
      word-break: break-all;
      padding-right: 95px;
      padding-left: 48px;
      &.ql-blank::before {
        padding-right: 95px;
        padding-left: 48px;
      }
    }
  }
  .xt-editor-toolbar {
    // height: @height;
    &-icon,
    &-btn {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 99;
    }
    &-btn {
      right: 0;
      left: auto;
      float: none;
      .van-button {
        width: 88px;
        height: @height;
        border-radius: 0;
        background: @xt-yellow-6;
        color: white;
        border: none;
        // &::before {
        //   opacity: 0;
        // }
      }
    }
    .van-icon-smile-o {
      margin-top: 6.5px;
      margin-left: 6.5px;
      font-size: 32px;
      color: @xt-yellow-6;
    }
    .xt-face-hied {
      height: 0;
      transition: all 0.3s;
      box-sizing: border-box;
      &.xt-face-show {
        box-shadow: 0px 0px 0.5rem 0px rgba(231, 231, 231, 0.72);
        padding-top: 10px;
        height: 179px;
      }
    }
  }
  &-seat {
    height: @height;
  }
}

.xt-editor-toolbar {
}
</style>