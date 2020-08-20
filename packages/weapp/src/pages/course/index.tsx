import { Navigator, View, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { ControllerCourse } from "@xt/client/entities";
import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { AtCard, AtAvatar } from "taro-ui";
import { PageDecorators } from "~/components/page";
import "./index.scss";

@inject("$storeCourse")
@observer
@PageDecorators({ logon: true })
class Index extends Component<any> {
  get PageStore(): ControllerCourse {
    return this.props.$storeCourse;
  }
  get Pagination() {
    return this.PageStore.PaginationWeApp;
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
  renderItem(item) {
    return (
      <Navigator
        url={this.$Navigator(this.$pages.CourseDetails, { id: item.courseId })}
        key={item.courseId}
      >
        {/* <AtCard
        title={item.courseName}
        thumb={item.coursePictureUri}
      >
        {item.courseSubtitle}
      </AtCard> */}
        <View className="at-row">
          <View className="at-col">
            <Image
              src={item.coursePictureUri}
              style="width:150px;height:100px"
            />
          </View>
          <View className="at-col">{item.courseName}</View>
        </View>
      </Navigator>
    );
  }
  render() {
    return (
      <View className="index">
        {this.Pagination.dataSource.map(this.renderItem.bind(this))}
        {this.Pagination.dataSource.map(this.renderItem.bind(this))}
      </View>
    );
  }
}

export default Index;
