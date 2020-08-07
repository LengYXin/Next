import { View } from '@tarojs/components';
import { ControllerCourse } from "@xt/client/entities";
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { PageDecorators } from '~/components/page';
import './index.scss';

@inject('$storeCourse')
@observer
@PageDecorators({ logon: true })
class Index extends Component<any> {
  get PageStore(): ControllerCourse {
    return this.props.$storeCourse
  }
  componentDidMount() {
    // this.onPagLoading(true)
  }

  componentWillUnmount() { }

  componentDidShow() {
  }

  componentDidHide() { }
  render() {
    return (
      <View className='index'>
        课程详情
      </View>
    )
  }
}

export default Index
