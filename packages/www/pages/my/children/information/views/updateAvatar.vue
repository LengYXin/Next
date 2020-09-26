<!--
 * @Author: Erlin
 * @CreateTime: 2020-09-14 17:40:29
 * @LastEditors: Erlin
 * @LastEditTime: 2020-09-26 14:57:04
 * @Description: 修改头像
-->

<template>
  <div>
    <span @click="showModal">修改头像</span>
    <a-modal
      title="修改头像"
      :width="640"
      :dialogStyle="{ top: '150px' }"
      :visible="visible"
      :footer="null"
      @cancel="handleCancel"
    >
      <a-row type="flex" algin="middle">
        <a-col :span="12">
          <div class="xt-flex-center">
            <a-upload
              name="avatar"
              list-type="picture-card"
              class="my-info-avatar-uploader"
              :show-upload-list="false"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              :before-upload="beforeUpload"
              @change="handleChange"
            >
              <!-- <img v-if="imageUrl" :src="imageUrl" alt="avatar" /> -->
              <div v-if="!imageUrl">
                <a-icon :type="loading ? 'loading' : 'picture'" />
                <div class="ant-upload-text">选择图片</div>
              </div>
            </a-upload>

            <div style="width: 300px; height: 300px" v-if="imageUrl">
              <xt-img-cropper
                ref="cropperRef"
                v-bind="cropper"
                @realTime="realTime"
                @imgLoad="imgLoad"
              />
            </div>
            <div><a-icon type="sync" />重新选择</div>
          </div>
        </a-col>
        <a-col :span="1"
          ><a-divider type="vertical" style="height: 100%"
        /></a-col>
        <a-col :span="11">
          <div class="xt-flex-center">
            <div
              v-if="previews.img"
              class="show-preview"
              :style="{
                width: previews.w + 'px',
                height: previews.h + 'px',
                overflow: 'hidden',
                margin: '5px',
                'border-radius': '9999px',
              }"
            >
              <div :style="previews.div">
                <img :src="cropper.img" :style="previews.img" />
              </div>
            </div>
            <a-avatar
              v-else
              :size="100"
              :src="PageStore.UserInfo.headThumbnailUri"
            ></a-avatar>
            <div class="xt-margin-top-sm">
              <span v-if="previews.img">预览头像</span>
              <span v-else>当前头像</span>
            </div>
          </div>
        </a-col>
      </a-row>
      <div class="xt-font-size-sm xt-margin-tb-xl xt-text-align-center">
        请选择图片上传：大小180 * 180像素支持JPG、PNG等格式，图片需小于2M
      </div>
      <div class="xt-flex-center">
        <a-button
          size="large"
          class="ant-btn-yellow my-info-save-btn"
          @click="onUpdateAvatar"
          >更新</a-button
        >
      </div>
    </a-modal>
  </div>
</template>

<script lang="ts">
import lodash from "lodash";
import moment from "moment";
import { Component, Prop, Vue, Ref } from "vue-property-decorator";
import { Observer } from "mobx-vue";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

@Observer
@Component({})
export default class PageView extends Vue {
  get PageStore() {
    return this.$store.$storeUser;
  }
  @Ref("cropperRef") cropperRef;
  ModalText = "Content of the modal";
  visible = false;
  confirmLoading = false;
  loading = false;
  imageUrl = "";
  cropper = {
    img: "/images/logo.png",
    size: 1,
    full: false,
    outputType: "png",
    canMove: false,
    fixed: true,
    canMoveBox: true,
    autoCrop: true,
    centerBox: false,
    enlarge: 1,
    mode: "contain",
    maxImgSize: 3000,
    limitMinSize: [100, 100],
  };
  previews = {};
  realTime(data) {
    this.previews = data;
  }

  showModal() {
    this.visible = true;
  }

  handleOk(e) {
    this.ModalText = "The modal will be closed after two seconds";
    this.confirmLoading = true;
    setTimeout(() => {
      this.visible = false;
      this.confirmLoading = false;
    }, 2000);
  }
  handleCancel(e) {
    console.log("Clicked cancel button");
    this.visible = false;
  }

  handleChange(info) {
    if (info.file.status === "uploading") {
      this.loading = true;
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) => {
        this.imageUrl = imageUrl;
        this.loading = false;
        this.cropper.img = imageUrl;
      });
    }
  }
  beforeUpload(file) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      this.$message.error("只能上传jpg/png格式图片！");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      this.$message.error("图片必须小于2M！");
    }
    return isJpgOrPng && isLt2M;
  }

  imgLoad(e) {
    console.log("PageView -> imgLoad -> e", e);
  }

  onUpdateAvatar() {
    this.cropperRef.getCropBlob(async (data) => {
      console.log("PageView -> onUpdateAvatar -> data", data);
      let formData = new FormData();
      formData.append("profile", data);
      formData.append("nickName", ""); //是否需要水印
      formData.append("isLocalThumb", ""); //是否需要水印

      console.log("PageView -> onUpdateAvatar -> formData", formData);

      try {
        let a = await this.PageStore.onUpdateAvatar(formData);
      } catch (error) {}
    });
  }
}
</script>

<style lang="less">
.my-info {
  &-avatar-uploader {
    &.ant-upload-picture-card-wrapper {
      width: auto;
    }
    & > .ant-upload.ant-upload-select-picture-card {
      width: 300px;
      height: 300px;
      border-style: solid;
    }

    .ant-upload-select-picture-card i {
      font-size: 42px;
      color: #999;
    }
    .ant-upload-select-picture-card .ant-upload-text {
      font-size: 16px;
      margin-top: 8px;
      color: #666;
    }
  }
  &-avatar-preview {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  &-save-btn {
    padding: 0 30px;
  }
}
</style>
