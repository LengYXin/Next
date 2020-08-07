import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { ControllerCourse, ControllerUser } from "@xt/client/entities";
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { PageDecorators } from '~/components/page';
import { AtCard, AtMessage } from 'taro-ui';
import './index.scss';

@inject('$storeCourse', '$storeUser')
@observer
@PageDecorators()
class Index extends Component<any> {
  get UserStore(): ControllerUser {
    return this.props.$storeUser
  }
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

  componentDidShow() { 
  }

  componentDidHide() { }
  renderItem(item) {
    return <AtCard
      key={item.courseId}
      title={item.courseName}
      thumb={item.coursePictureUri}
    >
      {item.courseSubtitle}
    </AtCard>
  }
  render() {
    return (
      <View className='index'>
        {this.Pagination.dataSource.map(this.renderItem.bind(this))}
      </View>
    )
  }
}

export default Index
