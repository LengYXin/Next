import { View } from '@tarojs/components'
import { ControllerStationery } from "@xt/client/entities"
import { map, nth } from 'lodash'
import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import { AtAvatar, AtMessage, AtSearchBar, AtTabs, AtTabsPane } from 'taro-ui'
import './index.scss'

@inject('$storeStationery')
@observer
class Index extends Component<any> {
  get PageStore(): ControllerStationery {
    return this.props.$storeStationery
  }
  state = {
    current: 0,
    value: ''
  }
  async componentDidMount() {
    this.PageStore.onGetTypelist()
    this.PageStore.Pagination.onCurrentChange(1, {
      typeId: -1,
      commodityName: "",
    });
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  onTabsChange(value) {
    this.PageStore.Pagination.onCurrentChange(1, {
      typeId: nth(this.PageStore.typelist, value)?.typeId,
      commodityName: "",
    });
    this.setState({
      current: value
    })
  }
  onChange() {

  }
  renderPane(tabList) {
    return tabList.map((item, index) => <AtTabsPane key={item.key} tabDirection='vertical' current={this.state.current} index={index}>
      <View >
        {this.renderItem()}
      </View>
    </AtTabsPane>)
  }
  renderItem() {
    const { dataSource } = this.PageStore.Pagination;
    return <View>
      <View className='at-row at-row--wrap'>
        {dataSource.map((item: any) => <View key={item.commodityId} className='at-col at-col-6'>
          <AtAvatar className='xt-stationery-img' image={item.commodityCoverUrl}></AtAvatar>
        </View>)}
      </View>
    </View>
  }
  render() {
    const tabList = map(this.PageStore.typelist, item => {
      return { title: item.typeName, key: item.typeId }
    })
    return (
      <View className='index'>
        <AtMessage />
        <AtSearchBar
          value={this.state.value}
          onChange={this.onChange.bind(this)}
        />
        <AtTabs
          className='xt-stationery-tabs'
          current={this.state.current}
          scroll
          animated={false}
          height='100vh'
          tabDirection='vertical'
          tabList={tabList}
          onClick={this.onTabsChange.bind(this)}>
          {/* {this.renderPane(tabList)} */}
          <AtTabsPane current={this.state.current} index={this.state.current}>
            {this.renderItem()}
          </AtTabsPane>
        </AtTabs>

      </View>
    )
  }
}

export default Index
