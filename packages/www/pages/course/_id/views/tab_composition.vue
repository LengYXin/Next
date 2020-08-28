/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:02:15
 * @modify date 2020-08-05 14:02:15
 * @desc 课程组成
 */
<template>
  <div class="xt-content">
    <a-card class="xt-cid-composition-card">
      <a-card-grid
        class="xt-cid-composition"
        :hoverable="false"
        v-for="item in dataSource"
        :key="item.key"
      >
        <div class="xt-cid-composition-info xt-hoverable">
          <img class="xt-cid-composition-img" v-lazy="item.src" />
          <div class="xt-cid-composition-pd">
            <div class="xt-cid-composition-title">标题</div>
            <a-row class="xt-cid-composition-static" type="flex">
              <a-col :flex="1">
                <strong class="xt-text-green" v-money="999"></strong>
              </a-col>
              <a-col :flex="1">
                <span>共3课</span>
                <span>已结课</span>
              </a-col>
            </a-row>
          </div>
        </div>
      </a-card-grid>
    </a-card>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import { Modal } from "ant-design-vue";
@Component({
  components: {},
})
export default class PageView extends Vue {
  dataSource = [
    {
      key: 1,
      src:
        "https://xuantong-upload-free.oss-cn-beijing.aliyuncs.com/picturePath/e452e2b4cbcd97bbf2fd03596de5c0b2.jpg?Expires=1886498699&OSSAccessKeyId=LTAI4FoTa7tgoQpv1j3SU8zZ&Signature=jJsL7uInZhqurZMW89Is%2Bt18E04%3D",
      title: "暄桐教室",
      description: "description",
    },
    {
      key: 2,
      src:
        "https://xuantong-upload-free.oss-cn-beijing.aliyuncs.com/picturePath/e452e2b4cbcd97bbf2fd03596de5c0b2.jpg?Expires=1886498699&OSSAccessKeyId=LTAI4FoTa7tgoQpv1j3SU8zZ&Signature=jJsL7uInZhqurZMW89Is%2Bt18E04%3D",
      title: "暄桐教室",
      description: "description",
    },
    {
      key: 3,
      src:
        "https://xuantong-upload-free.oss-cn-beijing.aliyuncs.com/picturePath/e452e2b4cbcd97bbf2fd03596de5c0b2.jpg?Expires=1886498699&OSSAccessKeyId=LTAI4FoTa7tgoQpv1j3SU8zZ&Signature=jJsL7uInZhqurZMW89Is%2Bt18E04%3D",
      title: "暄桐教室",
      description: "description",
    },
    {
      key: 4,
      src:
        "https://xuantong-upload-free.oss-cn-beijing.aliyuncs.com/picturePath/e452e2b4cbcd97bbf2fd03596de5c0b2.jpg?Expires=1886498699&OSSAccessKeyId=LTAI4FoTa7tgoQpv1j3SU8zZ&Signature=jJsL7uInZhqurZMW89Is%2Bt18E04%3D",
      title: "暄桐教室",
      description: "description",
    },
    {
      key: 5,
      src:
        "https://xuantong-upload-free.oss-cn-beijing.aliyuncs.com/picturePath/e452e2b4cbcd97bbf2fd03596de5c0b2.jpg?Expires=1886498699&OSSAccessKeyId=LTAI4FoTa7tgoQpv1j3SU8zZ&Signature=jJsL7uInZhqurZMW89Is%2Bt18E04%3D",
      title: "暄桐教室",
      description: "description",
    },
  ];
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scoped>
.xt-cid-composition {
  width: 25%;
  padding: 0 12px 20px 12px;
  border: none;
  box-shadow: 0 0 0 0 transparent;
  &-card {
    border: none;
  }
  &-info {
    background: @white;
  }
  &-img {
    width: 100%;
    height: 120px;
    object-fit: cover;
  }
  &-pd {
    padding: 16px;
  }
  &-static {
  }
}
</style>
