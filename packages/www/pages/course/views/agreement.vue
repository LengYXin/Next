
<template>
  <div>
    <a-descriptions title="报名前请了解" layout="vertical" :column="1">
      <a-descriptions-item label="课程回放">
        <span>如果您需要补课或复习，请于每节直播课程结束后观看回放，回放有效期为 0天，即当堂直播课程结束后有 0 天补课或复习，课程视频 不提供下载。 禁止以任何形式下载、复制、录制、剪辑、编辑与课程有关的视频、音频资料。</span>
      </a-descriptions-item>
      <a-descriptions-item label="申请退课">
        <span>如需退课，请您于 第一节直播课开始前，在“我的订单”中提出退课申请，退课申请经暄桐审核通过后，学费将原路返回您的账户。 第一节直播课程开始后，将不再接受任何理由、任何形式的退课申请。</span>
      </a-descriptions-item>
      <a-descriptions-item label="开具发票">
        <span>如果您需要发票，请在“我的订单”中提出发票申请，教室将于第一节直播课开始后开具电子发票。</span>
      </a-descriptions-item>
      <a-descriptions-item label="保密义务">
        <span>暄桐教室对课程内容具有保密性，并采取保密措施。您通过暄桐教室，以任何形式（包括但不限于线上、线下渠道）获得的与课程有关的任何资料（包括但不限于PPT、音频、视频、图片等形式的资料，以及摘抄、编辑基于上课内容的课堂笔记等），未经暄桐教室书面授权，均不得以任何方式（包括但不限于微信群、微信朋友圈、QQ群等）公开、披露、转让或变相公开、披露、转让给任何第三方。</span>
      </a-descriptions-item>
      <a-descriptions-item label="内容授权">
        <span>暄桐教室经您同意有权使用您在本平台及其他平台（微博、微信、小红书等）发布的与课程有关的内容，并有权对与前述内容进行复制、下载、编辑、修改、展示（包括但不限于：出版物、视频等）、及社交平台上的互联网信息传播。您如撤回前述授权，应正式通知暄桐教室，但对暄桐教室之前经授权的使用行为，自愿放弃主张侵权等法律责任；暄桐教室接到撤回授权通知后，应在合理时间内停止使用与您有关的内容，或经协商授权后继续使用。</span>
      </a-descriptions-item>
    </a-descriptions>
    <div>如您有任何疑问，可以向暄桐客服咨询哦。</div>
    <div>您可以在 2020年12月17日 之前下载学习资料（不包括课程视频）、提交作业和将作业发布到“晒作业”与大家分享。</div>
    <div>祝您在暄桐教室学习开心~</div>
    <div>
      <a-checkbox>
        <span>我看过并同意</span>
        <span>
          《
          <span>哈哈哈哈</span>
          》
        </span>
      </a-checkbox>
    </div>
    <div class="xt-text-align-center">
      <a-button type="primary" size="large">同意</a-button>
      <a-button type="yellow" size="large" class="xt-btn-ghost">不同意</a-button>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Provide, Inject } from "vue-property-decorator";
import lodash from "lodash";
import { Observer } from "mobx-vue";
@Observer
@Component({
  components: {},
})
export default class PageView extends Vue {
  /** 课程数据 */
  @Prop({ default: () => ({}) }) dataSource;
  created() {}
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scoped>
</style>
<i18n lang="json">
{
  "en": {
    "sort_time": "Sort by time",
    "sort_tuition": "Sort by tuition fee"
  },
  "zh": {
     "sort_time": "按时间排序",
    "sort_tuition": "按学费排序"
  }
}
</i18n>