/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:16:27
 * @modify date 2020-08-05 14:16:27
 * @desc 九宫格
 */
<template>
  <!-- <div class="xt-flex-center"> v-viewer="options" -->
  <van-row class="xt-nine" v-if="length" :style="getNineStyle()">
    <van-col
      :span="getSpan()"
      v-for="(img, index) in dataSource"
      :key="getThumb(img)"
      @click="ImagePreview(index)"
    >
      <van-image
        class="xt-nine-img hvr-float-shadow"
        lazy-load
        fit="cover"
        :src="getThumb(img)"
        :style="getStyle()"
      />
    </van-col>
  </van-row>
  <!-- </div> -->
</template>
<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { Debounce, BindAll } from "lodash-decorators";
import lodash from "lodash";
@Component({
  components: {},
})
export default class extends Vue {
  @Prop({ default: () => [] }) dataSource: Array<any>;
  @Prop({ default: "thumb" }) thumb; //缩略图
  @Prop({ default: "original" }) original; //原图
  @Prop({ default: 80 }) size;
  @Prop({ default: 5 }) margin;
  @Prop({}) viewerOptions;

  get options() {
    return lodash.merge(
      {
        url: "data-original",
      },
      this.viewerOptions
    );
  }
  get length() {
    return this.dataSource.length;
  }
  getThumb(img) {
    if (lodash.isString(img)) {
      return img;
    }
    return lodash.get(img, this.thumb);
  }
  getOriginal(img) {
    if (lodash.isString(img)) {
      return img;
    }
    return lodash.get(img, this.original);
  }
  getSpan() {
    if (this.length === 1) {
      return 24;
    } else if (this.length === 4) {
      return 12;
    }
    return 8;
  }
  //   图片大小
  getStyle() {
    let style = {
      overflow: null,
      maxWidth: null,
      width: this.toRem(this.size),
      height: this.toRem(this.size),
      margin: "auto",
      marginBottom: this.toRem(this.margin),
    };
    if (this.length === 1) {
      style.width = null;
      style.maxWidth = this.toRem(this.size * 3);
      style.height = "auto";
      style.margin = "0";
    }
    return style;
  }
  // 容器大小
  getNineStyle() {
    let base = 3;
    const margin = this.margin * base;
    let style = {
      overflow: null,
      maxWidth: null,
      maxHeight: null,
    };
    if (this.length === 1) {
      //   style.overflow = "hidden";
    } else if (this.length === 4) {
      base = 2;
    }
    style.maxWidth = this.toRem(this.size * base + margin);
    style.maxHeight = this.toRem(this.size * 3 + margin);
    return style;
  }
  toRem(px) {
    return px * 0.026666625 + "rem";
  }
  ImagePreview(startPosition) {
    this.$ImagePreview({
      images: lodash.map(this.dataSource, this.getOriginal.bind(this)),
      startPosition,
    });
  }
  created() {}
  mounted() {}
}
</script>
<style lang="less" scoped>
.xt-nine {
  //   overflow: hidden;
  padding: 10px 0;
  &-img {
    display: block;
    // width: 80px;
    // height: 100%;
    object-fit: cover;
    margin: auto;
    cursor: pointer;
    border-radius: 5px;
    overflow: hidden;
    // border: 1px solid #00000026;
  }
}
</style>
