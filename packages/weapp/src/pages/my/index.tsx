import { View } from '@tarojs/components'
import { ControllerHome } from "@xt/client/entities"
import { inject, observer } from 'mobx-react'
import React, { Component } from 'react'
import { PageDecorators } from '~/components/page'
import './index.scss'

@inject('$storeHome')
@observer
@PageDecorators({ nav: false })
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
       我的
      </View>
    )
  }
}

export default Index
