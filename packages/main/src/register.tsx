import React from 'react';
import ReactDOM from 'react-dom';
import { registerMicroApps, runAfterFirstMounted, setDefaultMountApp, start, initGlobalState } from 'qiankun';
export default (props: any, container: HTMLDivElement, onLoading: (loader: Boolean) => void) => {
    registerMicroApps(
        [
            {
                name: 'vue',
                entry: '//localhost:8080',
                activeRule: '/vue',
                container: container,
                props: props,
                loader: onLoading,
            },
            {
                name: 'react',
                entry: '//localhost:3002',
                activeRule: '/test',
                container: container,
                props: props,
                loader: onLoading,
            },
        ],
        {
            //   beforeLoad: [
            //     app => {
            //       console.log('[LifeCycle] before load %c%s', 'color: green;', app.name);
            //     },
            //   ],
            //   beforeMount: [
            //     app => {
            //       console.log('[LifeCycle] before mount %c%s', 'color: green;', app.name);
            //     },
            //   ],
            //   afterUnmount: [
            //     app => {
            //       console.log('[LifeCycle] after unmount %c%s', 'color: green;', app.name);
            //     },
            //   ],
        },
    );
    start({ prefetch: false });
}