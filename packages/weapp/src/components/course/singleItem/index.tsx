import { Navigator, View, Image } from "@tarojs/components";
import React, { Component } from "react";
import "./index.scss";
class Index extends Component<{ item }> {
  state = {
    statusColors: ["#b69271", "#b69271"]
  };
  render() {
    let item = this.props.item;
    return (
      <Navigator
        url={this.$Navigator(this.$pages.CourseDetails, { id: item.courseId })}
        key={item.courseId}
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
          <View className="current-price">
            <View className="price">{item.courseFullPrice}元</View>
            <View className="count">共{item.classHourCount}课</View>
          </View>
        </View>
      </Navigator>
    );
  }
}
export default Index;
