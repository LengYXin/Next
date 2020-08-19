import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { ControllerStationery } from "@xt/client/entities"
import lodash from 'lodash'
import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import { AtAvatar, AtSearchBar } from 'taro-ui'
import { PageDecorators } from '~/components/page'
import TabsScrollView from '~/components/tabsScrollView'
import './index.scss'

@inject('$storeStationery')
@observer
@PageDecorators({ nav: false })
class Index extends Component<any> {
  get PageStore(): ControllerStationery {
    return this.props.$storeStationery
  }
  get Pagination() {
    return this.PageStore.Pagination
  }
  get typeId() {
    return lodash.nth(this.PageStore.typelist, this.current)?.key
  }
  current = 0;
  state = {
    value: '',
    height: '80vh',
  }
  /**
   * 分页数据加载
   * @param body 参数
   * @param reset 重置配置
   */
  onPagLoading(body: { typeId?, commodityName?}, reset = false) {
    if (reset) {
      this.Pagination.onReset({ infinite: true })
    }
    this.Pagination.onLoading({ typeId: this.typeId, ...body });
  }
  componentDidMount() {
    this.PageStore.onGetTypelist()
    this.onPagLoading({ typeId: -1 }, true)
  }
  /**
   * 下拉刷新
   */
  async onPullDownRefresh() {
    await this.onPagLoading({}, true)
    Taro.stopPullDownRefresh()
  }
  /**
   * 滚动底部加载
   */
  onScrollToLower() {
    this.onPagLoading({})
  }
  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  onTabsChange(value) {
    this.current = value;
    this.onPagLoading({}, true)
  }
  onChange() {

  }
  renderItem(item) {
    return <View key={item.commodityId} className='at-col at-col-6'>
      <AtAvatar className='xt-stationery-img' image={item.commodityCoverUrl}></AtAvatar>
    </View>
  }
  renderDataSource() {
    const { dataSource } = this.Pagination;
    return <View>
      <View className='at-row at-row--wrap'>
        {dataSource.map(this.renderItem.bind(this))}
      </View>
    </View>
  }
  render() {
    const tabList = this.PageStore.typelist
    return (
      <View className='index'>
        <AtSearchBar
          value={this.state.value}
          onChange={this.onChange.bind(this)}
        />
        <TabsScrollView
          surplusHeight={45}
          tabList={tabList}
          onTabsChange={this.onTabsChange.bind(this)}
          onScrollToLower={this.onScrollToLower.bind(this)}>
          {this.renderDataSource()}
        </TabsScrollView>
      </View>
    )
  }
}

export default Index
