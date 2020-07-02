import React from 'react';
import ReactDOM from 'react-dom';
import { registerMicroApps, runAfterFirstMounted, setDefaultMountApp, start, initGlobalState } from 'qiankun';
export default (container: HTMLDivElement, onLoading: (loader: Boolean) => void) => {
    registerMicroApps(
        [
            {
                name: 'vue',
                entry: '//localhost:8080',
                container: container,
                loader: onLoading,
                activeRule: '/vue',
            },
            {
                name: 'react',
                entry: '//localhost:3002',
                container: container,
                loader: onLoading,
                activeRule: '/test',
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