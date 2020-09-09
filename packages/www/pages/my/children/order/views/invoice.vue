/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:17:52
 * @modify date 2020-08-05 14:17:52
 * @desc 申请发票
 */
<template>
  <div class="xt-order-invoice">
    <a-button class="ant-btn" type="yellow" @click="onVisible(true)"
      >申请发票</a-button
    >
    <a-modal
      title="申请发票"
      :footer="null"
      width="700px"
      :visible="visible"
      @cancel="onVisible(false)"
    >
      <a-form-model
        layout="horizontal"
        v-bind="formItemLayout"
        :model="formInline"
        @submit="onSubmit"
        @submit.native.prevent
      >
        <h3>请填写发票信息</h3>
        <a-form-model-item label="客户所属">
          <a-input size="large"></a-input>
        </a-form-model-item>
        <a-form-model-item label="发票性质">
          <a-input size="large"></a-input>
        </a-form-model-item>
        <a-form-model-item label="发票类型">
          <a-input size="large"></a-input>
        </a-form-model-item>
        <a-form-model-item label="发票抬头">
          <a-input size="large"></a-input>
        </a-form-model-item>
        <a-form-model-item label="纳税人识别号">
          <a-input size="large"></a-input>
        </a-form-model-item>
        <a-form-model-item label="邮箱地址">
          <a-input size="large"></a-input>
        </a-form-model-item>
        <a-form-model-item label="发票内容">
          <a-input size="large"></a-input>
        </a-form-model-item>
        <a-form-model-item label="发票金额">
          <a-input size="large"></a-input>
        </a-form-model-item>
        <div class="xt-text-align-center">
          <a-button
            class="ant-btn"
            size="large"
            type="primary"
            html-type="submit"
            >提交</a-button
          >
        </div>
      </a-form-model>
    </a-modal>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Context } from "@nuxt/types";
import { Observer } from "mobx-vue";
import lodash from "lodash";
// @Observer
@Component({
  components: {},
})
export default class PageView extends Vue {
  @Prop({ default: {} }) dataSource;
  visible = false;
  formInline = {};
  formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };
  onVisible(visible) {
    this.visible = visible;
  }
  onSubmit() {}
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scoped>
.xt-order-invoice {
}
.ant-btn {
  color: @white;
  width: 145px;
  height: 40px;
  font-size: @font-size-lg;
}
</style>

