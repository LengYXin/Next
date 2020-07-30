import { CommonEvent, CommonEventFunction, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { AtTabs, AtTabsPane } from 'taro-ui'
import { TabItem } from 'taro-ui/types/tabs'
import './index.scss'
class Index extends Component<{
  tabList: TabItem[];
  onTabsChange?: (index: number, event: CommonEvent) => void;
  onScrollToLower?: CommonEventFunction;
  /**
   * 减去 多余的高度
   */
  surplusHeight?: number;
  [key: string]: any
}> {
  state = {
    height: '80vh',
    current: 0
  }
  UNSAFE_componentWillMount() {
    const info = Taro.getSystemInfoSync();
    const { surplusHeight = 0 } = this.props;
    let height = info.windowHeight - surplusHeight;
    if (Taro.getEnv() === Taro.ENV_TYPE.WEB) {
      height -= 55;
    }
    this.setState({ height: height + 'px' })
  }
  onScrollToLower(event) {
    this.props.onScrollToLower && this.props.onScrollToLower(event);
  }
  onTabsChange(index: number, event: CommonEvent) {
    this.setState({ current: index }, () => {
      this.props.onTabsChange && this.props.onTabsChange(index, event);
    })
  }
  render() {
    const { tabList, onScrollToLower, ...props } = this.props;
    return (
      <AtTabs
        tabList={this.props.tabList}
        scroll
        className='xt-tabs'
        current={this.state.current}
        animated={false}
        height={this.state.height}
        tabDirection='vertical'
        onClick={this.onTabsChange.bind(this)}
        {...props}
      >
        <AtTabsPane current={this.state.current} index={this.state.current}>
          <ScrollView
            scrollY
            scrollWithAnimation
            style={{ height: this.state.height }}
            lowerThreshold={100}
            onScrollToLower={this.onScrollToLower.bind(this)}
            {...props}
          >
            {this.props.children}
          </ScrollView>
        </AtTabsPane>
      </AtTabs>
    )
  }
}

export default Index
