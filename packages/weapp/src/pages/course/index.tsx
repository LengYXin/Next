import { Navigator, View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { ControllerCourse } from "@xt/client/entities";
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { AtCard } from 'taro-ui';
import { PageDecorators } from '~/components/page';
import './index.scss';

@inject('$storeCourse')
@observer
@PageDecorators({ logon: true })
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
  /**
   * 下拉刷新
   */
  async onPullDownRefresh() {
    await this.onPagLoading(true)
    Taro.stopPullDownRefresh()
  }
  componentDidMount() {
    this.onPagLoading(true)
  }

  componentWillUnmount() { }

  componentDidShow() {
  }

  componentDidHide() { }
  renderItem(item) {
    return <Navigator url={`/pages/course_details/index?id=${item.courseId}`} key={item.courseId}>
      <AtCard
        title={item.courseName}
        thumb={item.coursePictureUri}
      >
        {item.courseSubtitle}
      </AtCard>
    </Navigator>
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
