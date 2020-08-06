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
  get Pagination() {
    return this.PageStore.PaginationWeApp
  }
  /**
   * 分页数据加载
   * @param body 参数
   * @param reset 重置配置
   */
  onPagLoading(reset = false) {
    if (reset) {
      this.Pagination.onReset({ infinite: true })
    }
    this.Pagination.onLoading({ typeKey: 1 });
  }
  componentDidMount() {
    this.onPagLoading(true)
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
