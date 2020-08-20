import { Navigator, View, Image, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { ControllerCourse } from "@xt/client";
import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { AtCard, AtAvatar, AtBadge } from "taro-ui";
import { PageDecorators } from "~/components/page";
import "./index.scss";
import { keys } from "lodash";

import SingleItem from "~/components/course/singleItem";

@inject("$storeCourse")
@observer
@PageDecorators({ logon: true })
class Index extends Component<any> {
  state = {
    statusColors: ["#b69271", "#b69271"]
  };

  get PageStore(): ControllerCourse {
    return this.props.$storeCourse;
  }
  get Pagination() {
    return this.PageStore.PaginationH5List;
  }
  /**
   * 分页数据加载
   * @param body 参数
   * @param reset 重置配置
   */
  onPagLoading(reset = false) {
    if (reset) {
      this.Pagination.onReset({ infinite: true });
    }
    this.Pagination.onLoading({ typeKey: 1 });
  }
  /**
   * 下拉刷新
   */
  async onPullDownRefresh() {
    console.log("LENG: Index -> onPullDownRefresh -> onPullDownRefresh");
    await this.onPagLoading(true);
    Taro.stopPullDownRefresh();
  }
  componentDidMount() {
    this.onPagLoading(true);
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  // 全阶课程
  renderFullItem(item) {
    return (
      <Navigator
        url={this.$Navigator(this.$pages.CourseDetails, { id: item.courseFullId })}
        key={item.courseFullId}
      >
        <View className="xt-single-item">
          <View className="banner-box">
            <Image className="banner" src={item.coursePictureUri} />
            <View className="type">直播课</View>
            <View
              className="status"
              style={{ backgroundColor: this.state.statusColors[0] }}
            >
              正在开课
            </View>
          </View>
          <View className="title">{item.courseName}</View>
          <View className="origin-price">原学费：{item.courseFullPrice}元</View>
          <View className="current-price">
            <View className="price">{item.courseFullPrice}元</View>
            <View className="count">共{item.classHourCount}课</View>
          </View>
        </View>
        <View className="child-box">
          {item.courseSingleResponseVos.map(v => this.renderFullChild(v))}
        </View>
      </Navigator>
    );
  }

  // 全阶下面的单阶
  renderFullChild(item) {
    return (
      <View className="child-item" key={item.courseId}>
        <View className="banner-box">
          <Image className="banner" src={item.coursePictureUri} />
          <View
            className="status"
            style={{ backgroundColor: this.state.statusColors[0] }}
          >
            正在开课
          </View>
        </View>
        <View className="title">{item.courseName}</View>
        <View className="current-price">
          <View className="price">{item.courseFullPrice}元</View>
          <View className="count">共{item.classHourCount}课</View>
        </View>
      </View>
    );
  }

  renderSingleItem(item) {
    return <SingleItem key={item.courseId} item={item}></SingleItem>;
  }

  renderItem(item) {
    if (item.isFull) {
      return this.renderFullItem(item);
    } else {
      let singleData = item.courseSingleResponseVos[0];
      return (
        <SingleItem key={singleData.courseId} item={singleData}></SingleItem>
      );
    }
  }
  render() {
    return (
      <View className="xt-course-list">
        {this.Pagination.dataSource.map(this.renderItem.bind(this))}
      </View>
    );
  }
}

export default Index;
