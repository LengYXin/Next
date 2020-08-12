import { Image, Swiper, SwiperItem, View } from "@tarojs/components";
import { ControllerHome } from "@xt/client/entities";
import { inject, observer } from "mobx-react";
import React, { Component } from "react";
import { AtMessage, AtGrid } from "taro-ui";
import { PageDecorators } from "~/components/page";
import Taro, { getCurrentInstance } from "@tarojs/taro";
import "./index.scss";

@inject("$storeHome")
@observer
@PageDecorators()
class Index extends Component<any> {
  state = {
    value: "",
    navList: [
      {
        image:
          "https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png",
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

  navClick(item: object, index: number) {
    let actions: Map<any, any> = new Map([[0, "/pages/course_list/index"]]);
    let url = actions.get(index);
    url &&
      Taro.navigateTo({
        url: url
      });
  }

  onChange(value: any) {
    this.setState({
      value: value
    });
  }
  onActionClick() {
    console.log("开始搜索");
  }
  renderSwiperItem(item) {
    return (
      <SwiperItem key={item.id}>
        <Image style="width:100%" src={item.pictureUri} />
      </SwiperItem>
    );
  }
  renderSwiper() {
    const { Banners } = this.PageStore;
    if (Banners.length) {
      return (
        <Swiper
          indicatorColor="#FFF"
          indicatorActiveColor="#c4a57f"
          className="xt-index-swiper"
          circular
          indicatorDots
          autoplay
        >
          {Banners.map(this.renderSwiperItem.bind(this))}
        </Swiper>
      );
    }
  }
  renderIndexHeader() {
    return (
      <View className="xt-index-header">
        <View className="left">
          <View className="at-icon at-icon-search"></View>
          <View>搜索你感兴趣的内容</View>
        </View>
        <View className="right">返回老教室</View>
      </View>
    );
  }
  render() {
    return (
      <View className="index">
        <AtMessage />
        {this.renderIndexHeader()}
        {this.renderSwiper()}
        {/* <Image style="width:100%" src={this.$imgs.test} /> */}
        <AtGrid
          className="xt-index-grid"
          hasBorder={false}
          columnNum={5}
          data={this.state.navList}
          onClick={this.navClick}
        />
      </View>
    );
  }
}

export default Index;
