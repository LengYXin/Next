import { Image, View } from "@tarojs/components";
import { ControllerCourse } from "@xt/client/entities";
import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { AtButton, AtMessage, AtNavBar } from "taro-ui";
import "./index.scss";

@inject("$storeCourse")
@observer
class Index extends Component<any> {
  get PageStore(): ControllerCourse {
    return this.props.$storeCourse;
  }
  componentDidMount() {
    console.log("Index -> componentDidMount -> this.PageStore", this.PageStore);

    // this.PageStore.onGetMyCourseList();
  }

  componentWillUnmount() {}

  componentDidShow() {}

  handleClick() {}

  componentDidHide() {}
  render() {
    return (
      <View className="course-list">
        <AtMessage />
        <AtNavBar
          onClickLeftIcon={this.handleClick}
          color="#000"
          title="课程列表"
          leftIconType="chevron-left"
        />
      </View>
    );
  }
}

export default Index;
