/**
 * @author 冷 (https://github.com/LengYXin)
 * @email lengyingxin8966@gmail.com
 * @create date 2020-08-07 18:04:16
 * @modify date 2020-08-07 18:04:16
 * @desc [description]
 */

import { View } from '@tarojs/components';
import Taro, { getCurrentInstance } from '@tarojs/taro';
import lodash from 'lodash';
import React from 'react';
import { AtMessage, AtNavBar } from 'taro-ui';
import { AtNavBarProps } from 'taro-ui/types/nav-bar';
import Login from '../login';
import './index.scss';
declare module 'react' {
    interface ComponentLifecycle<P, S, SS = any> extends NewLifecycle<P, S, SS>, DeprecatedLifecycle<P, S> {
        componentDidShow?(options: any): void;
    }
}
interface PageDecoratorsOptions {
    /** 登录 */
    logon?: boolean
}
/**
 * 页面 装饰器
 * @param options 
 */
export function PageDecorators(options?: PageDecoratorsOptions) {
    return function <T extends { new(...args: any[]): React.Component<any, any> }>(constructor: T) {
        return class Page extends constructor {
            // 环境
            get WEB() {
                return Taro.getEnv() === Taro.ENV_TYPE.WEB
            }
            /**
             * 页面信息
             * @readonly
             */
            get CurrentInstance() {
                return getCurrentInstance()
            }
            componentDidCatch(){
                console.log('componentDidCatch')
            }
            UNSAFE_componentWillMount() {
                // 需要登录
                // if (options?.logon) {
                //     if (!store.$storeUser.loggedIn) {
                //         if (this.WEB) {
                //             Taro.redirectTo({ url: '/pages/index/index' })
                //         } else {
                //             // 小程序
                //             Taro.switchTab({ url: '/pages/index/index' })
                //         }
                //     }
                // }
                super.UNSAFE_componentWillMount && super.UNSAFE_componentWillMount()
            }
            // onPullDownRefresh() {
            //     console.log("LENG: Page -> onPullDownRefresh -> onPullDownRefresh")
            // }
            componentDidMount() {
                super.componentDidMount && super.componentDidMount()
            }
            componentDidShow() {
                const CurrentInstance = this.CurrentInstance;
                console.log(`LENG: Page -> ${CurrentInstance.page?.path}`, CurrentInstance)
                super.componentDidShow && super.componentDidShow(CurrentInstance)
            }
            // 登录成功
            onSuccess() {
                this.componentDidMount()
            }
            // 返回
            onClickLeftIcon() {
                Taro.navigateBack()
            }
            /**
             * 导航栏 H5 显示
             */
            renderNav() {
                if (this.WEB) {
                    const { app, page } = this.CurrentInstance;
                    const tabBar = lodash.get(app, 'config.tabBar.list', []);
                    const props: AtNavBarProps = {
                        color: page?.config?.navigationBarBackgroundColor,
                        title: page?.config?.navigationBarTitleText,
                    }
                    // 不是 tab 页面
                    if (!lodash.some(tabBar, ['pagePath', page?.path])) {
                        props.leftIconType = "chevron-left";
                        props.onClickLeftIcon = this.onClickLeftIcon.bind(this)
                    }
                    return <AtNavBar {...props} />
                }
            }
            render() {
                return <View className="xt-page-view">
                    {this.renderNav()}
                    <AtMessage />
                    <Login onSuccess={this.onSuccess.bind(this)} />
                    {super.render()}
                </View>
            }
        }
    }
}