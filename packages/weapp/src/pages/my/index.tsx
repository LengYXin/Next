import { Image, Swiper, SwiperItem, View } from '@tarojs/components'
import { ControllerHome } from "@xt/client/entities"
import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import { AtButton, AtMessage } from 'taro-ui'
import './index.scss'

@inject('$storeHome')
@observer
class Index extends Component<any> {
  get PageStore(): ControllerHome {
    return this.props.$storeHome
  }
  componentDidMount() {
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  render() {
    return (
      <View className='index'>
        <AtMessage />
       我的
      </View>
    )
  }
}

export default Index
