import { Image, Swiper, SwiperItem, View } from '@tarojs/components'
import { ControllerStationery } from "@xt/client/entities"
import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import { AtButton, AtMessage } from 'taro-ui'
import './index.scss'

@inject('$storeStationery')
@observer
class Index extends Component<any> {
  get PageStore(): ControllerStationery {
    return this.props.$storeStationery
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
       文房
      </View>
    )
  }
}

export default Index
