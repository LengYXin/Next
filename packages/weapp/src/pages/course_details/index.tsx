import { View } from '@tarojs/components';
import { ControllerCourse } from "@xt/client/entities";
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { PageDecorators } from '~/components/page';
import './index.scss';
import Taro from '@tarojs/taro';

@inject('$storeCourse')
@observer
@PageDecorators({ logon: true })
class Index extends Component<any> {
  get PageStore(): ControllerCourse {
    return this.props.$storeCourse
  }
  componentDidMount() {
    // this.onPagLoading(true)
    this.PageStore.onGetDetails({ courseId: Taro.getCurrentInstance().router?.params.id })
  }

  componentWillUnmount() { }

  componentDidShow() {
  }

  componentDidHide() { }
  render() {
    return (
      <View className='index'>
        {this.PageStore.details.courseName}
      </View>
    )
  }
}

export default Index
