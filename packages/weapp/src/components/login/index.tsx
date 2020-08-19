/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-07 18:04:33
 * @modify date 2020-08-07 18:04:33
 * @desc [description]
 */
import { ControllerUser } from '@xt/client/entities';
import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { AtButton, AtForm, AtInput, AtModal, AtModalContent } from 'taro-ui';
import './index.scss';
import { View } from '@tarojs/components';
@inject('$storeUser')
@observer
class Index extends Component<{ onSuccess: () => void, [key: string]: any }> {
  get UserStore(): ControllerUser {
    return this.props.$storeUser
  }
  state = {
    // 账号
    account: '16000000013',
    // 密码
    password: 'abcd1234',
  }
  /**
   * 关闭弹框
   */
  onClose() {
    this.UserStore.onToggleVisible(false)
    console.log("LENG: Index -> onClose -> onToggleVisible")
  }
  componentWillUnmount() {
    // this.onCancel()
  }
  /**
   * 提交表单登录
   * @param event 
   */
  async onSubmit(event) {
    // console.log("LENG: Index -> onSubmit -> event", event)
    try {
      await this.UserStore.onLogin(this.state.account, this.state.password);
      // 校验是否成功
      if (this.UserStore.loggedIn) {
        this.onClose();
        this.props.onSuccess()
        // if (Taro.getEnv() === Taro.ENV_TYPE.WEAPP) {
        //   return Taro.switchTab({ url: '/pages/index/index' })
        // }
        // Taro.redirectTo({ url: '/pages/index/index' })
      }
    } catch (error) {
      console.error("LENG: Index -> onSubmit -> error", error)
    }
  }
  onChange(key, value) {
    this.setState({ [key]: value })
  }
  // renderMsg() {
  //   if (!this.UserStore.loggedIn) {
  //     return <View>请登录</View>
  //   }
  // }
  render() {
    // if (this.UserStore.visible) {
    return <AtModal
      className="xt-login-modal"
      closeOnClickOverlay={true}
      onClose={this.onClose.bind(this)}
      isOpened={this.UserStore.visible}>
      <AtModalContent>
        <AtForm>
          <AtInput
            name='account'
            type='text'
            placeholder='账号'
            value={this.state.account}
            onChange={this.onChange.bind(this, 'account')}
          />
          <AtInput
            name='password'
            type='text'
            placeholder='密码'
            value={this.state.password}
            onChange={this.onChange.bind(this, 'password')}
          />
          <AtButton onClick={this.onSubmit.bind(this)}>登录</AtButton>
        </AtForm>
      </AtModalContent>
    </AtModal>
    // }
    // return null
  }
}

export default Index
