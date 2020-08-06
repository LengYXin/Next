import { Image, Swiper, SwiperItem, View } from "@tarojs/components";
import { ControllerHome } from "@xt/client/entities";
import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { AtIcon, AtButton, AtMessage, AtGrid } from "taro-ui";

import "./index.scss";
import { getCurrentInstance } from "@tarojs/taro";

@inject("$storeHome")
@observer
class Index extends Component<any> {
  state = {
    value: "",
    gridData: [
      {
        image: "../../assets/icon/navigation1.png",
        value: "全部课程"
      },
      {
        image:
          "https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png",
        value: "写字的事"
      },
      {
        image:
          "https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png",
        value: "视频分享"
      },
      {
        image:
          "https://img12.360buyimg.com/jdphoto/s72x72_jfs/t10660/330/203667368/1672/801735d7/59c85643N31e68303.png",
        value: "写字的人"
      },
      {
        image:
          "https://img14.360buyimg.com/jdphoto/s72x72_jfs/t17251/336/1311038817/3177/72595a07/5ac44618Na1db7b09.png",
        value: "同学作业"
      }
    ]
  };
  get PageStore(): ControllerHome {
    return this.props.$storeHome;
  }
  componentDidMount() {
    this.PageStore.onGetH5Banners();
  }

  componentWillUnmount() {}

  componentDidShow() {
    console.log("componentDidShow");
  }

  componentDidHide() {
    console.log("componentDidHide", getCurrentInstance());
  }

  onChange(value: any) {
    this.setState({
      value: value
    });
  }
  onActionClick() {
    console.log("开始搜索");
  }

  renderSwiper() {
    const { Banners } = this.PageStore;
    if (Banners.length) {
      return (
        <Swiper
          className="index-swiper"
          indicatorColor="#FFFFFF"
          indicatorActiveColor="#C4A57F"
          circular
          indicatorDots
        >
          {Banners.map(img => (
            <SwiperItem key={img.id}>
              <Image style="width:100%" src={img.pictureUri} />
            </SwiperItem>
          ))}
        </Swiper>
      );
    }
  }
  renderIndexHeader() {
    return (
      <View className="index-header">
        <View className="left">
          <View className="at-icon at-icon-search"></View>
          <View>搜索你感兴趣的内容</View>
        </View>
        <View className="right">返回老教室</View>
      </View>
    );
  }
  render() {
    // return (
    //   <View className='index'>
    //     <AtMessage />
    //    首页
    //   </View>
    // )
    return (
      <View className="index">
        <AtMessage />
        {this.renderIndexHeader()}
        {this.renderSwiper()}
        <AtGrid
          hasBorder={false}
          className="index-grid"
          columnNum={5}
          data={this.state.gridData}
        />
      </View>
    );
  }
}

export default Index;
