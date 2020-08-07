
import { View } from '@tarojs/components';
import { getCurrentInstance } from '@tarojs/taro';
import React from 'react';
import Taro from '@tarojs/taro';
import { AtMessage } from 'taro-ui';
import Login from '../login';
declare module 'react' {
    interface ComponentLifecycle<P, S, SS = any> extends NewLifecycle<P, S, SS>, DeprecatedLifecycle<P, S> {
        componentDidShow?(options: any): void;
    }
}
/**
 * 页面 装饰器
 * @param options 
 */
export function PageDecorators(options?: any) {
    return function <T extends { new(...args: any[]): React.Component<any, any> }>(constructor: T) {
        return class Page extends constructor {
            componentDidMount() {
                super.componentDidMount && super.componentDidMount()
            }
            componentDidShow() {
                super.componentDidShow && super.componentDidShow(getCurrentInstance())
            }
            onSuccess() {
                
                this.componentDidMount()
            }
            render() {
                return <View>
                    <AtMessage />
                    <Login onSuccess={this.onSuccess.bind(this)} />
                    {super.render()}
                </View>
            }
        }
    }
}