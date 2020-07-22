import React, { Component } from 'react'
import { View, Button, Text, Swiper, SwiperItem, Image } from '@tarojs/components'
import { observer, inject } from 'mobx-react'
import { AtButton, AtMessage } from 'taro-ui'
import './index.scss'
import { observable } from 'mobx'

type PageStateProps = {
  store: {
    counterStore: {
      counter: number,
      increment: Function,
      decrement: Function,
      incrementAsync: Function
    }
  }
}

interface Index {
  props: PageStateProps;
}
interface imgs {
  id: string;
  pictureJumpUrl: string;
  pictureUri: string;
}
@inject('store')
@observer
class Index extends Component {
  @observable
  imgs: Array<imgs> = [];
  async carouselimg() {
    const res = await this.$ajax.post<Array<imgs>>("/carouselimg/list");
    console.log("LENG: PageView -> carouselimg -> res", res);
    this.imgs = res;
  }
  componentWillMount() { }

  componentDidMount() {
    this.carouselimg()
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }
  renderSwiper() {
    if (this.imgs.length) {
      return <Swiper
        circular
        indicatorDots
        autoplay>
        {this.imgs.map(img => <SwiperItem key={img.id}>
          <Image
            style='width:100%'
            src={img.pictureUri}
          />
        </SwiperItem>)}

      </Swiper>
    }
  }
  render() {
    return (
      <View className='index'>
        <AtMessage />
        {this.renderSwiper()}
        <AtButton type='primary' onClick={this.carouselimg.bind(this)}>获取数据</AtButton>
      </View>
    )
  }
}

export default Index
