import React, { Component } from 'react'
import { View, Button, Text, Swiper, SwiperItem, Image } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import { AtButton, AtMessage } from 'taro-ui'
import './index.scss'
import { observable } from 'mobx'
import { ControllerHome } from "@xt/client/entities";

type PageStateProps = {
  store: {
    counterStore: {
      counter: number,
      increment: Function,
      decrement: Function,
      incrementAsync: Function
    }
  }
}

interface Index {
  props: PageStateProps;
}
interface imgs {
  id: string;
  pictureJumpUrl: string;
  pictureUri: string;
}
@inject('store')
@observer
class Index extends Component {
  PageStore = new ControllerHome(this.$ajax);
  componentWillMount() { }

  componentDidMount() {
    this.PageStore.onGetBanners()
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  renderSwiper() {
    const { Banners } = this.PageStore;
    if (Banners.length) {
      return <Swiper
        circular
        indicatorDots
        autoplay>
        {Banners.map(img => <SwiperItem key={img.id}>
          <Image
            style='width:100%'
            src={img.pictureUri}
          />
        </SwiperItem>)}

      </Swiper>
    }
  }
  render() {
    return (
      <View className='index'>
        <AtMessage />
        {this.renderSwiper()}
        <AtButton type='primary' >获取数据</AtButton>
      </View>
    )
  }
}

export default Index
