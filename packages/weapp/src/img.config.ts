import test from './assets/img/xt.jpg';

import { Component } from 'react';
const imgs = {
    // test: import('./assets/img/xt.jpg') as any
    /** 测试 */
    test: test
}
Component.prototype.$imgs = imgs;
declare module 'react' {
    interface Component {
        $imgs: typeof imgs;
    }
}