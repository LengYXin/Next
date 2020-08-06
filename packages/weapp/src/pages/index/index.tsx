import { Image, Swiper, SwiperItem, View } from '@tarojs/components'
import { ControllerHome } from "@xt/client/entities"
import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import { AtButton, AtMessage } from 'taro-ui'
import './index.scss'
import { getCurrentInstance } from '@tarojs/taro'

@inject('$storeHome')
@observer
class Index extends Component<any> {
  get PageStore(): ControllerHome {
    return this.props.$storeHome
  }
  componentDidMount() {
    this.PageStore.onGetBanners()
  }

  componentWillUnmount() { }

  componentDidShow() {
    console.log('componentDidShow')
  }

  componentDidHide() {

    console.log('componentDidHide', getCurrentInstance())
  }
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
    // return (
    //   <View className='index'>
    //     <AtMessage />
    //    首页
    //   </View>
    // )
    return (
      <View className='index'>
        <AtMessage />
        {this.renderSwiper()}
        <Image
          style='width:100%'
          src={this.$imgs.test}
        />
      </View>
    )
  }
}

export default Index
