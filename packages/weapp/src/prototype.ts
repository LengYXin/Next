import { AjaxBasics } from '@xt/client';
import { Component } from 'react';
import EnumPages from './pages.config';
type IEnumPages = typeof EnumPages;
Component.prototype.$pages = EnumPages;
Component.prototype.$Navigator = (url, params) => {
    return AjaxBasics.onCompatibleUrl({ url: url, body: params }, { target: '/' }).url
}

declare module 'react' {
    interface Component {
        /** 页面配置枚举 */
        $pages: IEnumPages;
        /**
        * 页面 导航转换  
        * @param  url $pages 枚举 配置
        * @param params 参数
        * @returns
        */
        $Navigator: (url: string, params?: any) => string | undefined;
    }
}
