<template>
  <a-card :bordered="false" :loading="loading">
    <a-row type="flex">
      <a-col :lg="13" class="xt-calligraphy" v-bind="colProps">
        <a-row
          class="xt-calligraphy-warp"
          type="flex"
          align="middle"
          justify="space-between"
        >
          <div>
            <h1 class="xt-font-size-xxl xt-font-family-FZXIYSK">
              新全阶课程｜从书法之美到生活之美
            </h1>
            <h2 class="xt-text-gray xt-font-size-lg xt-font-family-FZXIYSK">
              林曦老师的零基础书法直播课
            </h2>
            <h3 class="xt-text-gray xt-font-size-base xt-font-family-FZXIYSK">
              共3课
            </h3>

            <div class="xt-calligraphy-price-box">
              <h3
                class="xt-calligraphy-origin-price xt-font-size-base xt-font-family-FZLTHJW"
              >
                原学费：
                <span v-money="20580" />
              </h3>
              <h3
                class="xt-calligraphy-current-price xt-text-green xt-font-family-FZLTHJW"
                v-money="17600"
              />
            </div>
          </div>
          <div class="xt-calligraphy-foot">
            <h1 class="xt-calligraphy-tag xt-font-family-FZLTHJW">全阶课程</h1>
            <div>
              <a-icon class="xt-calligraphy-arrow-down" type="caret-down" />
            </div>
            <a-row type="flex" align="middle" justify="end">
              <Signup class="xt-calligraphy-buy-btn" :id="1" />
              <Signup class="xt-calligraphy-give-btn" :give="true" :id="1" />
            </a-row>
          </div>
        </a-row>
      </a-col>
      <a-col class="xt-composition" :lg="11" v-bind="colProps">
        <a-timeline>
          <a-timeline-item
            v-for="item in timeline"
            :key="item.key"
            :color="item.color"
          >
            <div
              class="xt-composition-dot xt-font-size-lg xt-font-family-FZXIYSK"
              :class="'xt-bg-' + item.color"
              slot="dot"
              v-text="item.key"
            ></div>
            <a-row
              type="flex"
              class="xt-composition-box xt-font-family-FZXIYSK"
            >
              <a-col :flex="2">
                <span
                  class="xt-font-size-x"
                  :class="'xt-text-' + item.color"
                  v-text="item.title"
                ></span>
                <div>
                  <span
                    class="xt-font-size-xx xt-font-bold"
                    :class="'xt-text-' + item.color"
                    v-money="item.price"
                  ></span>
                  <span class="xt-font-size-md">
                    共<span v-text="item.statistics"></span>课
                  </span>
                </div>
              </a-col>
              <a-col class="xt-composition-warp" :flex="1">
                <a-button
                  class="xt-composition-buy-btn"
                  type="primary"
                  :disabled="true"
                >
                  立即报名
                </a-button>
                <div class="xt-font-size-md">开课中</div>
              </a-col>
            </a-row>
          </a-timeline-item>
        </a-timeline>
      </a-col>
    </a-row>
  </a-card>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Context } from "@nuxt/types";
import { Observer } from "mobx-vue";
import lodash from "lodash";
import Course from "~/pages/course/views/course.vue";
import Signup from "~/pages/course/views/signup.vue";
@Component({
  components: { Course, Signup },
})
export default class PageView extends Vue {
  loading = true;
  colProps = { lg: 12 };
  dataSource = {};
  timeline = [
    {
      key: "1",
      title: "入门课|写字旅行攻略",
      price: 999,
      statistics: 3,
      color: "golden",
    },
    {
      key: "2",
      title: "新一阶|篆隶筑基课程",
      price: 999,
      statistics: 3,
      color: "blue",
    },
    {
      key: "3",
      title: "新一阶|篆隶筑基课程",
      price: 999,
      statistics: 3,
      color: "lime",
    },
    {
      key: "4",
      title: "新一阶|篆隶筑基课程",
      price: 999,
      statistics: 3,
      color: "orange",
    },
    {
      key: "5",
      title: "新一阶|篆隶筑基课程",
      price: 999,
      statistics: 3,
      color: "red",
    },
  ];
  created() {
    lodash.delay(() => {
      this.loading = false;
    }, 2000);
  }
  mounted() {}
  updated() {}
  destroyed() {}
}
</script>
<style lang="less" scoped>
.xt-calligraphy {
  &-warp {
    height: 100%;
  }
  &-price-box {
    margin-top: 65px;
  }
  &-origin-price {
    color: #676665;
    font-weight: 600;
    text-decoration: #eeeeee;
    text-decoration: line-through;
  }
  &-current-price {
    font-size: 35px;
    font-weight: bolder;
  }

  &-foot {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  &-tag {
    font-size: 40px;
  }
  &-arrow-down {
    width: 20px;
    height: 20px;
    color: #818181;
    font-size: 20px;
    margin-left: 69px;
  }

  &-buy-btn {
    margin-left: 0;
    width: 158px;
    height: 45px;
    font-size: 24px;
    position: relative;
  }

  &-give-btn {
    margin-left: 45px;
    font-size: 24px;
    width: 158px;
    height: 45px;
  }
}

.xt-composition {
  padding-top: 16px;
  .ant-timeline-item {
    padding: 0 0 40px;
  }
  .ant-timeline-item-last {
    padding: 0;
  }
  &-dot {
    width: 25px;
    height: 25px;
    line-height: 25px;
    border-radius: 25px;
  }
  &-box {
    margin-left: 40px;
  }
  &-warp {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  &-buy-btn {
    width: 90px;
    height: 26px;
    line-height: 26px;
    border-radius: 2px;
    &:disabled {
      color: #ffffff;
      background-color: #e9e7e7;
      border: none;
      &:hover {
        color: #ffffff;
        background-color: #e9e7e7;
        border: none;
      }
    }
  }
}
</style>