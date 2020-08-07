import { Image, Swiper, SwiperItem, View } from '@tarojs/components'
import { ControllerHome } from "@xt/client/entities"
import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import { AtMessage } from 'taro-ui'
import { PageDecorators } from "~/components/page"
import './index.scss'
@inject('$storeHome')
@observer
@PageDecorators()
class Index extends Component<any> {
  get PageStore(): ControllerHome {
    return this.props.$storeHome
  }
  componentDidMount() {
    this.PageStore.onGetBanners()
  }

  componentWillUnmount() { }

  componentDidShow() {
  }
  componentDidHide() {
  }
  renderSwiperItem(item) {
    return <SwiperItem key={item.id}>
      <Image
        style='width:100%'
        src={item.pictureUri}
      />
    </SwiperItem>
  }
  renderSwiper() {
    const { Banners } = this.PageStore;
    if (Banners.length) {
      return <Swiper
        circular
        indicatorDots
        autoplay>
        {Banners.map(this.renderSwiperItem.bind(this))}
      </Swiper>
    }
  }
  render() {
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
