/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-05 14:02:15
 * @modify date 2020-08-05 14:02:15
 * @desc 课程组成
 */
<template>
  <a-card>
    <a-card-grid style="width:25%;text-align:center" v-for="item in dataSource" :key="item.key">
      <img alt="example" style="width:100%;" v-lazy="item.src" />
    </a-card-grid>
  </a-card>
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
<style>
</style>
