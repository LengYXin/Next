import { Image, Swiper, SwiperItem, View } from '@tarojs/components'
import { ControllerCourse } from "@xt/client/entities"
import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import { AtButton, AtMessage } from 'taro-ui'
import './index.scss'

@inject('$storeCourse')
@observer
class Index extends Component<any> {
  get PageStore(): ControllerCourse {
    return this.props.$storeCourse
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
       上课
      </View>
    )
  }
}

export default Index
