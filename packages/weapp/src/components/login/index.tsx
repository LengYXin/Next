import { ControllerUser } from '@xt/client/entities'
import { inject, observer } from 'mobx-react'
import Taro from '@tarojs/taro';
import React, { Component } from 'react'
import { AtModal, AtModalContent, AtInput, AtForm, AtButton } from 'taro-ui'
import './index.scss'
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
  onCancel() {
    this.UserStore.onToggleVisible(false)
  }
  UNSAFE_componentWillMount() {
    this.onCancel()
  }
  /**
   * 提交表单登录
   * @param event 
   */
  async onSubmit(event) {
    try {
      await this.UserStore.onLogin(this.state.account, this.state.password);
      // 校验是否成功
      if (this.UserStore.loggedIn) {
        this.onCancel();
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
  render() {
    return (
      <AtModal onCancel={this.onCancel.bind(this)} isOpened={this.UserStore.visible}>
        <AtModalContent>
          <AtForm
          >
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
    )
  }
}

export default Index
